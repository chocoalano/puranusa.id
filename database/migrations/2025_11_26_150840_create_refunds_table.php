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
        Schema::create('refunds', function (Blueprint $table) {
            $table->bigInteger('id')->primary()->autoIncrement();
            $table->bigInteger('order_id')->index();
            $table->bigInteger('payment_id')->index();
            $table->string('status', 50)->default('pending');
            $table->decimal('amount', 15, 2);
            $table->text('reason')->nullable();
            $table->timestamps();

            $table->index(['order_id', 'status']);
            $table->foreign('order_id')->references('id')->on('orders')->onUpdate('no action')->onDelete('cascade');
            $table->foreign('payment_id')->references('id')->on('payments')->onUpdate('no action')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('refunds');
    }
};
