<?php

namespace App\Http\Requests\Manage;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $name
 * @property string $email
 * @property string|null $phone
 * @property string $password
 * @property string $password_confirmation
 * @property int|null $sponsor_id
 * @property int $status
 * @property float|null $registration_amount
 * @property string|null $description
 */
class StoreCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:customers,email'],
            'phone' => ['nullable', 'string', 'max:20'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'sponsor_id' => ['nullable', 'exists:customers,id'],
            'status' => ['required', 'integer', 'in:1,2,3'],
            'registration_amount' => ['nullable', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi',
            'name.max' => 'Nama maksimal 255 karakter',
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'phone.max' => 'Nomor telepon maksimal 20 karakter',
            'password.required' => 'Password wajib diisi',
            'password.min' => 'Password minimal 8 karakter',
            'password.confirmed' => 'Konfirmasi password tidak cocok',
            'sponsor_id.exists' => 'Sponsor tidak ditemukan',
            'status.required' => 'Status wajib dipilih',
            'status.in' => 'Status tidak valid',
            'registration_amount.numeric' => 'Nominal registrasi harus berupa angka',
            'registration_amount.min' => 'Nominal registrasi minimal 0',
        ];
    }
}
