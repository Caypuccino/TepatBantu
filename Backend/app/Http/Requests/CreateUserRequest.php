<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:WARGA,PETUGAS,ADMIN',
            'region_id' => 'required_if:role,PETUGAS|nullable|exists:regions,id',
            'status' => 'nullable|in:AKTIF,NONAKTIF,MENUNGGU_VERIFIKASI',
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required' => 'Nama lengkap wajib diisi',
            'email.required' => 'Email wajib diisi',
            'email.unique' => 'Email sudah terdaftar',
            'password.required' => 'Password wajib diisi',
            'password.min' => 'Password minimal 8 karakter',
            'password.confirmed' => 'Konfirmasi password tidak cocok',
            'role.required' => 'Role wajib diisi',
            'role.in' => 'Role tidak valid',
            'region_id.required_if' => 'Wilayah wajib diisi untuk petugas',
            'region_id.exists' => 'Wilayah tidak ditemukan',
        ];
    }
}
