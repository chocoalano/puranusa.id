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
        Schema::create('customer_package', function (Blueprint $table) {
            $table->integer('id')->primary()->autoIncrement();
            $table->string('name', 255);
            $table->string('alias', 255);
            $table->decimal('price', 10, 2);
            $table->integer('pv');
            $table->integer('pr');
            $table->decimal('sponsor', 10, 2);
            $table->decimal('pairing', 10, 2);
            $table->decimal('matching', 10, 2);
            $table->decimal('flush_out', 10, 2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_package');
    }
};
