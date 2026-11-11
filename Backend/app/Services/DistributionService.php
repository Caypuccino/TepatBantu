<?php declare(strict_types=1);

namespace App\Services;

use App\Enums\DistributionAction;
use App\Enums\DistributionStatus;
use App\Models\Distribution;
use App\Models\DistributionHistory;
use App\Models\User;
use App\Support\TransitionTable;
use Illuminate\Support\Facades\DB;

final class DistributionService
{
    public function __construct(
        private NotificationService $notificationService,
        private AuditService $auditService,
    ) {}

    public function applyAction(
        Distribution $distribution,
        string $action,
        User $actor,
        ?string $note = null,
        ?string $scheduledDate = null,
        ?string $location = null,
    ): Distribution {
        return DB::transaction(function () use (
            $distribution,
            $action,
            $actor,
            $note,
            $scheduledDate,
            $location,
        ) {
            $currentStatus = $distribution->status->value;

            // Validate transition
            if (!TransitionTable::isValidDistributionTransition($currentStatus, $action)) {
                throw new \InvalidArgumentException("Invalid transition from {$currentStatus} via {$action}");
            }

            $newStatus = TransitionTable::getDistributionNextStatus($currentStatus, $action);
            $fromStatus = $distribution->status;
            $distribution->status = DistributionStatus::from($newStatus);

            // Update additional fields if provided
            if ($scheduledDate) {
                $distribution->scheduled_date = $scheduledDate;
            }
            if ($location) {
                $distribution->location = $location;
            }

            $distribution->updated_by = $actor->id;
            $distribution->save();

            // Create history
            DistributionHistory::create([
                'distribution_id' => $distribution->id,
                'from_status' => $fromStatus->value,
                'to_status' => $newStatus,
                'note' => $note ?? DistributionAction::from($action)->label(),
                'changed_by' => $actor->id,
            ]);

            // Audit log
            $this->auditService->log(
                $actor,
                'STATUS_CHANGE',
                'distributions',
                $distribution->id,
                ['status' => $currentStatus],
                ['status' => $newStatus],
            );

            // Send notification to citizen
            $citizen = $distribution->beneficiaryRecord->citizen->user;
            if ($citizen) {
                $this->notificationService->distributionUpdated(
                    citizen: $citizen,
                    title: "Distribusi Bantuan Diperbarui - {$distribution->beneficiaryRecord->program->code}",
                    body: "Status distribusi Anda berubah menjadi {$distribution->status->label()}",
                    distributionId: $distribution->id,
                );
            }

            return $distribution;
        });
    }

    public function updateNotes(
        Distribution $distribution,
        string $notes,
        User $actor,
    ): Distribution {
        return DB::transaction(function () use ($distribution, $notes, $actor) {
            $oldNotes = $distribution->notes;
            $distribution->notes = $notes;
            $distribution->updated_by = $actor->id;
            $distribution->save();

            $this->auditService->log(
                $actor,
                'UPDATE',
                'distributions',
                $distribution->id,
                ['notes' => $oldNotes],
                ['notes' => $notes],
            );

            return $distribution;
        });
    }
}
