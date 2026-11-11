<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'gender' => 'nullable|in:L,P',
            'birth_date' => 'nullable|date|before:today',
            'kk_number' => 'nullable|string|max:20',
        ];
    }

    public function messages(): array
    {
        return [
            'gender.in' => 'Jenis kelamin harus L atau P',
            'birth_date.before' => 'Tanggal lahir harus sebelum hari ini',
        ];
    }
}
