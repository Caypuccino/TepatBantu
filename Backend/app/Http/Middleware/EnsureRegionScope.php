<?php declare(strict_types=1);

namespace App\Http\Middleware;

use App\Enums\Role;
use App\Services\RegionService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRegionScope
{
    public function __construct(
        private RegionService $regionService,
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return $next($request);
        }

        // Admin bypass region scope
        if ($user->role === Role::ADMIN) {
            $request->attributes->set('allowed_region_ids', null);
            return $next($request);
        }

        // Petugas harus punya region_id
        if ($user->role === Role::PETUGAS && !$user->region_id) {
            return response()->json([
                'error' => [
                    'code' => 'FORBIDDEN',
                    'message' => 'Petugas harus memiliki wilayah yang ditugaskan',
                ],
            ], 403);
        }

        // Compute subtree region IDs untuk petugas
        $allowedRegionIds = [];
        if ($user->role === Role::PETUGAS && $user->region_id) {
            $allowedRegionIds = $this->regionService->subtreeIds($user->region_id);
        }

        $request->attributes->set('allowed_region_ids', $allowedRegionIds);

        return $next($request);
    }
}
