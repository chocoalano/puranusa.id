<?php

namespace App\Http\Requests\Manage;

use App\Models\Manage\Customer;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $name
 * @property string $username
 * @property string $nik
 * @property string $gender
 * @property string $alamat
 * @property string $address
 * @property int $province_id
 * @property int $city_id
 * @property string $email
 * @property string $phone
 * @property string $password
 * @property string $password_confirmation
 * @property string $description
 * @property string $bank_name
 * @property string $bank_account
 * @property array<string, mixed> $npwp
 * @property int|null $sponsor_id
 * @property int $status
 * @property float|null $registration_amount
 * @property string|null $level
 * @property int|null $package_id
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
            'username' => ['required', 'string', 'max:255', 'unique:customers,username', 'alpha_dash'],
            'nik' => ['required', 'string', 'max:32', 'regex:/^\d{8,32}$/'],
            'gender' => ['nullable', 'string', 'in:L,P,male,female,laki-laki,perempuan'],
            'email' => ['required', 'email', 'max:255', function (string $attribute, mixed $value, \Closure $fail) {
                $count = Customer::where('email', $value)->count();
                if ($count >= 7) {
                    $fail("Email ini sudah digunakan oleh {$count} akun. Maksimal 7 akun per email.");
                }
            }],
            'phone' => ['required', 'string', 'max:20'],
            'description' => ['nullable', 'string', 'max:1000'],
            'address' => ['nullable', 'string', 'max:1000'],
            'alamat' => ['nullable', 'string', 'max:1000'],
            'province_id' => ['nullable', 'integer'],
            'city_id' => ['nullable', 'integer'],
            'bank_name' => ['nullable', 'string', 'max:100'],
            'bank_account' => ['nullable', 'string', 'max:50'],
            'npwp' => ['nullable', 'array'],
            'npwp.nama' => ['nullable', 'string', 'max:50'],
            'npwp.npwp' => ['nullable', 'string', 'max:50', 'regex:/^\d{15,16}$/'],
            'npwp.jk' => ['nullable', 'integer', 'in:1,2'],
            'npwp.npwp_date' => ['nullable', 'date'],
            'npwp.alamat' => ['nullable', 'string', 'max:255'],
            'npwp.menikah' => ['nullable', 'string', 'in:Y,N'],
            'npwp.anak' => ['nullable', 'string', 'in:0,1,2,3'],
            'npwp.kerja' => ['nullable', 'string', 'in:Y,N'],
            'npwp.office' => ['nullable', 'string', 'max:50'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'sponsor_id' => ['nullable', 'exists:customers,id'],
            'status' => ['nullable', 'integer', 'in:1,2,3'],
            'registration_amount' => ['nullable', 'numeric', 'min:0'],
            'level' => ['nullable', 'string', 'in:Associate,Senior Associate,Executive,Director'],
            'package_id' => ['nullable', 'integer', 'in:1,2,3'],
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
        $npwpInput = $this->input('npwp');
        if (! is_array($npwpInput)) {
            $npwpInput = [];
        }

        $this->merge([
            'name' => is_string($this->input('name')) ? trim((string) $this->input('name')) : $this->input('name'),
            'username' => is_string($this->input('username')) ? trim((string) $this->input('username')) : $this->input('username'),
            'email' => is_string($this->input('email')) ? trim((string) $this->input('email')) : $this->input('email'),
            'phone' => is_string($this->input('phone')) ? trim((string) $this->input('phone')) : $this->input('phone'),
            'description' => is_string($this->input('description')) ? trim((string) $this->input('description')) : $this->input('description'),
            'address' => is_string($this->input('address')) ? trim((string) $this->input('address')) : $this->input('address'),
            'alamat' => is_string($this->input('alamat')) ? trim((string) $this->input('alamat')) : $this->input('alamat'),
            'gender' => $mappedGender,
            'nik' => is_string($nik) && $nik !== '' ? preg_replace('/\D+/', '', $nik) : $nik,
            'bank_name' => is_string($this->input('bank_name')) ? trim((string) $this->input('bank_name')) : $this->input('bank_name'),
            'bank_account' => is_string($this->input('bank_account')) ? trim((string) $this->input('bank_account')) : $this->input('bank_account'),
            'npwp' => [
                'nama' => is_string($npwpInput['nama'] ?? null) ? trim((string) $npwpInput['nama']) : ($npwpInput['nama'] ?? null),
                'npwp' => is_string($npwpInput['npwp'] ?? null) ? preg_replace('/\D+/', '', (string) $npwpInput['npwp']) : ($npwpInput['npwp'] ?? null),
                'jk' => $this->normalizeNpwpGender($npwpInput['jk'] ?? null),
                'npwp_date' => is_string($npwpInput['npwp_date'] ?? null) ? trim((string) $npwpInput['npwp_date']) : ($npwpInput['npwp_date'] ?? null),
                'alamat' => is_string($npwpInput['alamat'] ?? null) ? trim((string) $npwpInput['alamat']) : ($npwpInput['alamat'] ?? null),
                'menikah' => $this->normalizeMarriageStatus($npwpInput['menikah'] ?? null),
                'anak' => $this->normalizeChildrenCount($npwpInput['anak'] ?? null),
                'kerja' => $this->normalizeWorkStatus($npwpInput['kerja'] ?? null),
                'office' => is_string($npwpInput['office'] ?? null) ? trim((string) $npwpInput['office']) : ($npwpInput['office'] ?? null),
            ],
        ]);
    }

    private function normalizeNpwpGender(mixed $value): int|null
    {
        if ($value === null || $value === '') {
            return null;
        }

        $normalized = strtolower(trim((string) $value));

        return match ($normalized) {
            '1', 'l', 'male', 'laki-laki' => 1,
            '2', 'p', 'female', 'perempuan' => 2,
            default => null,
        };
    }

    private function normalizeMarriageStatus(mixed $value): string
    {
        $normalized = strtolower(trim((string) $value));

        if (in_array($normalized, ['1', 'y', 'yes', 'true', 'menikah'], true)) {
            return 'Y';
        }

        if (in_array($normalized, ['0', 'n', 'no', 'false', 'single', 'belum'], true)) {
            return 'N';
        }

        return '';
    }

    private function normalizeChildrenCount(mixed $value): string
    {
        $parsed = is_numeric($value) ? (int) $value : (int) preg_replace('/\D+/', '', (string) $value);
        $parsed = max(0, min($parsed, 3));

        return (string) $parsed;
    }

    private function normalizeWorkStatus(mixed $value): string
    {
        $normalized = strtolower(trim((string) $value));

        if ($normalized === '') {
            return '';
        }

        if (in_array($normalized, ['n', 'no', '0', 'false', 'tidak', 'tidak bekerja', 'belum bekerja', 'pengangguran'], true)) {
            return 'N';
        }

        return 'Y';
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi.',
            'name.max' => 'Nama maksimal 255 karakter.',
            'username.required' => 'Username wajib diisi.',
            'username.max' => 'Username maksimal 255 karakter.',
            'username.unique' => 'Username sudah digunakan.',
            'username.alpha_dash' => 'Username hanya boleh berisi huruf, angka, dash dan underscore.',
            'nik.required' => 'NIK wajib diisi.',
            'nik.max' => 'NIK maksimal 32 karakter.',
            'nik.regex' => 'NIK harus berupa 8-32 digit angka.',
            'gender.required' => 'Jenis kelamin wajib dipilih.',
            'gender.in' => 'Jenis kelamin tidak valid.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email maksimal 255 karakter.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'phone.max' => 'Nomor telepon maksimal 20 karakter.',
            'description.required' => 'Deskripsi wajib diisi.',
            'description.max' => 'Deskripsi maksimal 1000 karakter.',
            'address.required' => 'Address wajib diisi.',
            'address.max' => 'Address maksimal 1000 karakter.',
            'alamat.required' => 'Alamat wajib diisi.',
            'alamat.max' => 'Alamat maksimal 1000 karakter.',
            'province_id.required' => 'Provinsi wajib dipilih.',
            'province_id.integer' => 'Provinsi tidak valid.',
            'city_id.required' => 'Kota/Kabupaten wajib dipilih.',
            'city_id.integer' => 'Kota/Kabupaten tidak valid.',
            'bank_name.required' => 'Nama bank wajib diisi.',
            'bank_name.max' => 'Nama bank maksimal 100 karakter.',
            'bank_account.required' => 'Nomor rekening wajib diisi.',
            'bank_account.max' => 'Nomor rekening maksimal 50 karakter.',
            'npwp.required' => 'Data NPWP wajib diisi.',
            'npwp.array' => 'Format data NPWP tidak valid.',
            'npwp.nama.required' => 'Nama NPWP wajib diisi.',
            'npwp.nama.max' => 'Nama NPWP maksimal 50 karakter.',
            'npwp.npwp.required' => 'Nomor NPWP wajib diisi.',
            'npwp.npwp.regex' => 'Nomor NPWP harus terdiri dari 15 atau 16 digit angka.',
            'npwp.npwp.max' => 'Nomor NPWP maksimal 50 karakter.',
            'npwp.jk.required' => 'Jenis kelamin NPWP wajib diisi.',
            'npwp.jk.in' => 'Jenis kelamin NPWP tidak valid.',
            'npwp.npwp_date.required' => 'Tanggal NPWP wajib diisi.',
            'npwp.npwp_date.date' => 'Tanggal NPWP tidak valid.',
            'npwp.alamat.required' => 'Alamat NPWP wajib diisi.',
            'npwp.alamat.max' => 'Alamat NPWP maksimal 255 karakter.',
            'npwp.menikah.required' => 'Status menikah NPWP wajib diisi.',
            'npwp.menikah.in' => 'Status menikah NPWP tidak valid.',
            'npwp.anak.required' => 'Jumlah anak wajib diisi.',
            'npwp.anak.in' => 'Jumlah anak NPWP harus antara 0 sampai 3.',
            'npwp.kerja.required' => 'Status kerja wajib diisi.',
            'npwp.kerja.in' => 'Status kerja NPWP tidak valid.',
            'npwp.office.required' => 'Nama perusahaan wajib diisi.',
            'npwp.office.max' => 'Nama perusahaan maksimal 50 karakter.',
            'password.required' => 'Password wajib diisi.',
            'password.min' => 'Password minimal 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',
            'sponsor_id.exists' => 'Sponsor tidak ditemukan.',
            'status.required' => 'Status wajib dipilih.',
            'status.in' => 'Status tidak valid.',
            'registration_amount.numeric' => 'Nominal registrasi harus berupa angka.',
            'registration_amount.min' => 'Nominal registrasi minimal 0.',
            'level.in' => 'Peringkat tidak valid. Pilih: Associate, Senior Associate, Executive, atau Director.',
            'package_id.integer' => 'Paket harus berupa angka.',
            'package_id.in' => 'Paket tidak valid.',
        ];
    }
}
