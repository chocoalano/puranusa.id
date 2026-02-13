<?php

namespace App\Jobs;

use App\Models\WhatsAppBroadcast;
use App\Services\QontakService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessWhatsAppBroadcastJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 1;

    public int $timeout = 1200;

    public function __construct(
        public int $broadcastId,
    ) {}

    public function handle(QontakService $qontakService): void
    {
        $broadcast = WhatsAppBroadcast::query()->find($this->broadcastId);
        if (! $broadcast) {
            Log::warning('ProcessWhatsAppBroadcastJob skipped: broadcast not found', [
                'broadcast_id' => $this->broadcastId,
            ]);

            return;
        }

        $templateId = trim((string) $broadcast->template_id);
        if ($templateId === '') {
            $broadcast->update([
                'status' => 'failed',
                'last_error' => 'Template ID WhatsApp belum diisi.',
                'sent_at' => now(),
            ]);

            return;
        }

        $textMessage = trim((string) $broadcast->message);
        if ($textMessage === '') {
            $broadcast->update([
                'status' => 'failed',
                'last_error' => 'Isi pesan broadcast tidak boleh kosong.',
                'sent_at' => now(),
            ]);

            return;
        }

        $headerImageUrl = $this->resolveHeaderImageUrl($templateId);
        $successCount = 0;
        $failedCount = 0;

        $broadcast->update([
            'status' => 'processing',
            'success_recipients' => 0,
            'failed_recipients' => 0,
            'last_error' => null,
            'sent_at' => null,
        ]);

        $broadcast->recipients()
            ->orderBy('id')
            ->chunkById(100, function ($recipients) use (
                &$successCount,
                &$failedCount,
                $qontakService,
                $templateId,
                $textMessage,
                $headerImageUrl
            ) {
                foreach ($recipients as $recipient) {
                    $recipientName = trim((string) ($recipient->customer_name ?: 'Pelanggan'));
                    $bodyParams = $this->resolveTemplateBodyParams(
                        $templateId,
                        $textMessage,
                        $recipientName
                    );

                    $result = $qontakService->sendWhatsAppWithResultFromParams(
                        $recipientName,
                        $recipient->normalized_phone,
                        $templateId,
                        $bodyParams,
                        'id',
                        $headerImageUrl
                    );

                    $isSent = (bool) ($result['success'] ?? false);
                    $reason = trim((string) ($result['error'] ?? ''));

                    $recipient->update([
                        'status' => $isSent ? 'sent' : 'failed',
                        'response_message' => $isSent
                            ? 'Terkirim ke Qontak'
                            : ($reason !== '' ? "Gagal dikirim dari Qontak: {$reason}" : 'Gagal dikirim dari Qontak'),
                        'sent_at' => now(),
                    ]);

                    if ($isSent) {
                        $successCount++;
                    } else {
                        $failedCount++;
                    }
                }
            });

        $finalStatus = 'sent';
        if ($failedCount > 0 && $successCount > 0) {
            $finalStatus = 'partial';
        } elseif ($failedCount > 0) {
            $finalStatus = 'failed';
        }

        $broadcast->update([
            'status' => $finalStatus,
            'success_recipients' => $successCount,
            'failed_recipients' => $failedCount,
            'sent_at' => now(),
            'last_error' => $failedCount > 0 ? 'Sebagian nomor gagal menerima pesan.' : null,
        ]);

        Log::info('ProcessWhatsAppBroadcastJob completed', [
            'broadcast_id' => $broadcast->id,
            'status' => $finalStatus,
            'success_recipients' => $successCount,
            'failed_recipients' => $failedCount,
        ]);
    }

    public function failed(\Throwable $exception): void
    {
        WhatsAppBroadcast::query()
            ->whereKey($this->broadcastId)
            ->update([
                'status' => 'failed',
                'last_error' => $exception->getMessage(),
                'sent_at' => now(),
            ]);

        Log::error('ProcessWhatsAppBroadcastJob failed', [
            'broadcast_id' => $this->broadcastId,
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
