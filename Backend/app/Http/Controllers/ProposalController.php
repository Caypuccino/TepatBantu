<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\SubmitProposalRequest;
use App\Http\Requests\SubmitProposalRevisionRequest;
use App\Http\Resources\ProposalResource;
use App\Models\Citizen;
use App\Models\Proposal;
use App\Services\ProposalService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProposalController extends Controller
{
    public function __construct(
        private ProposalService $proposalService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $citizen = Citizen::where('user_id', $user->id)->first();

        if (!$citizen) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Profil warga tidak ditemukan',
                ],
            ], 404);
        }

        $query = Proposal::where('citizen_id', $citizen->id)
            ->with('timelines', 'documents.file', 'fieldVerification');

        if ($request->filled('status')) {
            $query->where('status', $request->string('status')->value());
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
        $citizen = Citizen::where('user_id', $user->id)->first();

        if (!$citizen) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Profil warga tidak ditemukan',
                ],
            ], 404);
        }

        $proposal = Proposal::where('id', $id)
            ->where('citizen_id', $citizen->id)
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

    public function store(SubmitProposalRequest $request): JsonResponse
    {
        $user = $request->user();
        $citizen = Citizen::where('user_id', $user->id)->first();

        if (!$citizen) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Profil warga tidak ditemukan',
                ],
            ], 404);
        }

        $proposal = $this->proposalService->submit(
            citizen: $citizen,
            submittedBy: $user,
            regionId: $citizen->region_id,
            personalData: $request->array('personal_data'),
            socioEconomic: $request->array('socio_economic'),
            documentFileIds: $request->array('documents') ?? [],
        );

        return response()->json([
            'data' => ProposalResource::make($proposal->load('timelines', 'documents.file')),
        ], 201);
    }

    public function submitRevision(string $id, SubmitProposalRevisionRequest $request): JsonResponse
    {
        $user = $request->user();
        $citizen = Citizen::where('user_id', $user->id)->first();

        if (!$citizen) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Profil warga tidak ditemukan',
                ],
            ], 404);
        }

        $proposal = Proposal::where('id', $id)
            ->where('citizen_id', $citizen->id)
            ->first();

        if (!$proposal) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Usulan tidak ditemukan',
                ],
            ], 404);
        }

        // Check if proposal status is PERLU_PERBAIKAN
        if ($proposal->status->value !== 'PERLU_PERBAIKAN') {
            return response()->json([
                'error' => [
                    'code' => 'CONFLICT',
                    'message' => 'Usulan hanya bisa direvisi saat status "Perlu Perbaikan"',
                ],
            ], 422);
        }

        $updated = $this->proposalService->submitRevision(
            proposal: $proposal,
            citizen: $citizen,
            personalData: $request->array('personal_data'),
            socioEconomic: $request->array('socio_economic'),
            documentFileIds: $request->array('documents') ?? [],
        );

        return response()->json([
            'data' => ProposalResource::make($updated->load('timelines', 'documents.file')),
        ]);
    }
}
