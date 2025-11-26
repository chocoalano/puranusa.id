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
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Attempt to authenticate
        if (Auth::guard('client')->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            // Get the intended URL or default to beranda
            $intendedUrl = redirect()->intended(route('ecommerce.beranda'))->getTargetUrl();

            return redirect($intendedUrl);
        }

        // Authentication failed
        throw ValidationException::withMessages([
            'email' => 'Email atau password salah.',
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
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:customers'],
            'phone' => ['required', 'string', 'max:20'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'ref_code' => ['nullable', 'string', 'exists:customers,ref_code'],
        ]);

        DB::beginTransaction();

        try {
            // Find sponsor if ref_code provided
            $sponsorId = null;
            if (! empty($validated['ref_code'])) {
                $sponsor = Customer::where('ref_code', $validated['ref_code'])->first();
                if ($sponsor) {
                    $sponsorId = $sponsor->id;
                }
            }

            // Create customer with sponsor_id and status = 1 (prospek)
            $customer = Customer::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'password' => Hash::make($validated['password']),
                'email_verified_at' => now(),
                'sponsor_id' => $sponsorId,
                'status' => 1, // 1 = prospek, 2 = pasif, 3 = aktif
            ]);

            DB::commit();

            Auth::guard('client')->login($customer);

            return redirect()->intended(route('ecommerce.beranda'));
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors([
                'error' => 'Terjadi kesalahan saat membuat akun: '.$e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Handle logout request
     */
    public function logout(Request $request)
    {
        // Logout from client guard
        Auth::guard('client')->logout();

        // Ensure web guard is also logged out to prevent data leakage
        Auth::guard('web')->logout();

        // Invalidate session and regenerate token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Clear any cached authentication data
        $request->session()->forget('auth');

        return redirect()->route('client.login');
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
