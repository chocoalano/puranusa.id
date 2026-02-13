<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Page;

class StorePageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $reserved = ['terms', 'about', 'privacy', 'faq'];

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',

                // tetap cegah duplikat slug untuk semua slug
                Rule::unique('pages', 'slug'),

                // reserved slug boleh dipakai hanya jika belum ada record-nya
                function (string $attribute, mixed $value, \Closure $fail) use ($reserved) {
                    $slug = strtolower(trim((string) $value));

                    if (in_array($slug, $reserved, true)) {
                        $exists = Page::query()->where('slug', $slug)->exists();

                        if ($exists) {
                            $fail("Slug '{$slug}' sudah ada dan dilindungi, tidak boleh dibuat lagi.");
                        }
                    }
                },
            ],
            'content' => ['nullable', 'string'],
            'blocks' => ['nullable', 'json'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string', 'max:500'],
            'is_published' => ['boolean'],
            'template' => ['required', 'string', Rule::in(['default', 'full-width', 'narrow'])],
            'order' => ['integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul halaman wajib diisi.',
            'slug.required' => 'Slug halaman wajib diisi.',
            'slug.unique' => 'Slug ini sudah digunakan.',
            'template.in' => 'Template tidak valid.',
        ];
    }

    protected function prepareForValidation(): void
    {
        // Optional tapi bagus: rapikan slug sebelum validasi
        $normalized = [];

        if ($this->has('slug')) {
            $normalized['slug'] = strtolower(trim((string) $this->input('slug')));
        }

        if ($this->has('is_published')) {
            $normalized['is_published'] = filter_var(
                $this->input('is_published'),
                FILTER_VALIDATE_BOOLEAN,
                FILTER_NULL_ON_FAILURE
            );
        }

        if (! empty($normalized)) {
            $this->merge($normalized);
        }
    }
}
