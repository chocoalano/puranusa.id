<?php

namespace App\Jobs;

use App\Services\QontakService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendWhatsAppBroadcastTestJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public int $backoff = 30;

    public function __construct(
        public string $toName,
        public string $toNumber,
        public string $templateId,
        public string $message,
    ) {}

    public function handle(QontakService $qontakService): void
    {
        $headerImageUrl = $this->resolveHeaderImageUrl($this->templateId);
        $bodyParams = $this->resolveTemplateBodyParams(
            $this->templateId,
            $this->message,
            $this->toName
        );

        $result = $qontakService->sendWhatsAppWithResultFromParams(
            $this->toName,
            $this->toNumber,
            $this->templateId,
            $bodyParams,
            'id',
            $headerImageUrl
        );

        if (! ($result['success'] ?? false)) {
            Log::warning('SendWhatsAppBroadcastTestJob failed', [
                'to' => $this->toNumber,
                'template_id' => $this->templateId,
                'error' => $result['error'] ?? null,
                'status' => $result['status'] ?? null,
                'body' => $result['body'] ?? null,
            ]);

            return;
        }

        Log::info('SendWhatsAppBroadcastTestJob sent', [
            'to' => $this->toNumber,
            'template_id' => $this->templateId,
            'status' => $result['status'] ?? null,
            'body' => $result['body'] ?? null,
        ]);
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('SendWhatsAppBroadcastTestJob exception', [
            'to' => $this->toNumber,
            'template_id' => $this->templateId,
            'error' => $exception->getMessage(),
        ]);
    }

    protected function resolveHeaderImageUrl(string $templateId): ?string
    {
        $broadcastHeader = trim((string) config('services.qontak.broadcast_header_image_url'));
        if ($broadcastHeader !== '') {
            return $broadcastHeader;
        }

        $wdTemplateId = trim((string) config('services.qontak.wd_approved_template_id'));
        $wdHeader = trim((string) config('services.qontak.wd_approved_header_image_url'));

        if ($wdTemplateId !== '' && $templateId === $wdTemplateId && $wdHeader !== '') {
            return $wdHeader;
        }

        return null;
    }

    /**
     * @return array<int, string>
     */
    protected function resolveTemplateBodyParams(string $templateId, string $message, string $recipientName): array
    {
        $wdTemplateId = trim((string) config('services.qontak.wd_approved_template_id'));
        if ($wdTemplateId !== '' && $templateId === $wdTemplateId) {
            return [$recipientName, $message];
        }

        return [$message];
    }
}
