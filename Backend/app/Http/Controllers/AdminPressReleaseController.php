<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreatePressReleaseRequest;
use App\Http\Resources\PressReleaseResource;
use App\Models\PressRelease;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminPressReleaseController extends Controller
{
    public function __construct(
        private AuditService $auditService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $query = PressRelease::query();

        if ($request->filled('status')) {
            $query->where('status', $request->string('status')->value());
        }

        if ($request->filled('category')) {
            $query->where('category', $request->string('category')->value());
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

    public function store(CreatePressReleaseRequest $request): JsonResponse
    {
        $release = PressRelease::create([
            'slug' => Str::slug($request->string('title')->value()),
            'title' => $request->string('title')->value(),
            'category' => $request->string('category')->value(),
            'thumbnail_url' => $request->string('thumbnail_url')->value(),
            'content' => $request->string('content')->value(),
            'status' => $request->string('status')->value() ?? 'DRAFT',
            'author_id' => $request->user()->id,
        ]);

        $this->auditService->log(
            $request->user(),
            'CREATE',
            'press_releases',
            $release->id,
            null,
            ['title' => $release->title, 'status' => $release->status],
        );

        return response()->json([
            'data' => PressReleaseResource::make($release),
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        $release = PressRelease::find($id);

        if (!$release) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Press release tidak ditemukan',
                ],
            ], 404);
        }

        return response()->json([
            'data' => PressReleaseResource::make($release),
        ]);
    }

    public function update(string $id, CreatePressReleaseRequest $request): JsonResponse
    {
        $release = PressRelease::find($id);

        if (!$release) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Press release tidak ditemukan',
                ],
            ], 404);
        }

        $oldValues = $release->only(['title', 'category', 'content', 'status']);

        $data = $request->only(['title', 'category', 'thumbnail_url', 'content', 'status']);
        if ($request->filled('title')) {
            $data['slug'] = Str::slug($request->string('title')->value());
        }

        $release->update($data);

        $this->auditService->log(
            $request->user(),
            'UPDATE',
            'press_releases',
            $release->id,
            $oldValues,
            $release->only(['title', 'category', 'content', 'status']),
        );

        return response()->json([
            'data' => PressReleaseResource::make($release),
        ]);
    }

    public function publish(string $id, Request $request): JsonResponse
    {
        $release = PressRelease::find($id);

        if (!$release) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Press release tidak ditemukan',
                ],
            ], 404);
        }

        $release->update([
            'status' => 'PUBLISHED',
            'published_at' => now(),
        ]);

        $this->auditService->log(
            $request->user(),
            'STATUS_CHANGE',
            'press_releases',
            $release->id,
            ['status' => 'DRAFT'],
            ['status' => 'PUBLISHED'],
        );

        return response()->json([
            'data' => PressReleaseResource::make($release),
        ]);
    }

    public function archive(string $id, Request $request): JsonResponse
    {
        $release = PressRelease::find($id);

        if (!$release) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Press release tidak ditemukan',
                ],
            ], 404);
        }

        $release->update(['status' => 'ARCHIVED']);

        $this->auditService->log(
            $request->user(),
            'STATUS_CHANGE',
            'press_releases',
            $release->id,
            ['status' => $release->status->value],
            ['status' => 'ARCHIVED'],
        );

        return response()->json([
            'data' => PressReleaseResource::make($release),
        ]);
    }
}
