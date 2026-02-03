<?php

namespace App\Console\Commands;

use App\Jobs\SendWithdrawalApprovedNotification;
use Illuminate\Console\Command;

class TestSendWithdrawalWA extends Command
{
    protected $signature = 'test:send-withdrawal-wa
                            {phone=081212439564 : Nomor telepon tujuan}
                            {name=Test User : Nama customer}
                            {amount=100.000 : Jumlah withdrawal}';

    protected $description = 'Test kirim WA notifikasi withdrawal approved via queue';

    public function handle(): int
    {
        $phone = $this->argument('phone');
        $name = $this->argument('name');
        $amount = $this->argument('amount');

        $this->info("Dispatching SendWithdrawalApprovedNotification to queue...");
        $this->info("  Name  : {$name}");
        $this->info("  Phone : {$phone}");
        $this->info("  Amount: Rp {$amount}");

        SendWithdrawalApprovedNotification::dispatch($name, $phone, $amount);

        $this->info("Job dispatched! Run 'php artisan queue:work --once' to process.");

        return self::SUCCESS;
    }
}
