<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignProposalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'officer_id' => 'required|exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'officer_id.required' => 'Petugas wajib diisi',
            'officer_id.exists' => 'Petugas tidak ditemukan',
        ];
    }
}
