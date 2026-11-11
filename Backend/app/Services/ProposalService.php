<?php declare(strict_types=1);

namespace App\Services;

use App\Enums\ProposalAction;
use App\Enums\ProposalStatus;
use App\Models\ProposalDocument;
use App\Models\ProposalTimeline;
use App\Models\Proposal;
use App\Models\User;
use App\Support\TransitionTable;
use Illuminate\Support\Facades\DB;

final class ProposalService
{
    public function __construct(
        private ReferenceGenerator $referenceGenerator,
        private NotificationService $notificationService,
        private AuditService $auditService,
    ) {}

    public function submit(
        User $citizen,
        User $submittedBy,
        string $regionId,
        array $personalData,
        array $socioEconomic,
        array $documentFileIds = [],
    ): Proposal {
        return DB::transaction(function () use (
            $citizen,
            $submittedBy,
            $regionId,
            $personalData,
            $socioEconomic,
            $documentFileIds,
        ) {
            $referenceNo = $this->referenceGenerator->proposal();

            $proposal = Proposal::create([
                'reference_no' => $referenceNo,
                'citizen_id' => $citizen->id,
                'submitted_by' => $submittedBy->id,
                'region_id' => $regionId,
                'status' => ProposalStatus::DIAJUKAN,
                'personal_data' => $personalData,
                'socio_economic' => $socioEconomic,
            ]);

            // Attach documents
            foreach ($documentFileIds as $docData) {
                ProposalDocument::create([
                    'proposal_id' => $proposal->id,
                    'kind' => $docData['kind'] ?? 'LAINNYA',
                    'file_id' => $docData['file_id'],
                ]);
            }

            // Create timeline
            ProposalTimeline::create([
                'proposal_id' => $proposal->id,
                'status' => ProposalStatus::DIAJUKAN->value,
                'note' => 'Usulan diajukan',
                'actor_id' => $submittedBy->id,
                'actor_role' => $submittedBy->role->value,
            ]);

            // Audit log
            $this->auditService->log(
                $submittedBy,
                'CREATE',
                'proposals',
                $proposal->id,
                null,
                [
                    'reference_no' => $referenceNo,
                    'status' => ProposalStatus::DIAJUKAN->value,
                ],
            );

            return $proposal;
        });
    }

    public function submitRevision(
        Proposal $proposal,
        User $citizen,
        ?array $personalData = null,
        ?array $socioEconomic = null,
        array $documentFileIds = [],
    ): Proposal {
        return DB::transaction(function () use (
            $proposal,
            $citizen,
            $personalData,
            $socioEconomic,
            $documentFileIds,
        ) {
            // Update personal_data & socio_economic jika ada
            if ($personalData) {
                $proposal->personal_data = array_merge($proposal->personal_data, $personalData);
            }
            if ($socioEconomic) {
                $proposal->socio_economic = array_merge($proposal->socio_economic, $socioEconomic);
            }
            $proposal->status = ProposalStatus::MENUNGGU_PEMERIKSAAN;
            $proposal->save();

            // Replace documents jika ada
            if ($documentFileIds) {
                $proposal->documents()->delete();
                foreach ($documentFileIds as $docData) {
                    ProposalDocument::create([
                        'proposal_id' => $proposal->id,
                        'kind' => $docData['kind'] ?? 'LAINNYA',
                        'file_id' => $docData['file_id'],
                    ]);
                }
            }

            // Create timeline
            ProposalTimeline::create([
                'proposal_id' => $proposal->id,
                'status' => ProposalStatus::MENUNGGU_PEMERIKSAAN->value,
                'note' => 'Revisi usulan diajukan',
                'actor_id' => $citizen->id,
                'actor_role' => $citizen->role->value,
            ]);

            $this->auditService->log(
                $citizen,
                'UPDATE',
                'proposals',
                $proposal->id,
                ['status' => ProposalStatus::PERLU_PERBAIKAN->value],
                ['status' => ProposalStatus::MENUNGGU_PEMERIKSAAN->value],
            );

            return $proposal;
        });
    }

    public function applyAction(
        Proposal $proposal,
        string $action,
        User $actor,
        ?string $note = null,
    ): Proposal {
        return DB::transaction(function () use ($proposal, $action, $actor, $note) {
            $currentStatus = $proposal->status->value;

            // Validate transition
            if (!TransitionTable::isValidProposalTransition($currentStatus, $action)) {
                throw new \InvalidArgumentException("Invalid transition from {$currentStatus} via {$action}");
            }

            // Validate required note for certain actions
            if (in_array($action, ['REQUEST_DOCS', 'REJECT'], true) && !$note) {
                throw new \InvalidArgumentException("Note wajib untuk action {$action}");
            }

            $newStatus = TransitionTable::getProposalNextStatus($currentStatus, $action);
            $proposal->status = ProposalStatus::from($newStatus);
            $proposal->save();

            // Create timeline
            ProposalTimeline::create([
                'proposal_id' => $proposal->id,
                'status' => $newStatus,
                'note' => $note ?? ProposalAction::from($action)->label(),
                'actor_id' => $actor->id,
                'actor_role' => $actor->role->value,
            ]);

            // Audit log
            $this->auditService->log(
                $actor,
                'STATUS_CHANGE',
                'proposals',
                $proposal->id,
                ['status' => $currentStatus],
                ['status' => $newStatus],
            );

            // Send notification to citizen
            $this->notificationService->proposalStatusChanged(
                citizen: $proposal->submittedBy,
                title: "Status Usulan Berubah: {$proposal->reference_no}",
                body: "Status usulan Anda berubah menjadi {$proposal->status->label()}",
                proposalId: $proposal->id,
            );

            return $proposal;
        });
    }
}
