<?php declare(strict_types=1);

namespace App\Services;

use App\Enums\Role;
use App\Enums\UserStatus;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

final class AuthService
{
    public function register(string $fullName, string $email, string $password, ?string $phone = null): User
    {
        return User::create([
            'full_name' => $fullName,
            'email' => $email,
            'phone' => $phone,
            'password' => Hash::make($password),
            'role' => Role::WARGA,
            'status' => UserStatus::AKTIF,
        ]);
    }

    public function login(string $email, string $password): ?User
    {
        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return null;
        }

        return $user;
    }

    public function createToken(User $user): string
    {
        return $user->createToken('auth_token')->plainTextToken;
    }

    public function logout(User $user): void
    {
        $user->tokens()->delete();
    }

    public function sendPasswordResetLink(string $email): bool
    {
        return Password::sendResetLink(['email' => $email]) === Password::RESET_LINK_SENT;
    }

    public function resetPassword(string $email, string $token, string $password): bool
    {
        $status = Password::reset(
            ['email' => $email, 'token' => $token, 'password' => $password, 'password_confirmation' => $password],
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET;
    }
}
