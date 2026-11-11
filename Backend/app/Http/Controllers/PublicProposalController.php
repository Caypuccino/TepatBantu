<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\ProposalStatus;
use App\Http\Requests\SubmitProposalRequest;
use App\Models\Citizen;
use App\Models\Proposal;
use App\Models\ProposalDocument;
use App\Services\AuditService;
use App\Services\NikService;
use Illuminate\Http\JsonResponse;

class PublicProposalController extends Controller
{
    public function __construct(
        private NikService $nikService,
        private AuditService $auditService,
    ) {}

    public function submit(SubmitProposalRequest $request): JsonResponse
    {
        try {
            $personalData = $request->array('personal_data');
            $socioEconomic = $request->array('socio_economic');
            $documents = $request->array('documents') ?? [];

            // Get NIK from request if provided, or from personal_data
            $nik = $request->string('nik')->value() ?? null;
            
            // If no NIK provided, we'll create proposal without citizen link (anonymous submission)
            $citizen = null;
            $region = null;

            if ($nik) {
                $nikHash = $this->nikService->hash($nik);
                $citizen = Citizen::where('nik_hash', $nikHash)->first();
                
                if ($citizen) {
                    $region = $citizen->region;
                } else {
                    // Citizen doesn't exist yet - can still create proposal
                    // but won't link to citizen_id for now
                }
            }

            // Generate unique reference number
            $referenceNo = $this->generateReferenceNo();

            // Create proposal
            $proposal = Proposal::create([
                'reference_no' => $referenceNo,
                'citizen_id' => $citizen?->id,
                'submitted_by' => null, // Public submission, no user auth
                'region_id' => $region?->id ?? null,
                'status' => ProposalStatus::DIAJUKAN->value,
                'personal_data' => $personalData,
                'socio_economic' => $socioEconomic,
            ]);

            // Attach documents if provided
            if (!empty($documents)) {
                foreach ($documents as $doc) {
                    ProposalDocument::create([
                        'proposal_id' => $proposal->id,
                        'file_id' => $doc['file_id'],
                        'kind' => $doc['kind'] ?? 'LAINNYA',
                    ]);
                }
            }

            // Audit log
            $this->auditService->log(
                null,
                'PROPOSAL_SUBMITTED',
                'public',
                null,
                null,
                [
                    'reference_no' => $referenceNo,
                    'applicant_name' => $personalData['full_name'] ?? 'Unknown',
                ],
            );

            return response()->json([
                'success' => true,
                'trackingId' => $referenceNo,
                'message' => 'Usulan kelayakan Anda berhasil didaftarkan. Silakan simpan nomor referensi ini untuk melacak status.',
                'data' => [
                    'reference_no' => $referenceNo,
                    'status' => 'DIAJUKAN',
                    'submitted_at' => $proposal->created_at->toIso8601String(),
                ],
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Error submitting proposal', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => [
                    'code' => 'SUBMISSION_ERROR',
                    'message' => 'Terjadi kesalahan saat menyimpan usulan. Silakan coba beberapa saat lagi.',
                ],
            ], 500);
        }
    }

    private function generateReferenceNo(): string
    {
        $prefix = 'TB-USL-';
        
        do {
            $randomNumber = str_pad(
                random_int(0, 999999),
                6,
                '0',
                STR_PAD_LEFT
            );
            $referenceNo = $prefix . $randomNumber;
        } while (Proposal::where('reference_no', $referenceNo)->exists());

        return $referenceNo;
    }
}
