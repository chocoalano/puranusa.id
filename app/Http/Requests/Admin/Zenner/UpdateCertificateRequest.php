<?php

namespace App\Http\Requests\Admin\Zenner;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCertificateRequest extends FormRequest
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
            'template_image' => 'nullable|string|max:500',
            'type' => 'required|string|in:completion,achievement,participation',
            'is_active' => 'boolean',
        ];
    }
}
