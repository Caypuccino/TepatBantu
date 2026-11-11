<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\CitizenResource;
use App\Models\Citizen;
use App\Services\AuditService;
use App\Services\NikService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class AdminCitizenController extends Controller
{
    public function __construct(
        private AuditService $auditService,
        private NikService $nikService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $query = Citizen::query();

        if ($request->filled('q')) {
            $q = $request->string('q')->value();
            $query->where(function ($builder) use ($q) {
                $builder->where('full_name', 'ilike', "%{$q}%")
                    ->orWhere('phone', 'ilike', "%{$q}%");
            });
        }

        if ($request->filled('region_id')) {
            $query->where('region_id', $request->string('region_id')->value());
        }

        $pageSize = (int) $request->get('page_size', 20);
        $paginated = $query->orderByDesc('created_at')->paginate($pageSize);

        return response()->json([
            'data' => CitizenResource::collection($paginated->items()),
            'meta' => [
                'page' => $paginated->currentPage(),
                'page_size' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => $paginated->lastPage(),
            ],
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $citizen = Citizen::find($id);

        if (!$citizen) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Warga tidak ditemukan',
                ],
            ], 404);
        }

        return response()->json([
            'data' => CitizenResource::make($citizen),
        ]);
    }

    public function revealNik(string $id, Request $request): JsonResponse
    {
        $user = $request->user();
        $key = "reveal_nik:{$id}";
        $limit = 5;
        $decayMinutes = 10;

        if (RateLimiter::tooManyAttempts($key, $limit)) {
            return response()->json([
                'error' => [
                    'code' => 'RATE_LIMITED',
                    'message' => 'Terlalu banyak percobaan. Coba lagi dalam beberapa menit.',
                ],
            ], 429);
        }

        RateLimiter::hit($key, $decayMinutes * 60);

        $citizen = Citizen::find($id);

        if (!$citizen) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Warga tidak ditemukan',
                ],
            ], 404);
        }

        $fullNik = $citizen->nik_encrypted;
        $maskedNik = $this->nikService->mask($fullNik);

        $this->auditService->log(
            $user,
            'NIK_REVEAL',
            'citizens',
            $citizen->id,
            null,
            ['masked_nik' => $maskedNik],
        );

        return response()->json([
            'data' => [
                'citizen_id' => $citizen->id,
                'full_nik' => $fullNik,
                'masked_nik' => $maskedNik,
            ],
        ]);
    }
}
