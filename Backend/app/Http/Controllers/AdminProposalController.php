<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\AssignProposalRequest;
use App\Http\Requests\ReturnProposalRequest;
use App\Http\Resources\ProposalResource;
use App\Models\Proposal;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminProposalController extends Controller
{
    public function __construct(
        private AuditService $auditService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $query = Proposal::with('timelines', 'documents.file', 'fieldVerification');

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
            'data' => ProposalResource::collection($paginated->items()),
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
        $proposal = Proposal::with('timelines', 'documents.file', 'fieldVerification')->find($id);

        if (!$proposal) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Usulan tidak ditemukan',
                ],
            ], 404);
        }

        return response()->json([
            'data' => ProposalResource::make($proposal),
        ]);
    }

    public function assign(string $id, AssignProposalRequest $request): JsonResponse
    {
        $proposal = Proposal::find($id);

        if (!$proposal) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Usulan tidak ditemukan',
                ],
            ], 404);
        }

        $oldOfficerId = $proposal->assigned_officer_id;
        $proposal->update(['assigned_officer_id' => $request->string('officer_id')->value()]);

        $this->auditService->log(
            $request->user(),
            'UPDATE',
            'proposals',
            $proposal->id,
            ['assigned_officer_id' => $oldOfficerId],
            ['assigned_officer_id' => $proposal->assigned_officer_id],
        );

        return response()->json([
            'data' => ProposalResource::make($proposal->load('timelines', 'documents.file')),
        ]);
    }

    public function return(string $id, ReturnProposalRequest $request): JsonResponse
    {
        $proposal = Proposal::find($id);

        if (!$proposal) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Usulan tidak ditemukan',
                ],
            ], 404);
        }

        $proposal->update(['assigned_officer_id' => null]);

        $this->auditService->log(
            $request->user(),
            'UPDATE',
            'proposals',
            $proposal->id,
            null,
            ['action' => 'return_proposal', 'note' => $request->string('note')->value()],
        );

        return response()->json([
            'data' => ProposalResource::make($proposal->load('timelines', 'documents.file')),
        ]);
    }
}
