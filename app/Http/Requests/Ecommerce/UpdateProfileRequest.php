<?php

namespace App\Http\Requests\Ecommerce;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
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
        $customer = auth('client')->user();

        return [
            'username' => ['required', 'string', 'max:100', Rule::unique('customers')->ignore($customer->id)],
            'name' => ['required', 'string', 'max:255'],
            'nik' => ['nullable', 'string', 'max:32', 'regex:/^\d{8,32}$/'],
            'gender' => ['nullable', 'string', 'in:L,P,male,female,laki-laki,perempuan'],
            'alamat' => ['nullable', 'string', 'max:1000'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'bank_name' => ['nullable', 'string', 'max:100'],
            'bank_account' => ['nullable', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'username.required' => 'Username wajib diisi.',
            'username.max' => 'Username maksimal 100 karakter.',
            'username.unique' => 'Username sudah digunakan oleh akun lain.',
            'name.required' => 'Nama wajib diisi.',
            'name.max' => 'Nama maksimal 255 karakter.',
            'nik.max' => 'NIK maksimal 32 karakter.',
            'nik.regex' => 'NIK harus berupa 8-32 digit angka.',
            'gender.in' => 'Jenis kelamin tidak valid.',
            'alamat.max' => 'Alamat maksimal 1000 karakter.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'phone.max' => 'Nomor telepon maksimal 20 karakter.',
            'bank_name.max' => 'Nama bank maksimal 100 karakter.',
            'bank_account.max' => 'Nomor rekening maksimal 50 karakter.',
            'description.max' => 'Deskripsi maksimal 1000 karakter.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $gender = $this->input('gender');
        $genderValue = is_string($gender) ? strtolower(trim($gender)) : '';

        $mappedGender = match ($genderValue) {
            'laki-laki', 'male', 'l' => 'L',
            'perempuan', 'female', 'p' => 'P',
            default => $gender,
        };

        $nik = $this->input('nik');
        $this->merge([
            'gender' => $mappedGender,
            'nik' => is_string($nik) && $nik !== '' ? preg_replace('/\D+/', '', $nik) : null,
            'bank_name' => $this->input('bank_name') ? trim((string) $this->input('bank_name')) : null,
            'bank_account' => $this->input('bank_account') ? trim((string) $this->input('bank_account')) : null,
        ]);
    }
}
