<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitProposalRevisionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'personal_data' => 'nullable|array',
            'personal_data.full_name' => 'nullable|string|max:255',
            'personal_data.phone' => 'nullable|string|max:20',
            'personal_data.address' => 'nullable|string|max:500',

            'socio_economic' => 'nullable|array',
            'socio_economic.family_size' => 'nullable|integer|min:1|max:20',
            'socio_economic.employment_status' => 'nullable|string',
            'socio_economic.income_range' => 'nullable|string',

            'documents' => 'nullable|array',
            'documents.*.kind' => 'in:SKTM,FOTO_RUMAH,LAINNYA',
            'documents.*.file_id' => 'exists:file_objects,id',
        ];
    }

    public function messages(): array
    {
        return [
            'documents.*.file_id.exists' => 'File tidak ditemukan',
        ];
    }
}
