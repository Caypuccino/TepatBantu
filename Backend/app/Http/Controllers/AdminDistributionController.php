<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\DistributionResource;
use App\Models\Distribution;
use App\Services\DistributionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminDistributionController extends Controller
{
    public function __construct(
        private DistributionService $distributionService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $query = Distribution::with('histories');

        if ($request->filled('program_id')) {
            $query->whereIn('beneficiary_record_id', function ($subQuery) use ($request) {
                $subQuery->select('id')
                    ->from('beneficiary_records')
                    ->where('program_id', $request->string('program_id')->value());
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status')->value());
        }

        if ($request->filled('region_id')) {
            $query->whereIn('beneficiary_record_id', function ($subQuery) use ($request) {
                $subQuery->select('id')
                    ->from('beneficiary_records')
                    ->where('region_id', $request->string('region_id')->value());
            });
        }

        if ($request->filled('channel')) {
            $query->where('channel', $request->string('channel')->value());
        }

        $pageSize = (int) $request->get('page_size', 20);
        $paginated = $query->orderByDesc('created_at')->paginate($pageSize);

        return response()->json([
            'data' => DistributionResource::collection($paginated->items()),
            'meta' => [
                'page' => $paginated->currentPage(),
                'page_size' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => $paginated->lastPage(),
            ],
        ]);
    }

    public function update(string $id, Request $request): JsonResponse
    {
        $distribution = Distribution::with('histories')->find($id);

        if (!$distribution) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Distribusi tidak ditemukan',
                ],
            ], 404);
        }

        try {
            $updated = $this->distributionService->applyAction(
                distribution: $distribution,
                action: $request->string('action')->value(),
                actor: $request->user(),
                note: $request->string('note')->value(),
                scheduledDate: $request->string('scheduled_date')->value(),
                location: $request->string('location')->value(),
            );

            return response()->json([
                'data' => DistributionResource::make($updated->load('histories')),
            ]);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'error' => [
                    'code' => 'CONFLICT',
                    'message' => $e->getMessage(),
                ],
            ], 422);
        }
    }
}
