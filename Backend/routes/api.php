<?php declare(strict_types=1);

use App\Http\Controllers\AdminAuditLogController;
use App\Http\Controllers\AdminCitizenController;
use App\Http\Controllers\AdminComplaintController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminDistributionController;
use App\Http\Controllers\AdminPressReleaseController;
use App\Http\Controllers\AdminProposalController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OfficerComplaintController;
use App\Http\Controllers\OfficerDashboardController;
use App\Http\Controllers\OfficerDistributionController;
use App\Http\Controllers\OfficerProposalController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\PublicCheckBansosController;
use App\Http\Controllers\PublicComplaintController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\PublicProposalController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Public endpoints
    Route::prefix('public')->group(function () {
        Route::post('check-bansos', [PublicCheckBansosController::class, 'check']);
        Route::post('pengajuan', [PublicProposalController::class, 'submit']);
        Route::post('sanggahan', [PublicComplaintController::class, 'submit']);
        Route::get('stats', [PublicController::class, 'stats']);
        Route::get('press-releases', [PublicController::class, 'pressReleases']);
        Route::get('press-releases/{slug}', [PublicController::class, 'pressReleaseDetail']);
        Route::get('regions', [\App\Http\Controllers\PublicRegionController::class, 'index']);
    });

    // Upload endpoint (auth optional)
    Route::post('uploads', [PublicController::class, 'upload']);

    // Auth endpoints
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
        Route::post('reset-password', [AuthController::class, 'resetPassword']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [AuthController::class, 'logout']);
            Route::get('me', [AuthController::class, 'me']);
        });
    });

    // Warga endpoints (auth required)
    Route::middleware('auth:sanctum')->prefix('me')->group(function () {
        // Profile
        Route::get('profile', [ProfileController::class, 'getProfile']);
        Route::patch('profile', [ProfileController::class, 'updateProfile']);

        // Assistance
        Route::get('assistance', [ProfileController::class, 'getAssistance']);

        // Proposals
        Route::get('proposals', [ProposalController::class, 'index']);
        Route::post('proposals', [ProposalController::class, 'store']);
        Route::get('proposals/{id}', [ProposalController::class, 'show']);
        Route::post('proposals/{id}/revisions', [ProposalController::class, 'submitRevision']);

        // Complaints
        Route::get('complaints', [ComplaintController::class, 'index']);
        Route::post('complaints', [ComplaintController::class, 'store']);
        Route::get('complaints/{id}', [ComplaintController::class, 'show']);
        Route::post('complaints/{id}/responses', [ComplaintController::class, 'respondToInfoRequest']);

        // Notifications
        Route::get('notifications', [NotificationController::class, 'index']);
        Route::post('notifications/read-all', [NotificationController::class, 'markAllAsRead']);
        Route::patch('notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    });

    // Officer endpoints (auth required, petugas role)
    Route::middleware(['auth:sanctum', 'ensure.region.scope'])->prefix('officer')->group(function () {
        // Dashboard
        Route::get('dashboard', [OfficerDashboardController::class, 'index']);

        // Citizens
        Route::get('citizens', [OfficerDashboardController::class, 'citizens']);
        Route::get('citizens/{id}', [OfficerDashboardController::class, 'showCitizen']);

        // Proposals
        Route::get('proposals', [OfficerProposalController::class, 'index']);
        Route::get('proposals/{id}', [OfficerProposalController::class, 'show']);
        Route::post('proposals/{id}/actions', [OfficerProposalController::class, 'applyAction']);

        // Complaints
        Route::get('complaints', [OfficerComplaintController::class, 'index']);
        Route::get('complaints/{id}', [OfficerComplaintController::class, 'show']);
        Route::post('complaints/{id}/actions', [OfficerComplaintController::class, 'applyAction']);

        // Distributions
        Route::get('distributions', [OfficerDistributionController::class, 'index']);
        Route::patch('distributions/{id}', [OfficerDistributionController::class, 'update']);
    });

    // Admin endpoints (auth required, admin role)
    Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
        // Dashboard
        Route::get('dashboard', [AdminDashboardController::class, 'index']);

        // Users
        Route::get('users', [AdminUserController::class, 'index']);
        Route::post('users', [AdminUserController::class, 'store']);
        Route::get('users/{id}', [AdminUserController::class, 'show']);
        Route::patch('users/{id}', [AdminUserController::class, 'update']);
        Route::post('users/{id}/deactivate', [AdminUserController::class, 'deactivate']);
        Route::post('users/{id}/reset-access', [AdminUserController::class, 'resetAccess']);

        // Citizens
        Route::get('citizens', [AdminCitizenController::class, 'index']);
        Route::get('citizens/{id}', [AdminCitizenController::class, 'show']);
        Route::post('citizens/{id}/reveal-nik', [AdminCitizenController::class, 'revealNik']);

        // Proposals
        Route::get('proposals', [AdminProposalController::class, 'index']);
        Route::get('proposals/{id}', [AdminProposalController::class, 'show']);
        Route::post('proposals/{id}/assign', [AdminProposalController::class, 'assign']);
        Route::post('proposals/{id}/return', [AdminProposalController::class, 'return']);

        // Complaints
        Route::get('complaints', [AdminComplaintController::class, 'index']);
        Route::post('complaints/{id}/assign', [AdminComplaintController::class, 'assign']);

        // Distributions
        Route::get('distributions', [AdminDistributionController::class, 'index']);
        Route::patch('distributions/{id}', [AdminDistributionController::class, 'update']);

        // Press releases
        Route::get('press-releases', [AdminPressReleaseController::class, 'index']);
        Route::post('press-releases', [AdminPressReleaseController::class, 'store']);
        Route::get('press-releases/{id}', [AdminPressReleaseController::class, 'show']);
        Route::patch('press-releases/{id}', [AdminPressReleaseController::class, 'update']);
        Route::post('press-releases/{id}/publish', [AdminPressReleaseController::class, 'publish']);
        Route::post('press-releases/{id}/archive', [AdminPressReleaseController::class, 'archive']);

        // Audit logs (read-only)
        Route::get('audit-logs', [AdminAuditLogController::class, 'index']);
    });
});

