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
        Schema::create('customer_networks', function (Blueprint $table) {
            $table->integer('id')->primary()->autoIncrement();
            $table->integer('member_id')->index();
            $table->integer('upline_id')->index();
            $table->enum('position', ['left', 'right']);
            $table->tinyInteger('status')->default(0);
            $table->tinyInteger('level')->default(1);
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreign('member_id')->references('id')->on('customers')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('upline_id')->references('id')->on('customers')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_networks');
    }
};
