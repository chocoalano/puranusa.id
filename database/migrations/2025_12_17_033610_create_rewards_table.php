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
        if (Schema::hasTable('rewards')) {
            return;
        }

        Schema::create('rewards', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 10)->nullable();
            $table->string('name', 225);
            $table->string('reward', 225)->nullable();

            $table->decimal('value', 10, 2)->default(0.00);
            $table->date('start')->nullable();
            $table->date('end')->nullable();
            $table->decimal('bv', 10, 2)->default(0.00);

            $table->tinyInteger('type')->comment('0: periode, 1: permanen');
            $table->tinyInteger('status')->comment('0: inactive, 1: active');
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rewards');
    }
};
