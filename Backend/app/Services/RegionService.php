<?php declare(strict_types=1);

namespace App\Services;

use App\Models\Region;
use Illuminate\Support\Collection;

final class RegionService
{
    /**
     * Get all region IDs in subtree (including self)
     */
    public function subtreeIds(string $regionId): array
    {
        $region = Region::find($regionId);
        if (!$region) {
            return [];
        }

        $ids = [$regionId];
        $children = Region::where('parent_id', $regionId)->get();

        foreach ($children as $child) {
            $ids = array_merge($ids, $this->subtreeIds($child->id));
        }

        return $ids;
    }

    /**
     * Check if a region is within the officer's scope
     */
    public function isWithinScope(string $regionId, string $officerRegionId): bool
    {
        $allowedIds = $this->subtreeIds($officerRegionId);
        return in_array($regionId, $allowedIds, true);
    }

    /**
     * Get all children regions
     */
    public function children(string $parentId): Collection
    {
        return Region::where('parent_id', $parentId)->get();
    }

    /**
     * Get parent region
     */
    public function parent(string $regionId): ?Region
    {
        $region = Region::find($regionId);
        return $region?->parent;
    }
}
