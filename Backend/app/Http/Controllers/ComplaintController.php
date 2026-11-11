<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\ComplaintStatus;
use App\Http\Requests\SubmitComplaintRequest;
use App\Http\Requests\SubmitComplaintResponseRequest;
use App\Http\Resources\ComplaintResource;
use App\Models\Citizen;
use App\Models\Complaint;
use App\Services\ComplaintService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ComplaintController extends Controller
{
    public function __construct(
        private ComplaintService $complaintService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = Complaint::where('submitted_by', $user->id)
            ->with('timelines', 'evidences.file');

        if ($request->filled('status')) {
            $query->where('status', $request->string('status')->value());
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

        $complaint = Complaint::where('id', $id)
            ->where('submitted_by', $user->id)
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

    public function store(SubmitComplaintRequest $request): JsonResponse
    {
        $user = $request->user();
        $citizen = Citizen::where('user_id', $user->id)->first();

        $complaint = $this->complaintService->submit(
            submittedBy: $user,
            citizenId: $citizen?->id,
            regionId: $citizen?->region_id ?? $user->region_id,
            category: $request->string('category')->value(),
            programId: $request->string('program_id')->value(),
            incidentDate: $request->string('incident_date')->value(),
            incidentLocation: $request->string('incident_location')->value(),
            description: $request->string('description')->value(),
            confidential: (bool) $request->get('confidential', false),
            evidenceFileIds: $request->array('evidences') ?? [],
        );

        return response()->json([
            'data' => ComplaintResource::make($complaint->load('timelines', 'evidences.file')),
        ], 201);
    }

    public function respondToInfoRequest(string $id, SubmitComplaintResponseRequest $request): JsonResponse
    {
        $user = $request->user();

        $complaint = Complaint::where('id', $id)
            ->where('submitted_by', $user->id)
            ->first();

        if (!$complaint) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Pengaduan tidak ditemukan',
                ],
            ], 404);
        }

        // Check if complaint status is MEMBUTUHKAN_INFO
        if ($complaint->status->value !== ComplaintStatus::MEMBUTUHKAN_INFO->value) {
            return response()->json([
                'error' => [
                    'code' => 'CONFLICT',
                    'message' => 'Pengaduan hanya bisa direspons saat status "Membutuhkan Informasi"',
                ],
            ], 422);
        }

        $this->complaintService->respondToInfoRequest(
            complaint: $complaint,
            citizen: $user,
            response: $request->string('response')->value(),
        );

        return response()->json([
            'data' => ComplaintResource::make($complaint->load('timelines', 'evidences.file')),
        ]);
    }
}
