<?php declare(strict_types=1);

namespace App\Policies;

use App\Enums\Role;
use App\Models\Complaint;
use App\Models\User;

class ComplaintPolicy
{
    public function view(User $user, Complaint $complaint): bool
    {
        // Admin dapat lihat semua
        if ($user->role === Role::ADMIN) {
            return true;
        }

        // Warga (pemilik) dapat lihat
        if ($user->role === Role::WARGA && $complaint->submitted_by === $user->id) {
            return true;
        }

        // Petugas dapat lihat jika dalam wilayahnya
        if ($user->role === Role::PETUGAS && $user->region_id) {
            $allowedRegionIds = app(\App\Services\RegionService::class)->subtreeIds($user->region_id);
            return in_array($complaint->region_id, $allowedRegionIds, true);
        }

        return false;
    }

    public function act(User $user, Complaint $complaint): bool
    {
        // Admin dapat aksi semua
        if ($user->role === Role::ADMIN) {
            return true;
        }

        // Petugas dapat aksi jika assigned atau dalam wilayahnya
        if ($user->role === Role::PETUGAS && $user->region_id) {
            $allowedRegionIds = app(\App\Services\RegionService::class)->subtreeIds($user->region_id);
            return in_array($complaint->region_id, $allowedRegionIds, true);
        }

        return false;
    }

    public function assign(User $user, Complaint $complaint): bool
    {
        // Hanya admin yang bisa assign
        return $user->role === Role::ADMIN;
    }
}
