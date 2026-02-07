<?php

namespace App\Http\Requests\Admin\Zenner;

use Illuminate\Foundation\Http\FormRequest;

class StoreMarketingKitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $fileRules = $this->fileRules();

        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file_type' => 'required|string|in:image,video,pdf,document',
            'file_path' => $fileRules,
            'thumbnail' => 'nullable|string|max:500',
            'category' => 'nullable|string|max:100',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ];
    }

    private function fileRules(): array
    {
        $rules = ['bail', 'required', 'file', 'max:20480'];

        switch ($this->input('file_type')) {
            case 'image':
                $rules[] = 'image';
                $rules[] = 'mimes:jpg,jpeg,png,webp,gif,svg';
                break;
            case 'video':
                $rules[] = 'mimes:mp4,mov,webm,mkv,avi';
                break;
            case 'pdf':
                $rules[] = 'mimes:pdf';
                break;
            case 'document':
                $rules[] = 'mimes:doc,docx,xls,xlsx,ppt,pptx,txt,csv,rtf,odt,ods,odp';
                break;
        }

        return $rules;
    }
}
