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
        Schema::create('products', function (Blueprint $table) {
            $table->bigInteger('id')->primary()->autoIncrement();
            $table->string('sku', 255)->unique();
            $table->string('slug', 255)->unique();
            $table->string('name', 255);
            $table->text('short_desc')->nullable();
            $table->longText('long_desc')->nullable();
            $table->string('brand', 255)->nullable();
            $table->integer('warranty_months')->default(0);
            $table->decimal('base_price', 15, 2);
            $table->string('currency', 10)->default('IDR');
            $table->integer('stock')->default(0);
            $table->integer('weight_gram')->default(0);
            $table->integer('length_mm')->nullable();
            $table->integer('width_mm')->nullable();
            $table->integer('height_mm')->nullable();
            $table->decimal('bv', 15, 2)->default(0);
            $table->decimal('b_sponsor', 15, 2)->default(0);
            $table->decimal('b_matching', 15, 2)->default(0);
            $table->decimal('b_pairing', 15, 2)->default(0);
            $table->decimal('b_cashback', 15, 2)->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'created_at']);
            $table->fullText(['name', 'short_desc']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
