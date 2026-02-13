<?php

namespace App\Http\Requests\Admin;

use App\Models\Page;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $protectedSlugs = ['terms', 'about', 'privacy', 'faq'];

        // Route model binding idealnya sudah ngasih instance Page
        $routePage = $this->route('page');

        // Kalau ada kasus route bind kamu ngembaliin Collection, ambil first (lebih baik perbaiki bind-nya)
        if ($routePage instanceof \Illuminate\Database\Eloquent\Collection) {
            $routePage = $routePage->first();
        }

        // Pastikan $page adalah Model Page
        $page = $routePage instanceof Page
            ? $routePage
            : Page::query()->findOrFail($routePage); // kalau route param masih id

        $slugRules = [
            'required',
            'string',
            'max:255',
            Rule::unique('pages', 'slug')->ignore($page->id),
        ];

        // Halaman protected boleh diupdate, tapi slug tidak boleh diubah
        if (in_array($page->slug, $protectedSlugs, true)) {
            $slugRules[] = Rule::in([$page->slug]);
        } else {
            // Halaman non-protected tidak boleh memakai slug sistem
            $slugRules[] = Rule::notIn($protectedSlugs);
        }

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => $slugRules,
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
            'slug.not_in' => 'Slug ini dilindungi dan tidak dapat digunakan (terms, about, privacy, faq).',
            'slug.in' => 'Slug halaman sistem tidak dapat diubah.',
            'template.in' => 'Template tidak valid.',
        ];
    }

    protected function prepareForValidation(): void
    {
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
