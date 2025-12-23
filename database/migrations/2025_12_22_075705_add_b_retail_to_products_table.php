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
        if (Schema::hasColumn('products', 'b_retail')) {
            return;
        }

        Schema::table('products', function (Blueprint $table) {
            $table->decimal('b_retail', 15, 2)->nullable()->after('b_cashback')->comment('Bonus retail');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('b_retail');
        });
    }
};
