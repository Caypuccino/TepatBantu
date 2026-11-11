<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CheckBansosRequest;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UploadFileRequest;
use App\Http\Resources\UserResource;
use App\Services\AuditService;
use App\Services\AuthService;
use App\Services\NikService;
use App\Services\PublicCheckService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function __construct(
        private AuthService $authService,
        private AuditService $auditService,
        private NikService $nikService,
    ) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->authService->register(
            $request->string('full_name')->value(),
            $request->string('email')->value(),
            $request->string('password')->value(),
            $request->string('phone')->value(),
        );

        $this->auditService->log(
            $user,
            'CREATE',
            'users',
            $user->id,
            null,
            ['email' => $user->email, 'role' => $user->role->value],
        );

        $token = $this->authService->createToken($user);

        return response()->json([
            'data' => [
                'token' => $token,
                'user' => UserResource::make($user),
            ],
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = $this->authService->login(
            $request->string('email')->value(),
            $request->string('password')->value(),
        );

        if (!$user) {
            return response()->json([
                'error' => [
                    'code' => 'UNAUTHORIZED',
                    'message' => 'Email atau password salah',
                ],
            ], 401);
        }

        $this->auditService->log($user, 'LOGIN', 'auth', null);

        $token = $this->authService->createToken($user);

        return response()->json([
            'data' => [
                'token' => $token,
                'user' => UserResource::make($user),
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        return response()->json([
            'message' => 'Logout berhasil',
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'data' => UserResource::make($request->user()),
        ]);
    }

    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $sent = $this->authService->sendPasswordResetLink(
            $request->string('email')->value(),
        );

        if (!$sent) {
            return response()->json([
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => 'Email tidak ditemukan',
                ],
            ], 404);
        }

        return response()->json([
            'message' => 'Link reset password telah dikirim ke email Anda',
        ]);
    }

    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $reset = $this->authService->resetPassword(
            $request->string('email')->value(),
            $request->string('token')->value(),
            $request->string('password')->value(),
        );

        if (!$reset) {
            return response()->json([
                'error' => [
                    'code' => 'CONFLICT',
                    'message' => 'Token reset password tidak valid atau sudah kadaluarsa',
                ],
            ], 422);
        }

        return response()->json([
            'message' => 'Password berhasil direset',
        ]);
    }
}
