<?php

namespace App\Http\Controllers\Ecommerce\Auth;

use App\Http\Controllers\Controller;
use App\Models\Manage\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
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

        // Check if user exists and is active
        $customer = Customer::where('email', $credentials['email'])->first();

        if (! $customer) {
            throw ValidationException::withMessages([
                'email' => 'Email tidak terdaftar.',
            ]);
        }

        // Attempt to authenticate
        if (Auth::guard('client')->attempt($credentials, $request->boolean('remember'))) {
            // Regenerate session to prevent session fixation
            $request->session()->regenerate();

            // Log successful login
            \Log::info('Customer logged in', [
                'customer_id' => $customer->id,
                'email' => $customer->email,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            // Get the intended URL or default to beranda
            $intendedUrl = redirect()->intended(route('ecommerce.beranda'))->getTargetUrl();

            return redirect($intendedUrl)
                ->with('success', 'Selamat datang kembali, '.$customer->name.'!');
        }

        // Authentication failed - log the attempt
        \Log::warning('Failed login attempt', [
            'email' => $credentials['email'],
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

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
    public function register(Request $request): RedirectResponse
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
            $sponsor = null;
            $sponsorId = null;

            if (! empty($validated['ref_code'])) {
                $sponsor = Customer::where('ref_code', $validated['ref_code'])->first();

                if (! $sponsor) {
                    throw ValidationException::withMessages([
                        'ref_code' => 'Kode referral tidak valid.',
                    ]);
                }

                $sponsorId = $sponsor->id;
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

            // Log successful registration
            \Log::info('New customer registered', [
                'customer_id' => $customer->id,
                'email' => $customer->email,
                'has_sponsor' => $sponsorId !== null,
                'sponsor_id' => $sponsorId,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            DB::commit();

            // Login the customer
            Auth::guard('client')->login($customer);

            // Regenerate session
            $request->session()->regenerate();

            return redirect()->intended(route('ecommerce.beranda'))
                ->with('success', 'Selamat datang, '.$customer->name.'! Akun Anda berhasil dibuat.');

        } catch (ValidationException $e) {
            DB::rollBack();
            throw $e;
        } catch (\Exception $e) {
            DB::rollBack();

            // Log the error
            \Log::error('Registration failed', [
                'email' => $validated['email'] ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw ValidationException::withMessages([
                'email' => 'Terjadi kesalahan saat membuat akun. Silakan coba lagi.',
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
