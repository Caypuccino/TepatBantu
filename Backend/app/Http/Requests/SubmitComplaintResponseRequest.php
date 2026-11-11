<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitComplaintResponseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'response' => 'required|string|min:10',
        ];
    }

    public function messages(): array
    {
        return [
            'response.required' => 'Respons wajib diisi',
            'response.min' => 'Respons minimal 10 karakter',
        ];
    }
}
