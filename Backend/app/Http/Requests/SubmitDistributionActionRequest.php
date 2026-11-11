<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitDistributionActionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'action' => 'required|in:SCHEDULE,READY,DELIVER,FLAG_ISSUE,RESOLVE_ISSUE',
            'note' => 'nullable|string|min:5',
            'scheduled_date' => 'nullable|date|after_or_equal:today',
            'location' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'action.required' => 'Aksi wajib diisi',
            'action.in' => 'Aksi tidak valid',
            'scheduled_date.after_or_equal' => 'Tanggal jadwal harus hari ini atau lebih kemudian',
        ];
    }
}
