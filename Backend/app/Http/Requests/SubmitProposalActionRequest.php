<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitProposalActionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'action' => 'required|in:ACCEPT,REQUEST_DOCS,SCHEDULE_FIELD,FIELD_PASS,FIELD_NEED_INFO,FIELD_FAIL,APPROVE,REJECT,COMPLETE',
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
