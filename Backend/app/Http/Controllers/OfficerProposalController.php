<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\SubmitProposalActionRequest;
use App\Http\Resources\ProposalResource;
use App\Models\Proposal;
use App\Services\ProposalService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OfficerProposalController extends Controller
{
    public function __construct(
        private ProposalService $proposalService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $allowedRegionIds = $request->attributes->get('allowed_region_ids', []);

        $query = Proposal::whereIn('region_id', $allowedRegionIds)
            ->with('timelines', 'documents.file', 'fieldVerification');

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
            'data' => ProposalResource::collection($paginated->items()),
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

        $proposal = Proposal::where('id', $id)
            ->whereIn('region_id', $allowedRegionIds)
            ->with('timelines', 'documents.file', 'fieldVerification')
            ->first();

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

    public function applyAction(string $id, SubmitProposalActionRequest $request): JsonResponse
    {
        $user = $request->user();
        $allowedRegionIds = $request->attributes->get('allowed_region_ids', []);

        $proposal = Proposal::where('id', $id)
            ->whereIn('region_id', $allowedRegionIds)
            ->first();

        if (!$proposal) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Usulan tidak ditemukan',
                ],
            ], 404);
        }

        try {
            $updated = $this->proposalService->applyAction(
                proposal: $proposal,
                action: $request->string('action')->value(),
                actor: $user,
                note: $request->string('note')->value(),
            );

            return response()->json([
                'data' => ProposalResource::make($updated->load('timelines', 'documents.file')),
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
