<?php declare(strict_types=1);

namespace App\Policies;

use App\Enums\Role;
use App\Models\Citizen;
use App\Models\User;

class CitizenPolicy
{
    public function view(User $user, Citizen $citizen): bool
    {
        // Admin dapat lihat semua
        if ($user->role === Role::ADMIN) {
            return true;
        }

        // Petugas dapat lihat jika dalam wilayahnya
        if ($user->role === Role::PETUGAS && $user->region_id) {
            $allowedRegionIds = app(\App\Services\RegionService::class)->subtreeIds($user->region_id);
            return in_array($citizen->region_id, $allowedRegionIds, true);
        }

        // Warga dapat lihat profil sendiri
        if ($user->role === Role::WARGA && $citizen->user_id === $user->id) {
            return true;
        }

        return false;
    }

    public function update(User $user, Citizen $citizen): bool
    {
        // Admin dapat update semua
        if ($user->role === Role::ADMIN) {
            return true;
        }

        // Warga dapat update profil sendiri
        if ($user->role === Role::WARGA && $citizen->user_id === $user->id) {
            return true;
        }

        return false;
    }

    public function revealNik(User $user, Citizen $citizen): bool
    {
        // Admin dapat reveal semua
        if ($user->role === Role::ADMIN) {
            return true;
        }

        // Petugas dapat reveal jika dalam wilayahnya
        if ($user->role === Role::PETUGAS && $user->region_id) {
            $allowedRegionIds = app(\App\Services\RegionService::class)->subtreeIds($user->region_id);
            return in_array($citizen->region_id, $allowedRegionIds, true);
        }

        return false;
    }
}
