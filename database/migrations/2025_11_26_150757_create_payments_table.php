<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->bigInteger('id')->primary()->autoIncrement();
            $table->bigInteger('order_id')->index();
            $table->bigInteger('method_id')->index();
            $table->string('status', 50)->default('pending');
            $table->decimal('amount', 15, 2);
            $table->string('currency', 10)->default('IDR');
            $table->string('provider_txn_id', 255)->nullable();
            $table->json('metadata_json')->nullable();
            $table->timestamps();

            $table->index(['order_id', 'status']);
            $table->foreign('order_id')->references('id')->on('orders')->onUpdate('no action')->onDelete('cascade');
            $table->foreign('method_id')->references('id')->on('payment_methods')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
