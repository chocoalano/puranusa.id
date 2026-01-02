<?php

namespace App\Http\Requests\Manage;

use App\Models\Manage\Customer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

/**
 * @property string $name
 * @property string $username
 * @property string $email
 * @property string|null $phone
 * @property string|null $password
 * @property string|null $password_confirmation
 * @property string|null $description
 * @property int|null $sponsor_id
 */
class UpdateCustomerRequest extends FormRequest
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
            'username' => ['required', 'string', 'max:255', 'alpha_dash', 'unique:customers,username,'.$this->customer->id],
            'email' => ['required', 'email', 'max:255', 'unique:customers,email,'.$this->customer->id],
            'phone' => ['nullable', 'string', 'max:20'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'description' => ['nullable', 'string'],
            'sponsor_id' => ['nullable', 'exists:customers,id'],
            'package_id' => ['nullable', 'integer', 'in:1,2,3'],
            'level' => ['nullable', 'string', 'in:Associate,Senior Associate,Executive,Director'],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            /** @var Customer $customer */
            $customer = $this->route('customer');

            // Re-fetch customer dari database untuk mendapatkan status terbaru
            $freshCustomer = Customer::find($customer->id);
            if (! $freshCustomer) {
                return;
            }

            // Load matrix position untuk mendapatkan sponsor_id saat ini
            $freshCustomer->load('matrixPosition');
            $currentSponsorId = $freshCustomer->matrixPosition?->sponsor_id;

            // Jika ada perubahan sponsor_id (berbeda dari nilai saat ini), validasi apakah customer masih Prospek
            if ($this->has('sponsor_id') && $this->sponsor_id != $currentSponsorId) {
                if ($freshCustomer->status !== 1) {
                    $validator->errors()->add(
                        'sponsor_id',
                        'Sponsor hanya dapat diubah untuk member dengan status Prospek. Member ini sudah berstatus aktif/pasif.'
                    );
                }
            }

            // Jika ada perubahan package_id (berbeda dari nilai saat ini), validasi apakah customer sudah Aktif
            if ($this->has('package_id') && $this->package_id != $freshCustomer->package_id) {
                if ($freshCustomer->status !== 3) {
                    $validator->errors()->add(
                        'package_id',
                        'Paket hanya dapat diubah untuk member dengan status Aktif. Member ini masih berstatus Prospek/Pasif.'
                    );
                }
            }

            // Jika ada perubahan level (berbeda dari nilai saat ini), validasi apakah customer sudah Aktif
            if ($this->has('level') && $this->level != $freshCustomer->level) {
                if ($freshCustomer->status !== 3) {
                    $validator->errors()->add(
                        'level',
                        'Peringkat hanya dapat diubah untuk member dengan status Aktif. Member ini masih berstatus Prospek/Pasif.'
                    );
                }
            }
        });
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi',
            'name.max' => 'Nama maksimal 255 karakter',
            'username.required' => 'Username wajib diisi',
            'username.max' => 'Username maksimal 255 karakter',
            'username.unique' => 'Username sudah digunakan',
            'username.alpha_dash' => 'Username hanya boleh berisi huruf, angka, dash dan underscore',
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'phone.max' => 'Nomor telepon maksimal 20 karakter',
            'password.min' => 'Password minimal 8 karakter',
            'password.confirmed' => 'Konfirmasi password tidak cocok',
            'sponsor_id.exists' => 'Sponsor tidak ditemukan',
            'package_id.integer' => 'Paket harus berupa angka',
            'package_id.in' => 'Paket tidak valid',
            'level.in' => 'Peringkat tidak valid. Pilih: Associate, Senior Associate, Executive, atau Director',
        ];
    }
}
