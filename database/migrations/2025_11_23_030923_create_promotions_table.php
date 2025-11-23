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
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('type');
            $table->string('landing_slug')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->timestamp('start_at');
            $table->timestamp('end_at');
            $table->boolean('is_active')->default(true);
            $table->integer('priority')->default(0);
            $table->integer('max_redemption')->nullable();
            $table->integer('per_user_limit')->nullable();
            $table->json('conditions_json')->nullable();
            $table->string('show_on')->nullable();
            $table->text('custom_html')->nullable();
            $table->string('page')->nullable();
            $table->timestamps();

            $table->index(['is_active', 'start_at', 'end_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
