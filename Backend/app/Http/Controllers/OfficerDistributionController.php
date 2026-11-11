<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\SubmitDistributionActionRequest;
use App\Http\Resources\DistributionResource;
use App\Models\Distribution;
use App\Services\DistributionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OfficerDistributionController extends Controller
{
    public function __construct(
        private DistributionService $distributionService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $allowedRegionIds = $request->attributes->get('allowed_region_ids', []);

        $query = Distribution::whereIn(
            'beneficiary_record_id',
            \DB::table('beneficiary_records')->whereIn('region_id', $allowedRegionIds)->select('id')
        )->with('histories');

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

        if ($request->filled('channel')) {
            $query->where('channel', $request->string('channel')->value());
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->string('date_from')->value());
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->string('date_to')->value());
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

    public function update(string $id, SubmitDistributionActionRequest $request): JsonResponse
    {
        $user = $request->user();
        $allowedRegionIds = $request->attributes->get('allowed_region_ids', []);

        $distribution = Distribution::where('id', $id)
            ->whereIn('beneficiary_record_id', function ($subQuery) use ($allowedRegionIds) {
                $subQuery->select('id')
                    ->from('beneficiary_records')
                    ->whereIn('region_id', $allowedRegionIds);
            })
            ->with('histories')
            ->first();

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
                actor: $user,
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
