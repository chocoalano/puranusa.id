<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MidtransService
{
    protected string $serverKey;

    protected string $baseUrl;

    protected string $irisKey;

    protected string $irisBaseUrl;

    public function __construct()
    {
        $this->serverKey = config('services.midtrans.server_key');
        $this->irisKey = config('services.midtrans.iris_key') ?: $this->serverKey;
        $isProduction = config('services.midtrans.is_production', false);
        $this->baseUrl = $isProduction
            ? 'https://api.midtrans.com/v2'
            : 'https://api.sandbox.midtrans.com/v2';
        $this->irisBaseUrl = $isProduction
            ? 'https://app.midtrans.com/iris/api/v1'
            : 'https://app.sandbox.midtrans.com/iris/api/v1';
    }

    /**
     * Create payout/disbursement request
     * Note: Sandbox mode simulates payout as it doesn't support full disbursement API
     */
    public function createPayout(array $data): array
    {
        $isProduction = config('services.midtrans.is_production', false);

        // For sandbox/development, simulate successful payout
        if (! $isProduction) {
            $referenceNo = 'SIM-'.now()->format('YmdHis').'-'.strtoupper(Str::random(6));

            Log::info('Midtrans Payout (SIMULATED - Sandbox)', [
                'reference_no' => $referenceNo,
                'data' => $data,
                'note' => 'Sandbox does not support real disbursement. Using simulation.',
            ]);

            return [
                'success' => true,
                'data' => [
                    'reference_no' => $referenceNo,
                    'beneficiary_name' => $data['beneficiary_name'],
                    'beneficiary_account' => $data['beneficiary_account'],
                    'beneficiary_bank' => $data['beneficiary_bank'],
                    'amount' => $data['amount'],
                    'status' => 'completed',
                    'created_at' => now()->toIso8601String(),
                ],
                'reference_no' => $referenceNo,
                'status' => 'completed',
                'simulated' => true,
            ];
        }

        // Production: Use Midtrans IRIS API
        $endpoint = $this->irisBaseUrl.'/payouts';

        $referenceNo = 'WD-'.now()->format('YmdHis').'-'.strtoupper(Str::random(6));

        if (! $this->irisKey) {
            return [
                'success' => false,
                'message' => 'IRIS API key belum dikonfigurasi (MIDTRANS_IRIS_KEY).',
            ];
        }

        $payload = [
            'payouts' => [
                [
                    'beneficiary_name' => $data['beneficiary_name'],
                    'beneficiary_account' => $data['beneficiary_account'],
                    'beneficiary_bank' => $data['beneficiary_bank'],
                    'beneficiary_email' => $data['beneficiary_email'] ?? 'noreply@puranusa.id',
                    'amount' => (string) $data['amount'],
                    'notes' => $data['notes'] ?? 'Withdrawal',
                ],
            ],
        ];

        try {
            Log::info('Midtrans IRIS Payout Request', [
                'endpoint' => $endpoint,
                'payload' => $payload,
            ]);

            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Authorization' => 'Basic '.base64_encode($this->irisKey.':'),
            ])
                ->post($endpoint, $payload);
            $result = $response->json();

            Log::info('Midtrans IRIS Payout Response', [
                'status' => $response->status(),
                'response' => $result,
            ]);

            if ($response->successful() && isset($result['payouts'][0])) {
                return [
                    'success' => true,
                    'data' => $result['payouts'][0],
                    'reference_no' => $result['payouts'][0]['reference_no'] ?? $referenceNo,
                    'status' => $result['payouts'][0]['status'] ?? 'pending',
                ];
            }
            dd($response, $result);
            if ($response->status() === 401) {
                return [
                    'success' => false,
                    'message' => 'Unauthorized (401). Pastikan MIDTRANS_IRIS_KEY benar dan akun IRIS sudah aktif.',
                    'error' => $result,
                ];
            }

            return [
                'success' => false,
                'message' => $result['error_messages'][0] ?? 'Gagal membuat payout',
                'error' => $result,
            ];
        } catch (\Exception $e) {
            Log::error('Midtrans IRIS Payout Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return [
                'success' => false,
                'message' => 'Terjadi kesalahan: '.$e->getMessage(),
            ];
        }
    }

    /**
     * Get payout status
     */
    public function getPayoutStatus(string $referenceNo): array
    {
        $isProduction = config('services.midtrans.is_production', false);

        // For sandbox simulated transactions
        if (! $isProduction && str_starts_with($referenceNo, 'SIM-')) {
            return [
                'success' => true,
                'data' => [
                    'reference_no' => $referenceNo,
                    'status' => 'completed',
                ],
                'status' => 'completed',
                'simulated' => true,
            ];
        }

        // Production: Query IRIS API
        $endpoint = $this->irisBaseUrl.'/payouts/'.$referenceNo;

        try {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Authorization' => 'Basic '.base64_encode($this->irisKey.':'),
            ])
                ->get($endpoint);

            $result = $response->json();

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $result,
                    'status' => $result['status'] ?? 'unknown',
                ];
            }

            return [
                'success' => false,
                'message' => 'Status tidak ditemukan',
            ];
        } catch (\Exception $e) {
            Log::error('Midtrans Get Payout Status Error', [
                'reference_no' => $referenceNo,
                'message' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Get list of supported banks for payout
     */
    public function getSupportedBanks(): array
    {
        return [
            'bca' => 'BCA',
            'bni' => 'BNI',
            'bri' => 'BRI',
            'mandiri' => 'Mandiri',
            'cimb' => 'CIMB Niaga',
            'permata' => 'Permata',
            'bsm' => 'BSM',
            'muamalat' => 'Muamalat',
            'danamon' => 'Danamon',
            'mega' => 'Mega',
            'btn' => 'BTN',
            'panin' => 'Panin',
            'ocbc' => 'OCBC NISP',
            'uob' => 'UOB',
            'maybank' => 'Maybank',
            'hsbc' => 'HSBC',
            'other' => 'Bank Lainnya',
        ];
    }
}
