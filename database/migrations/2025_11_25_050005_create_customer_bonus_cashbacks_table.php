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
        Schema::create('customer_bonus_cashbacks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('member_id');
            $table->unsignedBigInteger('order_id')->nullable();
            $table->decimal('amount', 15, 2)->default(0);
            $table->decimal('index_value', 15, 2)->nullable();
            $table->tinyInteger('status')->default(0)->comment('0=pending, 1=released');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreign('member_id')
                ->references('id')
                ->on('customers')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_bonus_cashbacks');
    }
};
