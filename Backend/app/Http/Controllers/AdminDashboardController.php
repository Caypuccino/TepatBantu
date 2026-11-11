<?php declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        // Get global agregates
        $totalUsers = \App\Models\User::count();
        $totalCitizens = \App\Models\Citizen::count();
        $totalProposals = \App\Models\Proposal::count();
        $totalComplaints = \App\Models\Complaint::count();
        $totalDistributions = \App\Models\Distribution::count();

        $usersByRole = \App\Models\User::groupBy('role')
            ->selectRaw('role, count(*) as count')
            ->pluck('count', 'role');

        $proposalsByStatus = \App\Models\Proposal::groupBy('status')
            ->selectRaw('status, count(*) as count')
            ->pluck('count', 'status');

        $complaintsByStatus = \App\Models\Complaint::groupBy('status')
            ->selectRaw('status, count(*) as count')
            ->pluck('count', 'status');

        $distributionsByStatus = \App\Models\Distribution::groupBy('status')
            ->selectRaw('status, count(*) as count')
            ->pluck('count', 'status');

        return response()->json([
            'data' => [
                'total_users' => $totalUsers,
                'total_citizens' => $totalCitizens,
                'total_proposals' => $totalProposals,
                'total_complaints' => $totalComplaints,
                'total_distributions' => $totalDistributions,
                'users_by_role' => $usersByRole,
                'proposals_by_status' => $proposalsByStatus,
                'complaints_by_status' => $complaintsByStatus,
                'distributions_by_status' => $distributionsByStatus,
            ],
        ]);
    }
}
