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
            $table->bigInteger('id')->primary()->autoIncrement();
            $table->string('code', 255)->unique();
            $table->string('name', 255);
            $table->string('type', 50);
            $table->string('landing_slug', 255)->nullable();
            $table->text('description')->nullable();
            $table->string('image', 255)->nullable();
            $table->timestamp('start_at')->nullable();
            $table->timestamp('end_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('priority')->default(0);
            $table->integer('max_redemption')->nullable();
            $table->integer('per_user_limit')->nullable();
            $table->json('conditions_json')->nullable();
            $table->string('show_on', 50)->nullable();
            $table->text('custom_html')->nullable();
            $table->string('page', 255)->nullable();
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
