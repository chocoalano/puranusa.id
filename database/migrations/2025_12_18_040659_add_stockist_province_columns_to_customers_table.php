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
        Schema::table('customers', function (Blueprint $table) {
            // Add province columns for stockist (after stockist_kabupaten_name)
            $table->unsignedInteger('stockist_province_id')->nullable()->after('stockist_kabupaten_name');
            $table->string('stockist_province_name')->nullable()->after('stockist_province_id');

            // Add index for province filtering
            $table->index('stockist_province_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropIndex(['stockist_province_id']);
            $table->dropColumn(['stockist_province_id', 'stockist_province_name']);
        });
    }
};
