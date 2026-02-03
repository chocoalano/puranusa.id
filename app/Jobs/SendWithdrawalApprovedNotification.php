<?php

namespace App\Jobs;

use App\Services\QontakService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendWithdrawalApprovedNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public int $backoff = 30;

    public function __construct(
        public string $customerName,
        public string $phoneNumber,
        public string $amount,
    ) {}

    public function handle(QontakService $qontakService): void
    {
        $qontakService->sendWithdrawalApproved(
            $this->customerName,
            $this->phoneNumber,
            $this->amount,
        );
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('SendWithdrawalApprovedNotification failed', [
            'customer' => $this->customerName,
            'phone' => $this->phoneNumber,
            'error' => $exception->getMessage(),
        ]);
    }
}
