<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $pageId = $this->route('page');
        $page = \App\Models\Page::find($pageId);
        $protectedSlugs = ['terms', 'about', 'privacy', 'faq'];

        // If this is a protected page, only allow title, content, and blocks to be updated
        if ($page && in_array($page->slug, $protectedSlugs)) {
            return [
                'title' => ['required', 'string', 'max:255'],
                'content' => ['nullable', 'string'],
                'blocks' => ['nullable', 'json'],
                // Slug cannot be changed for protected pages
                'slug' => ['required', 'string', 'in:'.$page->slug],
            ];
        }

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                'unique:pages,slug,'.$pageId,
                'not_in:terms,about,privacy,faq',
            ],
            'content' => ['nullable', 'string'],
            'blocks' => ['nullable', 'json'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string', 'max:500'],
            'is_published' => ['boolean'],
            'template' => ['required', 'string', 'in:default,full-width,narrow'],
            'order' => ['integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul halaman wajib diisi.',
            'slug.required' => 'Slug halaman wajib diisi.',
            'slug.unique' => 'Slug ini sudah digunakan.',
            'slug.not_in' => 'Slug ini dilindungi dan tidak dapat digunakan (terms, about, privacy, faq).',
            'slug.in' => 'Slug halaman sistem tidak dapat diubah.',
            'template.in' => 'Template tidak valid.',
        ];
    }
}
