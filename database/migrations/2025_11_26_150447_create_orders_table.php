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
        Schema::create('orders', function (Blueprint $table) {
            $table->bigInteger('id')->primary()->autoIncrement();
            $table->string('order_no', 255)->unique();
            $table->bigInteger('customer_id')->index();
            $table->string('currency', 10)->default('IDR');
            $table->string('status', 50)->default('PENDING');
            $table->decimal('subtotal_amount', 15, 2)->default(0);
            $table->decimal('discount_amount', 15, 2)->default(0);
            $table->decimal('shipping_amount', 15, 2)->default(0);
            $table->decimal('tax_amount', 15, 2)->default(0);
            $table->decimal('grand_total', 15, 2)->default(0);
            $table->bigInteger('shipping_address_id')->nullable()->index();
            $table->bigInteger('billing_address_id')->nullable()->index();
            $table->json('applied_promos')->nullable();
            $table->text('notes')->nullable();
            $table->decimal('bv_amount', 15, 2)->default(0);
            $table->decimal('sponsor_amount', 15, 2)->default(0);
            $table->decimal('match_amount', 15, 2)->default(0);
            $table->decimal('pairing_amount', 15, 2)->default(0);
            $table->decimal('cashback_amount', 15, 2)->default(0);
            $table->timestamp('placed_at')->nullable()->index();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index(['customer_id', 'status']);
            $table->foreign('shipping_address_id')->references('id')->on('customer_addresses')->onUpdate('no action')->onDelete('set null');
            $table->foreign('billing_address_id')->references('id')->on('customer_addresses')->onUpdate('no action')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
