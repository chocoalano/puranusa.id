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
        Schema::create('return_items', function (Blueprint $table) {
            $table->bigInteger('id')->primary()->autoIncrement();
            $table->bigInteger('return_id')->index();
            $table->bigInteger('order_item_id')->index();
            $table->integer('qty');
            $table->text('condition_note')->nullable();
            $table->timestamps();

            $table->foreign('return_id')->references('id')->on('returns')->onUpdate('no action')->onDelete('cascade');
            $table->foreign('order_item_id')->references('id')->on('order_items')->onUpdate('no action')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('return_items');
    }
};
