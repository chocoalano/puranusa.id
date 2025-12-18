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
            $table->boolean('is_stockist')->default(false)->after('status');
            $table->string('stockist_kabupaten_id', 10)->nullable()->after('is_stockist');
            $table->string('stockist_kabupaten_name')->nullable()->after('stockist_kabupaten_id');

            // Index for faster queries
            $table->index('is_stockist');
            $table->index('stockist_kabupaten_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropIndex(['is_stockist']);
            $table->dropIndex(['stockist_kabupaten_id']);
            $table->dropColumn(['is_stockist', 'stockist_kabupaten_id', 'stockist_kabupaten_name']);
        });
    }
};
