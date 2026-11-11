<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('id');

        return [
            'full_name' => 'nullable|string|max:255',
            'email' => "nullable|email|unique:users,email,{$userId}",
            'phone' => 'nullable|string|max:20',
            'role' => 'nullable|in:WARGA,PETUGAS,ADMIN',
            'region_id' => 'nullable|exists:regions,id',
            'status' => 'nullable|in:AKTIF,NONAKTIF,MENUNGGU_VERIFIKASI',
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'Email sudah terdaftar',
            'region_id.exists' => 'Wilayah tidak ditemukan',
        ];
    }
}
