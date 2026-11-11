<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\AssignProposalRequest;
use App\Http\Resources\ComplaintResource;
use App\Models\Complaint;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminComplaintController extends Controller
{
    public function __construct(
        private AuditService $auditService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $query = Complaint::with('timelines', 'evidences.file');

        if ($request->filled('status')) {
            $query->where('status', $request->string('status')->value());
        }

        if ($request->filled('region_id')) {
            $query->where('region_id', $request->string('region_id')->value());
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

    public function assign(string $id, AssignProposalRequest $request): JsonResponse
    {
        $complaint = Complaint::find($id);

        if (!$complaint) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Pengaduan tidak ditemukan',
                ],
            ], 404);
        }

        $oldOfficerId = $complaint->assigned_officer_id;
        $complaint->update(['assigned_officer_id' => $request->string('officer_id')->value()]);

        $this->auditService->log(
            $request->user(),
            'UPDATE',
            'complaints',
            $complaint->id,
            ['assigned_officer_id' => $oldOfficerId],
            ['assigned_officer_id' => $complaint->assigned_officer_id],
        );

        return response()->json([
            'data' => ComplaintResource::make($complaint->load('timelines', 'evidences.file')),
        ]);
    }
}
