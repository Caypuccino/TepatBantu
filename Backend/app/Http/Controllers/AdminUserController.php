<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Enums\UserStatus;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function __construct(
        private AuditService $auditService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $query = User::query();

        if ($request->filled('q')) {
            $q = $request->string('q')->value();
            $query->where(function ($builder) use ($q) {
                $builder->where('full_name', 'ilike', "%{$q}%")
                    ->orWhere('email', 'ilike', "%{$q}%");
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->string('role')->value());
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status')->value());
        }

        $pageSize = (int) $request->get('page_size', 20);
        $paginated = $query->orderByDesc('created_at')->paginate($pageSize);

        return response()->json([
            'data' => UserResource::collection($paginated->items()),
            'meta' => [
                'page' => $paginated->currentPage(),
                'page_size' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => $paginated->lastPage(),
            ],
        ]);
    }

    public function store(CreateUserRequest $request): JsonResponse
    {
        $user = User::create([
            'full_name' => $request->string('full_name')->value(),
            'email' => $request->string('email')->value(),
            'phone' => $request->string('phone')->value(),
            'password' => Hash::make($request->string('password')->value()),
            'role' => Role::from($request->string('role')->value()),
            'status' => UserStatus::from($request->string('status')->value() ?? 'AKTIF'),
            'region_id' => $request->string('region_id')->value(),
        ]);

        $this->auditService->log(
            $request->user(),
            'CREATE',
            'users',
            $user->id,
            null,
            ['email' => $user->email, 'role' => $user->role->value],
        );

        return response()->json([
            'data' => UserResource::make($user),
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Pengguna tidak ditemukan',
                ],
            ], 404);
        }

        return response()->json([
            'data' => UserResource::make($user),
        ]);
    }

    public function update(string $id, UpdateUserRequest $request): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Pengguna tidak ditemukan',
                ],
            ], 404);
        }

        $oldValues = $user->only(['full_name', 'email', 'phone', 'role', 'status', 'region_id']);

        $data = $request->only(['full_name', 'email', 'phone', 'role', 'status', 'region_id']);
        if ($request->filled('role')) {
            $data['role'] = Role::from($request->string('role')->value());
        }
        if ($request->filled('status')) {
            $data['status'] = UserStatus::from($request->string('status')->value());
        }

        $user->update($data);

        $this->auditService->log(
            $request->user(),
            'UPDATE',
            'users',
            $user->id,
            $oldValues,
            $user->only(['full_name', 'email', 'phone', 'role', 'status', 'region_id']),
        );

        return response()->json([
            'data' => UserResource::make($user),
        ]);
    }

    public function deactivate(string $id, Request $request): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Pengguna tidak ditemukan',
                ],
            ], 404);
        }

        // Cannot deactivate self
        if ($user->id === $request->user()->id) {
            return response()->json([
                'error' => [
                    'code' => 'CONFLICT',
                    'message' => 'Tidak dapat menonaktifkan akun sendiri',
                ],
            ], 422);
        }

        $user->update(['status' => UserStatus::NONAKTIF]);

        $this->auditService->log(
            $request->user(),
            'UPDATE',
            'users',
            $user->id,
            ['status' => UserStatus::AKTIF->value],
            ['status' => UserStatus::NONAKTIF->value],
        );

        return response()->json([
            'data' => UserResource::make($user),
        ]);
    }

    public function resetAccess(string $id, Request $request): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Pengguna tidak ditemukan',
                ],
            ], 404);
        }

        // Revoke all tokens
        $user->tokens()->delete();

        $this->auditService->log(
            $request->user(),
            'UPDATE',
            'users',
            $user->id,
            null,
            ['action' => 'reset_access'],
        );

        return response()->json([
            'message' => 'Akses pengguna telah direset',
        ]);
    }
}
