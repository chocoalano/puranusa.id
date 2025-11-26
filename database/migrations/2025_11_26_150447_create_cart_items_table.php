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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->integer('id')->primary()->autoIncrement();
            $table->integer('cart_id')->index();
            $table->bigInteger('product_id')->index();
            $table->integer('qty');
            $table->decimal('unit_price', 15, 2);
            $table->string('currency', 10)->default('IDR');
            $table->string('product_sku', 255)->nullable();
            $table->string('product_name', 255);
            $table->decimal('row_total', 15, 2);
            $table->json('meta_json')->nullable();
            $table->timestamps();

            $table->foreign('cart_id')->references('id')->on('carts')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
