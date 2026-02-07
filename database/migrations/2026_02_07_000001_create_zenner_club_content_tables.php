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
        Schema::create('contents_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('contents_category')->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();

            $table->index('parent_id');
        });

        Schema::create('contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('contents_category')->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content')->nullable();
            $table->string('file')->nullable();
            $table->string('vlink', 500)->nullable();
            $table->string('status', 50)->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['category_id', 'status']);
            $table->index('created_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contents');
        Schema::dropIfExists('contents_category');
    }
};
