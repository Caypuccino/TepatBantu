<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadFileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'File wajib diunggah',
            'file.mimes' => 'File hanya boleh JPG, PNG, atau PDF',
            'file.max' => 'Ukuran file maksimal 5MB',
        ];
    }
}
