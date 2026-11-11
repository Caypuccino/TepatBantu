<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\AuditLogResource;
use App\Models\AuditLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAuditLogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = AuditLog::with('user');

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->string('user_id')->value());
        }

        if ($request->filled('role')) {
            $query->where('role', $request->string('role')->value());
        }

        if ($request->filled('action_type')) {
            $query->where('action_type', $request->string('action_type')->value());
        }

        if ($request->filled('module')) {
            $query->where('module', $request->string('module')->value());
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->string('date_from')->value());
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->string('date_to')->value());
        }

        $pageSize = (int) $request->get('page_size', 50);
        $paginated = $query->orderByDesc('created_at')->paginate($pageSize);

        return response()->json([
            'data' => AuditLogResource::collection($paginated->items()),
            'meta' => [
                'page' => $paginated->currentPage(),
                'page_size' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => $paginated->lastPage(),
            ],
        ]);
    }
}
