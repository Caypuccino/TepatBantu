<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\CitizenResource;
use App\Http\Resources\ComplaintResource;
use App\Http\Resources\DistributionResource;
use App\Http\Resources\ProposalResource;
use App\Models\Citizen;
use App\Models\Complaint;
use App\Models\Distribution;
use App\Models\Proposal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OfficerDashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $allowedRegionIds = $request->attributes->get('allowed_region_ids', []);

        // Get dashboard aggregates for officer's region
        $totalProposals = Proposal::whereIn('region_id', $allowedRegionIds)->count();
        $totalComplaints = Complaint::whereIn('region_id', $allowedRegionIds)->count();
        $totalDistributions = Distribution::whereIn(
            'beneficiary_record_id',
            \DB::table('beneficiary_records')->whereIn('region_id', $allowedRegionIds)->select('id')
        )->count();

        $proposalsByStatus = Proposal::whereIn('region_id', $allowedRegionIds)
            ->groupBy('status')
            ->selectRaw('status, count(*) as count')
            ->pluck('count', 'status');

        $complaintsByStatus = Complaint::whereIn('region_id', $allowedRegionIds)
            ->groupBy('status')
            ->selectRaw('status, count(*) as count')
            ->pluck('count', 'status');

        return response()->json([
            'data' => [
                'total_proposals' => $totalProposals,
                'total_complaints' => $totalComplaints,
                'total_distributions' => $totalDistributions,
                'proposals_by_status' => $proposalsByStatus,
                'complaints_by_status' => $complaintsByStatus,
            ],
        ]);
    }

    public function citizens(Request $request): JsonResponse
    {
        $user = $request->user();
        $allowedRegionIds = $request->attributes->get('allowed_region_ids', []);

        $query = Citizen::whereIn('region_id', $allowedRegionIds);

        if ($request->filled('q')) {
            $q = $request->string('q')->value();
            $query->where(function ($builder) use ($q) {
                $builder->where('full_name', 'ilike', "%{$q}%")
                    ->orWhere('phone', 'ilike', "%{$q}%");
            });
        }

        $pageSize = (int) $request->get('page_size', 20);
        $paginated = $query->orderByDesc('created_at')->paginate($pageSize);

        return response()->json([
            'data' => CitizenResource::collection($paginated->items()),
            'meta' => [
                'page' => $paginated->currentPage(),
                'page_size' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => $paginated->lastPage(),
            ],
        ]);
    }

    public function showCitizen(string $id, Request $request): JsonResponse
    {
        $user = $request->user();
        $allowedRegionIds = $request->attributes->get('allowed_region_ids', []);

        $citizen = Citizen::where('id', $id)
            ->whereIn('region_id', $allowedRegionIds)
            ->first();

        if (!$citizen) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Warga tidak ditemukan',
                ],
            ], 404);
        }

        return response()->json([
            'data' => CitizenResource::make($citizen),
        ]);
    }
}
