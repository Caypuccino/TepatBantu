<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePressReleaseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'thumbnail_url' => 'nullable|url|max:500',
            'content' => 'required|string|min:50',
            'status' => 'nullable|in:DRAFT,PUBLISHED,ARCHIVED',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul press release wajib diisi',
            'category.required' => 'Kategori wajib diisi',
            'content.required' => 'Konten wajib diisi',
            'content.min' => 'Konten minimal 50 karakter',
            'thumbnail_url.url' => 'Format URL thumbnail tidak valid',
        ];
    }
}
