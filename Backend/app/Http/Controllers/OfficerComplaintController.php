<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\SubmitComplaintActionRequest;
use App\Http\Resources\ComplaintResource;
use App\Models\Complaint;
use App\Services\ComplaintService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OfficerComplaintController extends Controller
{
    public function __construct(
        private ComplaintService $complaintService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $allowedRegionIds = $request->attributes->get('allowed_region_ids', []);

        $query = Complaint::whereIn('region_id', $allowedRegionIds)
            ->with('timelines', 'evidences.file');

        if ($request->filled('status')) {
            $query->where('status', $request->string('status')->value());
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
            'data' => ComplaintResource::collection($paginated->items()),
            'meta' => [
                'page' => $paginated->currentPage(),
                'page_size' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => $paginated->lastPage(),
            ],
        ]);
    }

    public function show(string $id, Request $request): JsonResponse
    {
        $user = $request->user();
        $allowedRegionIds = $request->attributes->get('allowed_region_ids', []);

        $complaint = Complaint::where('id', $id)
            ->whereIn('region_id', $allowedRegionIds)
            ->with('timelines', 'evidences.file')
            ->first();

        if (!$complaint) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Pengaduan tidak ditemukan',
                ],
            ], 404);
        }

        return response()->json([
            'data' => ComplaintResource::make($complaint),
        ]);
    }

    public function applyAction(string $id, SubmitComplaintActionRequest $request): JsonResponse
    {
        $user = $request->user();
        $allowedRegionIds = $request->attributes->get('allowed_region_ids', []);

        $complaint = Complaint::where('id', $id)
            ->whereIn('region_id', $allowedRegionIds)
            ->first();

        if (!$complaint) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Pengaduan tidak ditemukan',
                ],
            ], 404);
        }

        try {
            $updated = $this->complaintService->applyAction(
                complaint: $complaint,
                action: $request->string('action')->value(),
                actor: $user,
                note: $request->string('note')->value(),
            );

            return response()->json([
                'data' => ComplaintResource::make($updated->load('timelines', 'evidences.file')),
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
