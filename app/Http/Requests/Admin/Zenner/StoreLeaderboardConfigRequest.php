<?php

namespace App\Http\Requests\Admin\Zenner;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeaderboardConfigRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:sales,recruitment,performance',
            'period' => 'required|string|in:weekly,monthly,quarterly,yearly',
            'calculation_field' => 'required|string|max:100',
            'is_active' => 'boolean',
        ];
    }
}
