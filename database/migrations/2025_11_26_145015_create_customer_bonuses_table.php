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
        Schema::create('customer_bonuses', function (Blueprint $table) {
            $table->integer('id')->primary()->autoIncrement();
            $table->integer('member_id')->index();
            $table->decimal('amount', 15, 2)->default(0);
            $table->decimal('index_value', 15, 2)->default(0);
            $table->decimal('tax_netto', 15, 2)->default(0);
            $table->integer('tax_percent')->default(0);
            $table->decimal('tax_value', 15, 2)->default(0);
            $table->tinyInteger('status')->default(0);
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
        Schema::dropIfExists('customer_bonuses');
    }
};
