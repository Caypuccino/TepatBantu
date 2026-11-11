<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitProposalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'personal_data' => 'required|array',
            'personal_data.full_name' => 'required|string|max:255',
            'personal_data.kk_number' => 'nullable|string|max:20',
            'personal_data.birth_date' => 'nullable|date|before:today',
            'personal_data.gender' => 'nullable|in:L,P',
            'personal_data.phone' => 'required|string|max:20',
            'personal_data.address' => 'required|string|max:500',
            'personal_data.province' => 'nullable|string',
            'personal_data.city' => 'nullable|string',
            'personal_data.district' => 'nullable|string',
            'personal_data.village' => 'nullable|string',

            'socio_economic' => 'required|array',
            'socio_economic.family_size' => 'required|integer|min:1|max:20',
            'socio_economic.employment_status' => 'required|string',
            'socio_economic.income_range' => 'required|string',
            'socio_economic.housing_status' => 'required|string',
            'socio_economic.house_condition' => 'required|string',
            'socio_economic.additional_notes' => 'nullable|string',

            'documents' => 'nullable|array',
            'documents.*.kind' => 'in:SKTM,FOTO_RUMAH,LAINNYA',
            'documents.*.file_id' => 'exists:file_objects,id',
        ];
    }

    public function messages(): array
    {
        return [
            'personal_data.required' => 'Data pribadi wajib diisi',
            'personal_data.full_name.required' => 'Nama lengkap wajib diisi',
            'personal_data.phone.required' => 'Nomor telepon wajib diisi',
            'personal_data.address.required' => 'Alamat wajib diisi',
            'socio_economic.required' => 'Data sosial ekonomi wajib diisi',
            'socio_economic.family_size.required' => 'Jumlah anggota keluarga wajib diisi',
            'socio_economic.family_size.min' => 'Jumlah anggota keluarga minimal 1',
            'documents.*.file_id.exists' => 'File tidak ditemukan',
        ];
    }
}
