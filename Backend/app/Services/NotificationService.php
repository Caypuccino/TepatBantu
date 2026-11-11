<?php declare(strict_types=1);

namespace App\Services;

use App\Models\Notification;
use App\Models\User;

final class NotificationService
{
    public function proposalStatusChanged(User $citizen, string $title, string $body, string $proposalId): Notification
    {
        return $this->notify($citizen, 'proposal_status_changed', $title, $body, 'proposal', $proposalId);
    }

    public function complaintStatusChanged(User $citizen, string $title, string $body, string $complaintId): Notification
    {
        return $this->notify($citizen, 'complaint_status_changed', $title, $body, 'complaint', $complaintId);
    }

    public function additionalDocsRequested(User $citizen, string $title, string $body, string $proposalId): Notification
    {
        return $this->notify($citizen, 'additional_docs_requested', $title, $body, 'proposal', $proposalId);
    }

    public function distributionUpdated(User $citizen, string $title, string $body, string $distributionId): Notification
    {
        return $this->notify($citizen, 'distribution_updated', $title, $body, 'distribution', $distributionId);
    }

    public function proposalAssigned(User $officer, string $title, string $body, string $proposalId): Notification
    {
        return $this->notify($officer, 'proposal_assigned', $title, $body, 'proposal', $proposalId);
    }

    public function complaintAssigned(User $officer, string $title, string $body, string $complaintId): Notification
    {
        return $this->notify($officer, 'complaint_assigned', $title, $body, 'complaint', $complaintId);
    }

    public function broadcastAnnouncement(string $title, string $body): void
    {
        $users = User::where('role', 'WARGA')
            ->where('status', 'AKTIF')
            ->get();

        foreach ($users as $user) {
            $this->notify($user, 'announcement', $title, $body);
        }
    }

    private function notify(
        User $user,
        string $type,
        string $title,
        string $body,
        ?string $relatedType = null,
        ?string $relatedId = null,
    ): Notification {
        return Notification::create([
            'user_id' => $user->id,
            'type' => $type,
            'title' => $title,
            'body' => $body,
            'related_type' => $relatedType,
            'related_id' => $relatedId,
        ]);
    }
}
