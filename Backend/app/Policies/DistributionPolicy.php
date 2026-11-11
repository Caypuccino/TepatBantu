<?php declare(strict_types=1);

namespace App\Policies;

use App\Enums\Role;
use App\Models\Distribution;
use App\Models\User;

class DistributionPolicy
{
    public function view(User $user, Distribution $distribution): bool
    {
        // Admin dapat lihat semua
        if ($user->role === Role::ADMIN) {
            return true;
        }

        // Petugas dapat lihat jika beneficiary ada di wilayahnya
        if ($user->role === Role::PETUGAS && $user->region_id) {
            $allowedRegionIds = app(\App\Services\RegionService::class)->subtreeIds($user->region_id);
            $citizenRegion = $distribution->beneficiaryRecord->citizen->region_id;
            return in_array($citizenRegion, $allowedRegionIds, true);
        }

        return false;
    }

    public function update(User $user, Distribution $distribution): bool
    {
        // Admin dapat update semua
        if ($user->role === Role::ADMIN) {
            return true;
        }

        // Petugas dapat update jika beneficiary ada di wilayahnya
        if ($user->role === Role::PETUGAS && $user->region_id) {
            $allowedRegionIds = app(\App\Services\RegionService::class)->subtreeIds($user->region_id);
            $citizenRegion = $distribution->beneficiaryRecord->citizen->region_id;
            return in_array($citizenRegion, $allowedRegionIds, true);
        }

        return false;
    }
}
