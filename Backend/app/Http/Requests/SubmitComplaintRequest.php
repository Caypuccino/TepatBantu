<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitComplaintRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category' => 'required|in:BANTUAN_BELUM_DITERIMA,PEMOTONGAN,SALAH_SASAR,KETIDAKSESUAIAN_DATA,KENDALA_PENYALURAN,LAINNYA',
            'program_id' => 'nullable|exists:programs,id',
            'incident_date' => 'nullable|date|before_or_equal:today',
            'incident_location' => 'nullable|string|max:500',
            'description' => 'required|string|min:30',
            'confidential' => 'boolean',
            'evidences' => 'nullable|array',
            'evidences.*' => 'exists:file_objects,id',
        ];
    }

    public function messages(): array
    {
        return [
            'category.required' => 'Kategori pengaduan wajib diisi',
            'category.in' => 'Kategori pengaduan tidak valid',
            'description.required' => 'Deskripsi pengaduan wajib diisi',
            'description.min' => 'Deskripsi minimal 30 karakter',
            'evidences.*.exists' => 'File bukti tidak ditemukan',
        ];
    }
}
