<?php

namespace App\Http\Requests\Admin\Zenner;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJoinMedsosRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'platform' => 'required|string|max:100',
            'url' => 'required|url|max:500',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'followers_count' => 'integer|min:0',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ];
    }
}
