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
            $table->id();
            $table->string('order_no')->unique();
            $table->foreignId('customer_id')->constrained()->onDelete('restrict');
            $table->string('currency', 3)->default('IDR');
            $table->string('status')->default('pending');
            $table->decimal('subtotal_amount', 15, 2);
            $table->decimal('discount_amount', 15, 2)->default(0);
            $table->decimal('shipping_amount', 15, 2)->default(0);
            $table->decimal('tax_amount', 15, 2)->default(0);
            $table->decimal('grand_total', 15, 2);
            $table->foreignId('shipping_address_id')->nullable()->constrained('customer_addresses')->onDelete('set null');
            $table->foreignId('billing_address_id')->nullable()->constrained('customer_addresses')->onDelete('set null');
            $table->json('applied_promos')->nullable();
            $table->text('notes')->nullable();
            $table->decimal('bv_amount', 15, 2)->nullable();
            $table->decimal('sponsor_amount', 15, 2)->nullable();
            $table->decimal('match_amount', 15, 2)->nullable();
            $table->decimal('pairing_amount', 15, 2)->nullable();
            $table->decimal('cashback_amount', 15, 2)->nullable();
            $table->timestamp('placed_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index(['customer_id', 'status']);
            $table->index('placed_at');
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
