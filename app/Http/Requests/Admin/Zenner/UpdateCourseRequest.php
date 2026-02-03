<?php

namespace App\Http\Requests\Admin\Zenner;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string|max:500',
            'level' => 'required|string|in:beginner,intermediate,advanced',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ];
    }
}
