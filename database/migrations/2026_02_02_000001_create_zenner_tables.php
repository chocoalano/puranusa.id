<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ============================================
        // ZENNER CLUB - WELCOME VIDEO
        // ============================================
        Schema::create('zenner_welcome_videos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('video_url');
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - JOIN MEDSOS
        // ============================================
        Schema::create('zenner_join_medsos', function (Blueprint $table) {
            $table->id();
            $table->string('platform');
            $table->string('url');
            $table->string('icon')->nullable();
            $table->text('description')->nullable();
            $table->integer('followers_count')->default(0);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - MARKETING KIT
        // ============================================
        Schema::create('zenner_marketing_kits', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('file_path');
            $table->string('file_type')->default('image');
            $table->string('thumbnail')->nullable();
            $table->string('category')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - COPYWRITING
        // ============================================
        Schema::create('zenner_copywritings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->string('category')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - GALLERY (FOTO & VIDEO)
        // ============================================
        Schema::create('zenner_galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('file_path');
            $table->string('file_type')->default('image');
            $table->string('thumbnail')->nullable();
            $table->string('category')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - PROCURE PRODUK & INSENTIF
        // ============================================
        Schema::create('zenner_procure_products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->decimal('price', 15, 2)->default(0);
            $table->integer('points')->default(0);
            $table->string('category')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - TESTIMONI PRODUK
        // ============================================
        Schema::create('zenner_testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->text('content');
            $table->string('image')->nullable();
            $table->unsignedTinyInteger('rating')->default(5);
            $table->string('product_name')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - ZENNER ACADEMY (COURSE)
        // ============================================
        Schema::create('zenner_courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('level')->default('beginner');
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - ZENNER ACADEMY (LESSON)
        // ============================================
        Schema::create('zenner_lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('zenner_courses')->cascadeOnDelete();
            $table->string('title');
            $table->text('content')->nullable();
            $table->string('video_url')->nullable();
            $table->integer('duration_minutes')->default(0);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - SKEMA INSENTIF (RULE)
        // ============================================
        Schema::create('zenner_incentive_rules', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('type')->default('bonus');
            $table->json('conditions')->nullable();
            $table->json('rewards')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - PRODUK KNOWLEDGE
        // ============================================
        Schema::create('zenner_product_knowledges', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->string('image')->nullable();
            $table->string('category')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - CARA JUALAN (ORGANIK)
        // ============================================
        Schema::create('zenner_selling_guides', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->string('image')->nullable();
            $table->string('category')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - CARA IKLAN (ADS)
        // ============================================
        Schema::create('zenner_ads_guides', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->string('image')->nullable();
            $table->string('platform')->nullable();
            $table->string('budget_range')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - WEBINAR & ONLINE TRAINING
        // ============================================
        Schema::create('zenner_webinars', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('speaker')->nullable();
            $table->dateTime('scheduled_at');
            $table->integer('duration_minutes')->default(60);
            $table->string('meeting_url')->nullable();
            $table->string('status')->default('upcoming');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - LEADERBOARD CONFIG
        // ============================================
        Schema::create('zenner_leaderboard_configs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('type')->default('sales');
            $table->string('period')->default('monthly');
            $table->string('calculation_field')->default('omzet');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - LEADERBOARD ENTRIES
        // ============================================
        Schema::create('zenner_leaderboard_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('config_id')->constrained('zenner_leaderboard_configs')->cascadeOnDelete();
            $table->unsignedBigInteger('customer_id');
            $table->string('customer_name');
            $table->decimal('score', 15, 2)->default(0);
            $table->integer('rank')->default(0);
            $table->string('period_label')->nullable();
            $table->timestamps();

            $table->index(['config_id', 'rank']);
        });

        // ============================================
        // ZENNER CLUB - SERTIFIKAT PROGRAM
        // ============================================
        Schema::create('zenner_certificates', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('template_image')->nullable();
            $table->string('type')->default('completion');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - MONTHLY CHALLENGE
        // ============================================
        Schema::create('zenner_monthly_challenges', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->text('reward')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // ============================================
        // ZENNER CLUB - TOP AFFILIATE
        // ============================================
        Schema::create('zenner_top_affiliates', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->string('customer_name');
            $table->string('period');
            $table->integer('rank')->default(0);
            $table->decimal('score', 15, 2)->default(0);
            $table->timestamps();

            $table->index(['period', 'rank']);
        });

        // ============================================
        // ZENNER CLUB - HALL OF FAME
        // ============================================
        Schema::create('zenner_hall_of_fames', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('achievement')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('zenner_hall_of_fames');
        Schema::dropIfExists('zenner_top_affiliates');
        Schema::dropIfExists('zenner_monthly_challenges');
        Schema::dropIfExists('zenner_certificates');
        Schema::dropIfExists('zenner_leaderboard_entries');
        Schema::dropIfExists('zenner_leaderboard_configs');
        Schema::dropIfExists('zenner_webinars');
        Schema::dropIfExists('zenner_ads_guides');
        Schema::dropIfExists('zenner_selling_guides');
        Schema::dropIfExists('zenner_product_knowledges');
        Schema::dropIfExists('zenner_incentive_rules');
        Schema::dropIfExists('zenner_lessons');
        Schema::dropIfExists('zenner_courses');
        Schema::dropIfExists('zenner_testimonials');
        Schema::dropIfExists('zenner_procure_products');
        Schema::dropIfExists('zenner_galleries');
        Schema::dropIfExists('zenner_copywritings');
        Schema::dropIfExists('zenner_marketing_kits');
        Schema::dropIfExists('zenner_join_medsos');
        Schema::dropIfExists('zenner_welcome_videos');
    }
};
