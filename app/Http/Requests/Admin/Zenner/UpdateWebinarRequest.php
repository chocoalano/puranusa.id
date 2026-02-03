<?php

namespace App\Http\Requests\Admin\Zenner;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWebinarRequest extends FormRequest
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
            'speaker' => 'nullable|string|max:255',
            'scheduled_at' => 'required|date',
            'duration_minutes' => 'integer|min:1',
            'meeting_url' => 'nullable|url|max:500',
            'status' => 'required|string|in:upcoming,live,completed,cancelled',
            'is_active' => 'boolean',
        ];
    }
}
