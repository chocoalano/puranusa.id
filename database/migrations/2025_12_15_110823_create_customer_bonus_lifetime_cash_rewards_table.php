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
        Schema::create('customer_bonus_lifetime_cash_rewards', function (Blueprint $table) {
            $table->integer('id')->primary()->autoIncrement();
            $table->unsignedInteger('member_id')->index();
            $table->string('reward_name', 255);
            $table->string('reward', 255);
            $table->decimal('amount', 15, 2)->default(0);
            $table->decimal('bv', 15, 2)->default(0);
            $table->tinyInteger('status')->default(0)->comment('0=Pending, 1=Claimed, 2=Expired');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreign('member_id')->references('id')->on('customers')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_bonus_lifetime_cash_rewards');
    }
};
