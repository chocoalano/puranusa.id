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
        Schema::create('wishlist_items', function (Blueprint $table) {
            $table->bigInteger('id')->primary()->autoIncrement();
            $table->bigInteger('wishlist_id')->index();
            $table->bigInteger('product_id')->index();
            $table->string('product_name', 255);
            $table->string('product_sku', 255)->nullable();
            $table->json('meta_json')->nullable();
            $table->timestamps();

            $table->unique(['wishlist_id', 'product_id']);
            $table->foreign('wishlist_id')->references('id')->on('wishlists')->onUpdate('no action')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onUpdate('no action')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wishlist_items');
    }
};
