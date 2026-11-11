<?php declare(strict_types=1);

namespace App\Services;

use App\Enums\ComplaintAction;
use App\Enums\ComplaintStatus;
use App\Models\Complaint;
use App\Models\ComplaintEvidence;
use App\Models\ComplaintTimeline;
use App\Models\User;
use App\Support\TransitionTable;
use Illuminate\Support\Facades\DB;

final class ComplaintService
{
    public function __construct(
        private ReferenceGenerator $referenceGenerator,
        private NotificationService $notificationService,
        private AuditService $auditService,
    ) {}

    public function submit(
        User $submittedBy,
        ?string $citizenId,
        string $regionId,
        string $category,
        ?string $programId,
        ?string $incidentDate,
        ?string $incidentLocation,
        string $description,
        bool $confidential,
        array $evidenceFileIds = [],
    ): Complaint {
        return DB::transaction(function () use (
            $submittedBy,
            $citizenId,
            $regionId,
            $category,
            $programId,
            $incidentDate,
            $incidentLocation,
            $description,
            $confidential,
            $evidenceFileIds,
        ) {
            $referenceNo = $this->referenceGenerator->complaint();

            $complaint = Complaint::create([
                'reference_no' => $referenceNo,
                'submitted_by' => $submittedBy->id,
                'citizen_id' => $citizenId,
                'region_id' => $regionId,
                'category' => $category,
                'program_id' => $programId,
                'incident_date' => $incidentDate,
                'incident_location' => $incidentLocation,
                'description' => $description,
                'confidential' => $confidential,
                'status' => ComplaintStatus::DIAJUKAN,
            ]);

            // Attach evidences
            foreach ($evidenceFileIds as $fileId) {
                ComplaintEvidence::create([
                    'complaint_id' => $complaint->id,
                    'file_id' => $fileId,
                    'kind' => 'DOKUMEN',
                ]);
            }

            // Create timeline
            ComplaintTimeline::create([
                'complaint_id' => $complaint->id,
                'status' => ComplaintStatus::DIAJUKAN->value,
                'note' => 'Pengaduan diajukan',
                'actor_id' => $submittedBy->id,
                'actor_role' => $submittedBy->role->value,
            ]);

            // Audit log
            $this->auditService->log(
                $submittedBy,
                'CREATE',
                'complaints',
                $complaint->id,
                null,
                [
                    'reference_no' => $referenceNo,
                    'status' => ComplaintStatus::DIAJUKAN->value,
                    'category' => $category,
                ],
            );

            return $complaint;
        });
    }

    public function applyAction(
        Complaint $complaint,
        string $action,
        User $actor,
        ?string $note = null,
    ): Complaint {
        return DB::transaction(function () use ($complaint, $action, $actor, $note) {
            $currentStatus = $complaint->status->value;

            // Validate transition
            if (!TransitionTable::isValidComplaintTransition($currentStatus, $action)) {
                throw new \InvalidArgumentException("Invalid transition from {$currentStatus} via {$action}");
            }

            $newStatus = TransitionTable::getComplaintNextStatus($currentStatus, $action);
            $complaint->status = ComplaintStatus::from($newStatus);
            $complaint->save();

            // Create timeline
            ComplaintTimeline::create([
                'complaint_id' => $complaint->id,
                'status' => $newStatus,
                'note' => $note ?? ComplaintAction::from($action)->label(),
                'actor_id' => $actor->id,
                'actor_role' => $actor->role->value,
            ]);

            // Audit log
            $this->auditService->log(
                $actor,
                'STATUS_CHANGE',
                'complaints',
                $complaint->id,
                ['status' => $currentStatus],
                ['status' => $newStatus],
            );

            // Send notification to submitter
            $this->notificationService->complaintStatusChanged(
                citizen: $complaint->submittedBy,
                title: "Status Pengaduan Berubah: {$complaint->reference_no}",
                body: "Status pengaduan Anda berubah menjadi {$complaint->status->label()}",
                complaintId: $complaint->id,
            );

            return $complaint;
        });
    }

    public function respondToInfoRequest(
        Complaint $complaint,
        User $citizen,
        string $response,
    ): void {
        DB::transaction(function () use ($complaint, $citizen, $response) {
            // Create timeline entry untuk response
            ComplaintTimeline::create([
                'complaint_id' => $complaint->id,
                'status' => ComplaintStatus::DALAM_INVESTIGASI->value,
                'note' => "Respons dari warga: {$response}",
                'actor_id' => $citizen->id,
                'actor_role' => $citizen->role->value,
            ]);

            // Update status kembali ke investigasi
            $complaint->update(['status' => ComplaintStatus::DALAM_INVESTIGASI]);

            $this->auditService->log(
                $citizen,
                'UPDATE',
                'complaints',
                $complaint->id,
                null,
                ['response' => $response],
            );
        });
    }
}
