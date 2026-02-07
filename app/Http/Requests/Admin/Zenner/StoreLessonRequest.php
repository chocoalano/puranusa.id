<?php

namespace App\Http\Requests\Admin\Zenner;

use Illuminate\Foundation\Http\FormRequest;

class StoreLessonRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'course_id' => 'required|integer|exists:zenner_courses,id',
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'video_url' => 'nullable|file|mimes:mp4,mov,webm,mkv,avi|max:51200',
            'duration_minutes' => 'integer|min:0',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ];
    }
}
