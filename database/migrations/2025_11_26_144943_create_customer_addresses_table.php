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
        Schema::create('customer_addresses', function (Blueprint $table) {
            $table->bigInteger('id')->primary()->autoIncrement();
            $table->bigInteger('customer_id')->index();
            $table->string('label', 255);
            $table->boolean('is_default')->default(false);
            $table->string('recipient_name', 255);
            $table->string('recipient_phone', 255);
            $table->text('address_line1');
            $table->text('address_line2')->nullable();
            $table->string('province_label', 255);
            $table->integer('province_id');
            $table->string('city_label', 255);
            $table->integer('city_id');
            $table->string('postal_code', 255);
            $table->string('country', 255)->default('Indonesia');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_addresses');
    }
};
