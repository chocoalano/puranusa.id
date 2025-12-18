<?php

namespace App\Http\Controllers\Ecommerce\Auth;

use App\Http\Controllers\Controller;
use App\Models\Manage\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class LogRegController extends Controller
{
    /**
     * Show login form
     */
    public function showLogin(): Response
    {
        return Inertia::render('ecommerce/auth/Login');
    }

    /**
     * Handle login request
     */
    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        // Check if user exists
        $customer = Customer::where('username', $credentials['username'])->first();

        if (! $customer) {
            throw ValidationException::withMessages([
                'username' => 'Username tidak terdaftar.',
            ]);
        }

        // Attempt to authenticate (pastikan provider guard 'client' pakai model Customer)
        if (Auth::guard('client')->attempt([
            'username' => $credentials['username'],
            'password' => $credentials['password'],
        ], $request->boolean('remember'))) {

            $request->session()->regenerate();

            \Log::info('Customer logged in', [
                'customer_id' => $customer->id,
                'username' => $customer->username,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            $intendedUrl = redirect()->intended(route('ecommerce.beranda'))->getTargetUrl();

            return redirect($intendedUrl)
                ->with('success', 'Selamat datang kembali, '.$customer->name.'!');
        }

        \Log::warning('Failed login attempt', [
            'username' => $credentials['username'],
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        throw ValidationException::withMessages([
            'username' => 'Username atau password salah.',
        ]);
    }

    /**
     * Show register form
     */
    public function showRegister(Request $request): Response
    {
        return Inertia::render('ecommerce/auth/Register', [
            'ref_code' => $request->query('ref'),
        ]);
    }

    /**
     * Handle register request
     */
    public function register(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],

            // username kolomnya varchar(100) + unique
            'username' => ['required', 'string', 'max:100', 'alpha_dash:ascii', Rule::unique('customers', 'username')],

            // email & phone TIDAK unique (sesuai perubahan kamu)
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],

            // kolom baru (nullable di DB)
            'nik' => ['nullable', 'string', 'max:32', 'regex:/^\d{8,32}$/'], // longgar tapi tetap angka
            'gender' => ['nullable', Rule::in(['male', 'female', 'L', 'P'])],
            'alamat' => ['nullable', 'string'],

            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'ref_code' => ['nullable', 'string', 'exists:customers,ref_code'],
        ], [
            // Custom validation messages in Indonesian
            'name.required' => 'Nama lengkap wajib diisi.',
            'name.max' => 'Nama lengkap maksimal 255 karakter.',

            'username.required' => 'Username wajib diisi.',
            'username.max' => 'Username maksimal 100 karakter.',
            'username.alpha_dash' => 'Username hanya boleh berisi huruf, angka, dash (-), dan underscore (_).',
            'username.unique' => 'Username sudah digunakan, silakan pilih username lain.',

            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email maksimal 255 karakter.',

            'phone.required' => 'Nomor telepon wajib diisi.',
            'phone.max' => 'Nomor telepon maksimal 20 karakter.',

            'nik.max' => 'NIK maksimal 32 karakter.',
            'nik.regex' => 'NIK harus berupa 8-32 digit angka.',

            'gender.in' => 'Jenis kelamin tidak valid.',

            'password.required' => 'Password wajib diisi.',
            'password.min' => 'Password minimal 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',

            'ref_code.exists' => 'Kode referral tidak ditemukan atau tidak valid.',
        ]);

        // Normalisasi sederhana
        $validated['username'] = Str::lower(trim($validated['username']));
        $validated['phone'] = trim($validated['phone']);
        if (! empty($validated['nik'])) {
            $validated['nik'] = preg_replace('/\D+/', '', $validated['nik']); // buang selain angka
        }

        try {
            $customer = DB::transaction(function () use ($validated) {
                $sponsorId = null;

                if (! empty($validated['ref_code'])) {
                    // Karena sudah divalidasi exists, ini harusnya ketemu
                    $sponsorId = Customer::where('ref_code', $validated['ref_code'])->value('id');
                }

                return Customer::create([
                    'name' => $validated['name'],
                    'username' => $validated['username'],

                    'email' => $validated['email'],
                    'phone' => $validated['phone'],

                    'nik' => $validated['nik'] ?? null,
                    'gender' => $validated['gender'] ?? null,
                    'alamat' => $validated['alamat'] ?? null,

                    'password' => Hash::make($validated['password']),

                    // kalau kamu memang ingin auto-verified:
                    'email_verified_at' => now(),

                    'sponsor_id' => $sponsorId,
                    'status' => 1, // 1=prospek
                ]);
            });

            \Log::info('New customer registered', [
                'customer_id' => $customer->id,
                'username' => $customer->username,
                'email' => $customer->email,
                'has_sponsor' => ! empty($customer->sponsor_id),
                'sponsor_id' => $customer->sponsor_id,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            Auth::guard('client')->login($customer);
            $request->session()->regenerate();

            return redirect()->intended(route('ecommerce.beranda'))
                ->with('success', 'Selamat datang, '.$customer->name.'! Akun Anda berhasil dibuat.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Throwable $e) {
            \Log::error('Registration failed', [
                'username' => $validated['username'] ?? null,
                'email' => $validated['email'] ?? null,
                'error' => $e->getMessage(),
            ]);

            throw ValidationException::withMessages([
                'username' => 'Terjadi kesalahan saat membuat akun. Silakan coba lagi.',
            ]);
        }
    }

    /**
     * Handle logout request
     */
    public function logout(Request $request): RedirectResponse
    {
        // Get the authenticated customer before logging out
        $customer = Auth::guard('client')->user();

        // Logout from client guard
        Auth::guard('client')->logout();

        // Ensure web guard is also logged out to prevent data leakage
        Auth::guard('web')->logout();

        // Invalidate session and regenerate token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Clear any cached authentication data
        $request->session()->forget('auth');
        $request->session()->flush();

        // Redirect to login with success message
        return redirect()->route('client.login')
            ->with('status', 'Anda telah berhasil logout.');
    }

    /**
     * Show forgot password form
     */
    public function showForgotPassword(): Response
    {
        return Inertia::render('ecommerce/auth/ForgotPassword');
    }

    /**
     * Handle forgot password request
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $status = Password::broker('customers')->sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return back()->with('status', 'Link reset password telah dikirim ke email Anda!');
        }

        throw ValidationException::withMessages([
            'email' => [__($status)],
        ]);
    }

    /**
     * Show reset password form
     */
    public function showResetPassword(Request $request, string $token): Response
    {
        return Inertia::render('ecommerce/auth/ResetPassword', [
            'token' => $token,
            'email' => $request->email,
        ]);
    }

    /**
     * Handle reset password request
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $status = Password::broker('customers')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($customer, $password) {
                $customer->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return redirect()->route('client.login')->with('status', 'Password berhasil direset! Silakan login.');
        }

        throw ValidationException::withMessages([
            'email' => [__($status)],
        ]);
    }
}
