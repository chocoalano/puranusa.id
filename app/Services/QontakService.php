<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class QontakService
{
    protected string $baseUrl = 'https://service-chat.qontak.com/api/open/v1';
    protected string $token;
    protected string $channelIntegrationId;

    public function __construct()
    {
        $this->token = config('services.qontak.api_token');
        $this->channelIntegrationId = config('services.qontak.channel_integration_id');
    }

    public function sendWhatsApp(string $toName, string $toNumber, string $templateId, array $bodyParams = [], string $languageCode = 'id'): bool
    {
        $parameters = ['body' => []];

        foreach ($bodyParams as $index => $value) {
            $parameters['body'][] = [
                'key' => (string) ($index + 1),
                'value_text' => (string) $value,
                'value' => (string) ($index + 1),
            ];
        }

        $payload = [
            'to_name' => $toName,
            'to_number' => $toNumber,
            'message_template_id' => $templateId,
            'channel_integration_id' => $this->channelIntegrationId,
            'language' => [
                'code' => $languageCode,
            ],
            'parameters' => $parameters,
        ];

        try {
            $response = Http::withToken($this->token)
                ->post("{$this->baseUrl}/broadcasts/whatsapp/direct", $payload);

            if ($response->successful()) {
                Log::info('Qontak WhatsApp sent', [
                    'to' => $toNumber,
                    'template' => $templateId,
                ]);
                return true;
            }

            Log::warning('Qontak WhatsApp failed', [
                'to' => $toNumber,
                'status' => $response->status(),
                'body' => $response->json(),
            ]);
            return false;
        } catch (\Throwable $e) {
            Log::error('Qontak WhatsApp error', [
                'to' => $toNumber,
                'error' => $e->getMessage(),
            ]);
            return false;
        }
    }

    public function sendWithdrawalApproved(string $customerName, string $phoneNumber, string $amount): bool
    {
        $templateId = config('services.qontak.wd_approved_template_id');

        if (! $templateId || ! $this->token || ! $this->channelIntegrationId) {
            Log::warning('Qontak config incomplete, skipping WhatsApp notification');
            return false;
        }

        // Format nomor: pastikan pakai 62
        $phoneNumber = $this->formatPhoneNumber($phoneNumber);

        return $this->sendWhatsApp(
            $customerName,
            $phoneNumber,
            $templateId,
            [$customerName, $amount]
        );
    }

    protected function formatPhoneNumber(string $phone): string
    {
        $phone = preg_replace('/[^0-9]/', '', $phone);

        if (str_starts_with($phone, '0')) {
            $phone = '62' . substr($phone, 1);
        }

        if (! str_starts_with($phone, '62')) {
            $phone = '62' . $phone;
        }

        return $phone;
    }
}
