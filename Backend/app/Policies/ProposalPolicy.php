<?php declare(strict_types=1);

namespace App\Policies;

use App\Enums\Role;
use App\Models\Proposal;
use App\Models\User;

class ProposalPolicy
{
    public function view(User $user, Proposal $proposal): bool
    {
        // Admin dapat lihat semua
        if ($user->role === Role::ADMIN) {
            return true;
        }

        // Warga (pemilik) dapat lihat
        if ($user->role === Role::WARGA) {
            $citizen = $proposal->citizen;
            return $citizen && $citizen->user_id === $user->id;
        }

        // Petugas dapat lihat jika dalam wilayahnya
        if ($user->role === Role::PETUGAS && $user->region_id) {
            $allowedRegionIds = app(\App\Services\RegionService::class)->subtreeIds($user->region_id);
            return in_array($proposal->region_id, $allowedRegionIds, true);
        }

        return false;
    }

    public function act(User $user, Proposal $proposal): bool
    {
        // Admin dapat aksi semua
        if ($user->role === Role::ADMIN) {
            return true;
        }

        // Petugas dapat aksi jika dalam wilayahnya
        if ($user->role === Role::PETUGAS && $user->region_id) {
            $allowedRegionIds = app(\App\Services\RegionService::class)->subtreeIds($user->region_id);
            return in_array($proposal->region_id, $allowedRegionIds, true);
        }

        return false;
    }

    public function assign(User $user, Proposal $proposal): bool
    {
        // Hanya admin yang bisa assign
        return $user->role === Role::ADMIN;
    }
}
