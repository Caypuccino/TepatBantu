<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReturnProposalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'note' => 'required|string|min:10',
        ];
    }

    public function messages(): array
    {
        return [
            'note.required' => 'Catatan pengembalian wajib diisi',
            'note.min' => 'Catatan minimal 10 karakter',
        ];
    }
}
