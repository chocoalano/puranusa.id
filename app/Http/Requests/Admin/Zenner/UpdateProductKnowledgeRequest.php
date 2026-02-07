<?php

namespace App\Http\Requests\Admin\Zenner;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductKnowledgeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,webp,gif,svg|max:2048',
            'category' => 'nullable|string|max:100',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ];
    }
}
