<?php

namespace App\Http\Requests\Admin\Zenner;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMonthlyChallengeRequest extends FormRequest
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
            'image' => 'nullable|string|max:500',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'reward' => 'nullable|string',
            'is_active' => 'boolean',
        ];
    }
}
