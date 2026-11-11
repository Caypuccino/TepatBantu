<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CheckBansosRequest;
use App\Http\Requests\UploadFileRequest;
use App\Http\Resources\FileObjectResource;
use App\Http\Resources\PressReleaseResource;
use App\Models\FileObject;
use App\Models\PressRelease;
use App\Services\AuditService;
use App\Services\PublicCheckService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PublicController extends Controller
{
    public function __construct(
        private PublicCheckService $checkService,
        private AuditService $auditService,
    ) {}

    public function checkBansos(CheckBansosRequest $request): JsonResponse
    {
        $ip = $request->ip();
        $key = "check-bansos:{$ip}";
        $limit = 5;
        $decayMinutes = 1;

        if (RateLimiter::tooManyAttempts($key, $limit)) {
            return response()->json([
                'error' => [
                    'code' => 'RATE_LIMITED',
                    'message' => 'Terlalu banyak permintaan. Coba lagi dalam beberapa menit.',
                ],
            ], 429);
        }

        RateLimiter::hit($key, $decayMinutes * 60);

        $nik = $request->string('nik')->value();
        $result = $this->checkService->check($nik);

        $this->auditService->log(
            null,
            'CHECK_BANSOS',
            'public',
            null,
            null,
            ['state' => $result['state'], 'masked_nik' => $result['masked_nik']],
        );

        return response()->json($result);
    }

    public function stats(): JsonResponse
    {
        return response()->json([
            'data' => [
                'total_citizens' => 0,
                'total_distributions' => 0,
                'total_complaints' => 0,
            ],
            'sample_data' => true,
        ]);
    }

    public function pressReleases(Request $request): JsonResponse
    {
        $query = PressRelease::where('status', 'PUBLISHED');

        if ($request->filled('q')) {
            $q = $request->string('q')->value();
            $query->where(function ($q_builder) use ($q) {
                $q_builder->where('title', 'ilike', "%{$q}%")
                    ->orWhere('content', 'ilike', "%{$q}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->string('category')->value());
        }

        if ($request->filled('from')) {
            $query->whereDate('published_at', '>=', $request->string('from')->value());
        }

        if ($request->filled('to')) {
            $query->whereDate('published_at', '<=', $request->string('to')->value());
        }

        $pageSize = (int) $request->get('page_size', 20);
        $paginated = $query->orderByDesc('published_at')->paginate($pageSize);

        return response()->json([
            'data' => PressReleaseResource::collection($paginated->items()),
            'meta' => [
                'page' => $paginated->currentPage(),
                'page_size' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => $paginated->lastPage(),
            ],
        ]);
    }

    public function pressReleaseDetail(string $slug): JsonResponse
    {
        $release = PressRelease::where('slug', $slug)
            ->where('status', 'PUBLISHED')
            ->first();

        if (!$release) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Press release tidak ditemukan',
                ],
            ], 404);
        }

        $related = PressRelease::where('category', $release->category)
            ->where('id', '!=', $release->id)
            ->where('status', 'PUBLISHED')
            ->orderByDesc('published_at')
            ->limit(3)
            ->get();

        return response()->json([
            'data' => PressReleaseResource::make($release),
            'related' => PressReleaseResource::collection($related),
        ]);
    }

    public function upload(UploadFileRequest $request): JsonResponse
    {
        $file = $request->file('file');
        $path = Storage::disk('public')->put('uploads', $file);

        $fileObject = FileObject::create([
            'filename' => $file->getClientOriginalName(),
            'mime' => $file->getMimeType(),
            'size' => $file->getSize(),
            'path' => $path,
            'owner_id' => $request->user()?->id,
        ]);

        return response()->json([
            'data' => FileObjectResource::make($fileObject),
        ], 201);
    }
}
