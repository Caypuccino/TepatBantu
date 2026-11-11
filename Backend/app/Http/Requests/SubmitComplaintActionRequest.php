<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitComplaintActionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'action' => 'required|in:REVIEW,START_INVESTIGATION,REQUEST_INFO,RECORD_FINDINGS,FORWARD,RESOLVE,CLOSE',
            'note' => 'nullable|string|min:10',
        ];
    }

    public function messages(): array
    {
        return [
            'action.required' => 'Aksi wajib diisi',
            'action.in' => 'Aksi tidak valid',
            'note.min' => 'Catatan minimal 10 karakter',
        ];
    }
}
