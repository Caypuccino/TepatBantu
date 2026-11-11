<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\ComplaintStatus;
use App\Http\Requests\SubmitComplaintRequest;
use App\Models\Citizen;
use App\Models\Complaint;
use App\Models\ComplaintEvidence;
use App\Services\AuditService;
use App\Services\NikService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicComplaintController extends Controller
{
    public function __construct(
        private NikService $nikService,
        private AuditService $auditService,
    ) {}

    public function submit(SubmitComplaintRequest $request): JsonResponse
    {
        try {
            $category = $request->string('category')->value();
            $description = $request->string('description')->value();
            $incidentDate = $request->date('incident_date');
            $incidentLocation = $request->string('incident_location')->value();
            $confidential = $request->boolean('confidential', false);
            $programId = $request->string('program_id')->value() ?? null;
            $evidences = $request->array('evidences') ?? [];

            // Get NIK from request if provided
            $nik = $request->string('nik')->value() ?? null;
            $citizen = null;
            $region = null;

            if ($nik) {
                $nikHash = $this->nikService->hash($nik);
                $citizen = Citizen::where('nik_hash', $nikHash)->first();
                
                if ($citizen) {
                    $region = $citizen->region;
                }
            }

            // Generate unique reference number
            $referenceNo = $this->generateReferenceNo();

            // Create complaint
            $complaint = Complaint::create([
                'reference_no' => $referenceNo,
                'submitted_by' => null, // Public submission, no user auth
                'citizen_id' => $citizen?->id,
                'region_id' => $region?->id ?? null,
                'category' => $category,
                'program_id' => $programId,
                'incident_date' => $incidentDate,
                'incident_location' => $incidentLocation,
                'description' => $description,
                'confidential' => $confidential,
                'status' => ComplaintStatus::DIAJUKAN->value,
            ]);

            // Attach evidences if provided
            if (!empty($evidences)) {
                foreach ($evidences as $fileId) {
                    ComplaintEvidence::create([
                        'complaint_id' => $complaint->id,
                        'file_id' => $fileId,
                        'kind' => 'FOTO', // Default to FOTO, can be extended
                    ]);
                }
            }

            // Audit log
            $this->auditService->log(
                null,
                'COMPLAINT_SUBMITTED',
                'public',
                null,
                null,
                [
                    'reference_no' => $referenceNo,
                    'category' => $category,
                    'confidential' => $confidential,
                ],
            );

            return response()->json([
                'success' => true,
                'ticketId' => $referenceNo,
                'message' => 'Laporan sanggahan/pengaduan Anda telah diterima dengan aman. Data Anda terlindungi dan akan ditangani oleh tim profesional kami.',
                'data' => [
                    'reference_no' => $referenceNo,
                    'status' => 'DIAJUKAN',
                    'category' => $category,
                    'submitted_at' => $complaint->created_at->toIso8601String(),
                    'confidential' => $confidential,
                ],
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Error submitting complaint', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => [
                    'code' => 'SUBMISSION_ERROR',
                    'message' => 'Terjadi kesalahan saat menyimpan pengaduan. Silakan coba beberapa saat lagi.',
                ],
            ], 500);
        }
    }

    private function generateReferenceNo(): string
    {
        $prefix = 'TB-SGH-';
        
        do {
            $randomNumber = str_pad(
                random_int(0, 999999),
                6,
                '0',
                STR_PAD_LEFT
            );
            $referenceNo = $prefix . $randomNumber;
        } while (Complaint::where('reference_no', $referenceNo)->exists());

        return $referenceNo;
    }
}
