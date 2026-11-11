<?php declare(strict_types=1);

namespace App\Support;

use App\Enums\ProposalStatus;
use App\Enums\ProposalAction;
use App\Enums\ComplaintStatus;
use App\Enums\ComplaintAction;
use App\Enums\DistributionStatus;
use App\Enums\DistributionAction;

final class TransitionTable
{
    /**
     * Proposal state machine transitions
     * Format: [currentStatus][action] = newStatus
     */
    public static function proposalTransitions(): array
    {
        return [
            ProposalStatus::DIAJUKAN->value => [
                ProposalAction::ACCEPT->value => ProposalStatus::MENUNGGU_PEMERIKSAAN->value,
            ],
            ProposalStatus::MENUNGGU_PEMERIKSAAN->value => [
                ProposalAction::REQUEST_DOCS->value => ProposalStatus::PERLU_PERBAIKAN->value,
                ProposalAction::SCHEDULE_FIELD->value => ProposalStatus::VERIFIKASI_LAPANGAN->value,
                ProposalAction::APPROVE->value => ProposalStatus::DISETUJUI->value,
                ProposalAction::REJECT->value => ProposalStatus::DITOLAK->value,
            ],
            ProposalStatus::VERIFIKASI_LAPANGAN->value => [
                ProposalAction::FIELD_PASS->value => ProposalStatus::DISETUJUI->value,
                ProposalAction::FIELD_NEED_INFO->value => ProposalStatus::PERLU_PERBAIKAN->value,
                ProposalAction::FIELD_FAIL->value => ProposalStatus::DITOLAK->value,
            ],
            ProposalStatus::PERLU_PERBAIKAN->value => [
                ProposalAction::ACCEPT->value => ProposalStatus::MENUNGGU_PEMERIKSAAN->value,
            ],
            ProposalStatus::DISETUJUI->value => [
                ProposalAction::COMPLETE->value => ProposalStatus::SELESAI->value,
            ],
            ProposalStatus::DITOLAK->value => [
                ProposalAction::COMPLETE->value => ProposalStatus::SELESAI->value,
            ],
        ];
    }

    /**
     * Complaint state machine transitions
     */
    public static function complaintTransitions(): array
    {
        return [
            ComplaintStatus::DIAJUKAN->value => [
                ComplaintAction::REVIEW->value => ComplaintStatus::DITINJAU->value,
            ],
            ComplaintStatus::DITINJAU->value => [
                ComplaintAction::START_INVESTIGATION->value => ComplaintStatus::DALAM_INVESTIGASI->value,
                ComplaintAction::REQUEST_INFO->value => ComplaintStatus::MEMBUTUHKAN_INFO->value,
            ],
            ComplaintStatus::DALAM_INVESTIGASI->value => [
                ComplaintAction::REQUEST_INFO->value => ComplaintStatus::MEMBUTUHKAN_INFO->value,
                ComplaintAction::RECORD_FINDINGS->value => ComplaintStatus::DALAM_INVESTIGASI->value,
                ComplaintAction::FORWARD->value => ComplaintStatus::DITERUSKAN->value,
                ComplaintAction::RESOLVE->value => ComplaintStatus::DISELESAIKAN->value,
                ComplaintAction::CLOSE->value => ComplaintStatus::DITUTUP->value,
            ],
            ComplaintStatus::MEMBUTUHKAN_INFO->value => [
                ComplaintAction::REVIEW->value => ComplaintStatus::DALAM_INVESTIGASI->value,
            ],
            ComplaintStatus::DITERUSKAN->value => [
                ComplaintAction::RESOLVE->value => ComplaintStatus::DISELESAIKAN->value,
                ComplaintAction::CLOSE->value => ComplaintStatus::DITUTUP->value,
            ],
            ComplaintStatus::DISELESAIKAN->value => [
                ComplaintAction::CLOSE->value => ComplaintStatus::DITUTUP->value,
            ],
        ];
    }

    /**
     * Distribution state machine transitions
     */
    public static function distributionTransitions(): array
    {
        return [
            DistributionStatus::ALOKASI_TERCATAT->value => [
                DistributionAction::SCHEDULE->value => DistributionStatus::DIJADWALKAN->value,
                DistributionAction::FLAG_ISSUE->value => DistributionStatus::KENDALA->value,
            ],
            DistributionStatus::DIJADWALKAN->value => [
                DistributionAction::READY->value => DistributionStatus::SIAP_DISALURKAN->value,
                DistributionAction::FLAG_ISSUE->value => DistributionStatus::KENDALA->value,
            ],
            DistributionStatus::SIAP_DISALURKAN->value => [
                DistributionAction::DELIVER->value => DistributionStatus::TELAH_DISALURKAN->value,
                DistributionAction::FLAG_ISSUE->value => DistributionStatus::KENDALA->value,
            ],
            DistributionStatus::TELAH_DISALURKAN->value => [
                DistributionAction::FLAG_ISSUE->value => DistributionStatus::KENDALA->value,
            ],
            DistributionStatus::KENDALA->value => [
                DistributionAction::RESOLVE_ISSUE->value => DistributionStatus::SIAP_DISALURKAN->value,
            ],
        ];
    }

    /**
     * Check if transition is valid
     */
    public static function isValidProposalTransition(string $currentStatus, string $action): bool
    {
        return isset(self::proposalTransitions()[$currentStatus][$action]);
    }

    public static function isValidComplaintTransition(string $currentStatus, string $action): bool
    {
        return isset(self::complaintTransitions()[$currentStatus][$action]);
    }

    public static function isValidDistributionTransition(string $currentStatus, string $action): bool
    {
        return isset(self::distributionTransitions()[$currentStatus][$action]);
    }

    /**
     * Get next status for proposal
     */
    public static function getProposalNextStatus(string $currentStatus, string $action): ?string
    {
        return self::proposalTransitions()[$currentStatus][$action] ?? null;
    }

    public static function getComplaintNextStatus(string $currentStatus, string $action): ?string
    {
        return self::complaintTransitions()[$currentStatus][$action] ?? null;
    }

    public static function getDistributionNextStatus(string $currentStatus, string $action): ?string
    {
        return self::distributionTransitions()[$currentStatus][$action] ?? null;
    }
}
