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
        // ============================================
        // USERS & AUTH
        // ============================================

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->text('two_factor_secret')->nullable();
            $table->text('two_factor_recovery_codes')->nullable();
            $table->timestamp('two_factor_confirmed_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        // ============================================
        // CACHE & JOBS
        // ============================================

        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->mediumText('value');
            $table->integer('expiration');
        });

        Schema::create('cache_locks', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->string('owner');
            $table->integer('expiration');
        });

        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('queue')->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });

        Schema::create('job_batches', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->integer('total_jobs');
            $table->integer('pending_jobs');
            $table->integer('failed_jobs');
            $table->longText('failed_job_ids');
            $table->mediumText('options')->nullable();
            $table->integer('cancelled_at')->nullable();
            $table->integer('created_at');
            $table->integer('finished_at')->nullable();
        });

        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->text('connection');
            $table->text('queue');
            $table->longText('payload');
            $table->longText('exception');
            $table->timestamp('failed_at')->useCurrent();
        });

        // ============================================
        // CUSTOMER PACKAGE (must be before customers)
        // ============================================

        Schema::create('customer_package', function (Blueprint $table) {
            $table->unsignedInteger('id')->primary();
            $table->string('name');
            $table->string('alias', 100);
            $table->decimal('price', 10, 2);
            $table->integer('pv');
            $table->integer('pr');
            $table->decimal('sponsor', 12, 2);
            $table->decimal('pairing', 10, 2)->default(0);
            $table->decimal('matching', 10, 2)->default(0);
            $table->decimal('flush_out', 10, 2)->default(0);
        });

        // ============================================
        // CUSTOMERS
        // ============================================

        Schema::create('customers', function (Blueprint $table) {
            $table->increments('id')->comment('Primary key customer');
            $table->unsignedInteger('sponsor_id')->nullable()->comment('sponsor referral');
            $table->unsignedInteger('upline_id')->nullable()->comment('upline ketika sdh diplacement');
            $table->enum('position', ['left', 'right'])->nullable();
            $table->string('ref_code', 50)->nullable()->unique();
            $table->string('name')->comment('Nama lengkap customer');
            $table->string('email')->unique()->comment('Email unik untuk login dan komunikasi');
            $table->string('phone')->nullable()->comment('Nomor telepon / WhatsApp customer');
            $table->string('password')->comment('Password yang telah di-hash untuk autentikasi');
            $table->rememberToken()->comment('Token remember me untuk tetap login');
            $table->timestamp('email_verified_at')->nullable()->comment('Waktu ketika email customer terverifikasi');
            $table->string('ewallet_id')->nullable()->unique()->comment('ID unik dompet elektronik customer');
            $table->decimal('ewallet_saldo', 15, 2)->default(0)->comment('Saldo dompet elektronik customer');
            $table->text('description')->nullable()->comment('Catatan tambahan mengenai customer');
            $table->unsignedInteger('package_id')->nullable()->comment('paket sesuai total omset member');
            $table->unsignedInteger('foot_left')->nullable()->comment('kaki kiri level 1');
            $table->unsignedInteger('foot_right')->nullable()->comment('kaki kanan level 1');
            $table->unsignedInteger('total_left')->default(0)->comment('jumlah kaki kiri');
            $table->unsignedInteger('total_right')->default(0)->comment('jumlah kaki kanan');
            $table->unsignedInteger('sponsor_left')->default(0)->comment('jumlah member yg disponsorin kaki kiri');
            $table->unsignedInteger('sponsor_right')->default(0)->comment('jumlah member yg disponsorin kaki kanan');
            $table->unsignedInteger('pv_left')->default(0)->comment('jumlah pv untuk pairing dr kaki kiri');
            $table->unsignedInteger('pv_right')->default(0)->comment('jumlah pv untuk pairing dr kaki kanan');
            $table->decimal('omzet', 10, 2)->default(0);
            $table->decimal('omzet_group_left', 10, 2)->default(0)->comment('jumlah omset dr group binary kaki kiri');
            $table->decimal('omzet_group_right', 10, 2)->default(0)->comment('jumlah omset dr group binary kaki kanan');
            $table->tinyInteger('status')->default(1)->comment('Status Customer 1=prosepek, 2=pasif, 3=active');
            $table->timestamps();

            $table->index('sponsor_id');
            $table->index('upline_id');
            $table->foreign('package_id')->references('id')->on('customer_package')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('sponsor_id')->references('id')->on('customers')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('upline_id')->references('id')->on('customers')->onDelete('set null')->onUpdate('cascade');
        });

        Schema::create('customer_password_resets', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('customer_addresses', function (Blueprint $table) {
            $table->id()->comment('Primary key alamat customer');
            $table->unsignedBigInteger('customer_id')->comment('Relasi ke tabel customers sebagai pemilik alamat');
            $table->string('label')->nullable()->comment('Label alamat, misalnya: Rumah, Kantor, dll');
            $table->boolean('is_default')->default(false)->comment('Menandakan apakah ini alamat utama (default) customer');
            $table->string('recipient_name')->comment('Nama penerima barang pada alamat ini');
            $table->string('recipient_phone')->comment('Nomor telepon penerima pada alamat ini');
            $table->text('address_line1')->comment('Detail utama alamat (jalan, blok, nomor rumah)');
            $table->text('address_line2')->nullable()->comment('Detail tambahan alamat (patokan, gedung, unit, dll)');
            $table->string('province_label', 100)->comment('Nama provinsi sesuai layanan ekspedisi / API');
            $table->integer('province_id')->comment('ID provinsi sesuai referensi / API pihak ketiga');
            $table->string('city_label', 100)->comment('Nama kota/kabupaten sesuai layanan ekspedisi / API');
            $table->integer('city_id')->comment('ID kota/kabupaten sesuai referensi / API pihak ketiga');
            $table->string('postal_code')->nullable()->comment('Kode pos alamat penerima');
            $table->string('country')->default('Indonesia')->comment('Negara alamat, default Indonesia');
            $table->text('description')->nullable()->comment('Catatan tambahan mengenai alamat ini');
            $table->timestamps();

            $table->index('customer_id');
        });

        // ============================================
        // CUSTOMER NETWORKS (MLM)
        // ============================================

        Schema::create('customer_networks', function (Blueprint $table) {
            $table->increments('id')->comment('Primary key jaringan customer (binary tree)');
            $table->unsignedInteger('member_id')->nullable()->comment('Member/downline yang berada di jaringan');
            $table->unsignedInteger('upline_id')->nullable()->comment('Upline yang menaungi member ini dalam struktur jaringan');
            $table->enum('position', ['left', 'right'])->default('left')->comment('Posisi member dalam binary tree: left atau right');
            $table->tinyInteger('status')->default(1)->comment('Status aktif jaringan: true = aktif, false = tidak aktif');
            $table->tinyInteger('level')->default(1)->comment('Level kedalaman member dari upline di struktur jaringan');
            $table->text('description')->nullable()->comment('Catatan tambahan mengenai posisi jaringan member');
            $table->timestamps();

            $table->index('member_id');
            $table->index('upline_id');
            $table->foreign('member_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('upline_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('customer_network_matrixes', function (Blueprint $table) {
            $table->increments('id')->comment('Primary key matrix jaringan customer');
            $table->unsignedInteger('member_id')->nullable()->comment('Member yang berada di matrix jaringan');
            $table->unsignedInteger('sponsor_id')->nullable()->comment('Sponsor/introducer yang merekrut member ini');
            $table->tinyInteger('level')->default(1)->comment('Level kedalaman member dari sponsor di matrix jaringan');
            $table->text('description')->nullable()->comment('Catatan tambahan terkait posisi member di matrix');
            $table->timestamps();

            $table->index('member_id');
            $table->index('sponsor_id');
            $table->foreign('member_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('sponsor_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
        });

        // ============================================
        // CUSTOMER BONUSES
        // ============================================

        Schema::create('customer_bonuses', function (Blueprint $table) {
            $table->increments('id')->comment('Primary key bonus customer');
            $table->unsignedInteger('member_id')->nullable()->comment('Member penerima bonus');
            $table->decimal('amount', 15, 2)->default(0)->comment('Nominal bonus kotor yang diterima sebelum perhitungan pajak');
            $table->decimal('index_value', 15, 2)->default(0)->comment('Nilai index/point yang berkaitan dengan bonus ini');
            $table->decimal('tax_netto', 15, 2)->default(0)->comment('Nominal bonus bersih setelah pajak (netto)');
            $table->integer('tax_percent')->default(0)->comment('Persentase pajak yang dikenakan terhadap bonus');
            $table->decimal('tax_value', 15, 2)->default(0)->comment('Nominal pajak yang dipotong dari bonus');
            $table->tinyInteger('status')->default(0)->comment('Status bonus: 0 = pending, 1 = sudah dibayarkan / dirilis');
            $table->text('description')->nullable()->comment('Catatan tambahan terkait bonus customer');
            $table->timestamps();

            $table->index('member_id');
            $table->foreign('member_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('customer_bonus_sponsors', function (Blueprint $table) {
            $table->increments('id')->comment('Primary key bonus sponsor customer');
            $table->unsignedInteger('member_id')->nullable()->comment('Member penerima bonus sponsor');
            $table->unsignedInteger('from_member_id')->nullable()->comment('Member yang direkrut (downline) yang memicu bonus sponsor');
            $table->decimal('amount', 15, 2)->default(0)->comment('Nominal bonus sponsor yang diterima');
            $table->decimal('index_value', 15, 2)->default(0)->comment('Nilai index/point yang berkaitan dengan bonus sponsor ini');
            $table->tinyInteger('status')->default(0)->comment('Status bonus sponsor: 0 = pending, 1 = sudah dibayarkan / dirilis');
            $table->text('description')->nullable()->comment('Catatan tambahan terkait bonus sponsor');
            $table->timestamps();

            $table->index('member_id');
            $table->index('from_member_id');
            $table->foreign('member_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('from_member_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('customer_bonus_matchings', function (Blueprint $table) {
            $table->increments('id')->comment('Primary key bonus matching customer');
            $table->unsignedInteger('member_id')->nullable()->comment('Member penerima bonus matching');
            $table->unsignedInteger('from_member_id')->nullable()->comment('Member sumber/asal omset yang memicu bonus matching');
            $table->tinyInteger('level')->default(1)->comment('Level kedalaman dari member sumber terhadap penerima bonus');
            $table->decimal('amount', 15, 2)->default(0)->comment('Nominal bonus matching yang diterima');
            $table->decimal('index_value', 15, 2)->default(0)->comment('Nilai index/point yang berkaitan dengan bonus matching ini');
            $table->tinyInteger('status')->default(0)->comment('Status bonus matching: 0 = pending, 1 = sudah dibayarkan / dirilis');
            $table->text('description')->nullable()->comment('Catatan tambahan terkait bonus matching');
            $table->timestamps();

            $table->index('member_id');
            $table->index('from_member_id');
            $table->foreign('member_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('from_member_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('customer_bonus_pairings', function (Blueprint $table) {
            $table->increments('id')->comment('Primary key bonus pairing customer');
            $table->unsignedInteger('member_id')->nullable()->comment('Member penerima bonus pairing');
            $table->integer('pair')->default(0)->comment('Jumlah pasangan (pair) yang tercapai dalam periode tertentu');
            $table->decimal('amount', 15, 2)->default(0)->comment('Nominal bonus pairing yang diterima');
            $table->decimal('index_value', 15, 2)->default(0)->comment('Nilai index/point yang berkaitan dengan bonus pairing ini');
            $table->tinyInteger('status')->default(0)->comment('Status bonus pairing: 0 = pending, 1 = sudah dibayarkan / dirilis');
            $table->text('description')->nullable()->comment('Catatan tambahan terkait bonus pairing');
            $table->timestamps();

            $table->index('member_id');
            $table->foreign('member_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('customer_bonus_cashbacks', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('member_id');
            $table->unsignedBigInteger('order_id')->nullable();
            $table->decimal('amount', 15, 2)->default(0);
            $table->decimal('index_value', 15, 2)->nullable();
            $table->tinyInteger('status')->default(0)->comment('0=pending, 1=released');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index('member_id');
            $table->foreign('member_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('customer_bonus_rewards', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('member_id');
            $table->string('reward_type')->nullable()->comment('achievement, promotion, special');
            $table->decimal('amount', 15, 2)->default(0);
            $table->decimal('index_value', 15, 2)->nullable();
            $table->tinyInteger('status')->default(0)->comment('0=pending, 1=released');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index('member_id');
            $table->foreign('member_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('customer_bonus_retails', function (Blueprint $table) {
            $table->increments('id')->comment('Primary key bonus retail customer');
            $table->unsignedInteger('member_id')->nullable()->comment('Member penerima bonus retail');
            $table->unsignedInteger('from_member_id')->nullable()->comment('Member yang memicu bonus retail');
            $table->decimal('amount', 15, 2)->default(0)->comment('Nominal bonus retail yang diterima');
            $table->decimal('index_value', 15, 2)->default(0)->comment('Nilai index/point yang berkaitan dengan bonus retail ini');
            $table->tinyInteger('status')->default(0)->comment('Status bonus retail: 0 = pending, 1 = sudah dibayarkan / dirilis');
            $table->text('description')->nullable()->comment('Catatan tambahan terkait bonus retail');
            $table->timestamps();

            $table->index('member_id');
            $table->index('from_member_id');
        });

        Schema::create('customer_bonus_lifetime_cash_rewards', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('member_id')->comment('Member penerima lifetime cash reward');
            $table->string('reward_name')->comment('Nama reward (e.g., Silver, Gold, Platinum)');
            $table->decimal('reward', 15, 2)->default(0)->comment('Nilai reward target');
            $table->decimal('amount', 15, 2)->default(0)->comment('Nominal yang diterima');
            $table->decimal('bv', 15, 2)->default(0)->comment('Business Volume yang dibutuhkan');
            $table->tinyInteger('status')->default(0)->comment('Status: 0 = pending, 1 = released');
            $table->text('description')->nullable()->comment('Catatan tambahan');
            $table->timestamps();

            $table->index('member_id');
            $table->foreign('member_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
        });

        // ============================================
        // CUSTOMER WALLET
        // ============================================

        Schema::create('customer_wallet_transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('customer_id');
            $table->enum('type', ['topup', 'withdrawal', 'bonus', 'purchase', 'refund']);
            $table->decimal('amount', 15, 2);
            $table->decimal('balance_before', 15, 2);
            $table->decimal('balance_after', 15, 2);
            $table->enum('status', ['pending', 'completed', 'failed', 'cancelled'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->string('transaction_ref')->nullable()->unique();
            $table->string('midtrans_transaction_id')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index(['customer_id', 'type']);
            $table->index(['customer_id', 'status']);
            $table->index('created_at');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
        });

        // ============================================
        // CATEGORIES
        // ============================================

        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->string('image')->nullable();
            $table->timestamps();

            $table->index(['is_active', 'sort_order']);
        });

        // ============================================
        // PRODUCTS
        // ============================================

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique();
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('short_desc')->nullable();
            $table->longText('long_desc')->nullable();
            $table->string('brand')->nullable();
            $table->integer('warranty_months')->nullable();
            $table->decimal('base_price', 15, 2);
            $table->string('currency', 3)->default('IDR');
            $table->integer('stock')->default(0);
            $table->integer('weight_gram')->nullable();
            $table->integer('length_mm')->nullable();
            $table->integer('width_mm')->nullable();
            $table->integer('height_mm')->nullable();
            $table->decimal('bv', 15, 2)->nullable()->comment('Bonus value');
            $table->decimal('b_sponsor', 15, 2)->nullable();
            $table->decimal('b_matching', 15, 2)->nullable();
            $table->decimal('b_pairing', 15, 2)->nullable();
            $table->decimal('b_cashback', 15, 2)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'created_at']);
            $table->fullText(['name', 'short_desc']);
        });

        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');

            $table->unique(['product_id', 'category_id']);
        });

        Schema::create('product_media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('url');
            $table->string('type')->default('image');
            $table->string('alt_text')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_primary')->default(false);
            $table->timestamps();

            $table->index(['product_id', 'sort_order']);
        });

        Schema::create('product_reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('order_item_id')->nullable();
            $table->unsignedTinyInteger('rating');
            $table->string('title')->nullable();
            $table->text('comment')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->boolean('is_verified_purchase')->default(false);
            $table->timestamps();

            $table->index(['product_id', 'is_approved']);
            $table->index('customer_id');
        });

        // ============================================
        // CART
        // ============================================

        Schema::create('carts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('customer_id')->nullable();
            $table->string('session_id')->nullable();
            $table->string('currency', 3)->default('IDR');
            $table->decimal('subtotal_amount', 15, 2)->default(0);
            $table->decimal('discount_amount', 15, 2)->default(0);
            $table->decimal('shipping_amount', 15, 2)->default(0);
            $table->decimal('tax_amount', 15, 2)->default(0);
            $table->decimal('grand_total', 15, 2)->default(0);
            $table->json('applied_promos')->nullable();
            $table->timestamps();

            $table->index('customer_id');
            $table->index('session_id');
        });

        Schema::create('cart_items', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('cart_id');
            $table->unsignedBigInteger('product_id');
            $table->integer('qty');
            $table->decimal('unit_price', 15, 2);
            $table->string('currency', 3)->default('IDR');
            $table->string('product_sku');
            $table->string('product_name');
            $table->decimal('row_total', 15, 2);
            $table->json('meta_json')->nullable();
            $table->timestamps();

            $table->index('cart_id');
            $table->index('product_id');
            $table->foreign('cart_id')->references('id')->on('carts')->onDelete('cascade')->onUpdate('cascade');
        });

        // ============================================
        // WISHLISTS
        // ============================================

        Schema::create('wishlists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->string('name')->default('Default');
            $table->timestamps();

            $table->index('customer_id');
        });

        Schema::create('wishlist_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wishlist_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('product_name');
            $table->string('product_sku');
            $table->json('meta_json')->nullable();
            $table->timestamps();

            $table->unique(['wishlist_id', 'product_id']);
            $table->index('wishlist_id');
        });

        // ============================================
        // ORDERS
        // ============================================

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_no')->unique();
            $table->unsignedBigInteger('customer_id');
            $table->string('currency', 3)->default('IDR');
            $table->string('status')->default('pending');
            $table->decimal('subtotal_amount', 15, 2);
            $table->decimal('discount_amount', 15, 2)->default(0);
            $table->decimal('shipping_amount', 15, 2)->default(0);
            $table->decimal('tax_amount', 15, 2)->default(0);
            $table->decimal('grand_total', 15, 2);
            $table->unsignedBigInteger('shipping_address_id')->nullable();
            $table->unsignedBigInteger('billing_address_id')->nullable();
            $table->json('applied_promos')->nullable();
            $table->text('notes')->nullable();
            $table->decimal('bv_amount', 15, 2)->nullable()->default(0);
            $table->decimal('sponsor_amount', 15, 2)->nullable()->default(0);
            $table->decimal('match_amount', 15, 2)->nullable()->default(0);
            $table->decimal('pairing_amount', 15, 2)->nullable()->default(0);
            $table->decimal('cashback_amount', 15, 2)->nullable()->default(0);
            $table->timestamp('placed_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index(['customer_id', 'status']);
            $table->index('placed_at');
            $table->foreign('shipping_address_id')->references('id')->on('customer_addresses')->onDelete('set null');
            $table->foreign('billing_address_id')->references('id')->on('customer_addresses')->onDelete('set null');
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained();
            $table->string('name');
            $table->string('sku');
            $table->integer('qty');
            $table->decimal('unit_price', 15, 2);
            $table->decimal('discount_amount', 15, 2)->default(0);
            $table->decimal('row_total', 15, 2);
            $table->integer('weight_gram')->nullable();
            $table->integer('length_mm')->nullable();
            $table->integer('width_mm')->nullable();
            $table->integer('height_mm')->nullable();
            $table->json('meta_json')->nullable();
            $table->timestamps();

            $table->index('order_id');
        });

        // Update product_reviews foreign key
        Schema::table('product_reviews', function (Blueprint $table) {
            $table->foreign('order_item_id')->references('id')->on('order_items')->onDelete('set null');
        });

        // ============================================
        // PAYMENTS
        // ============================================

        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->boolean('is_active')->default(true);
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('method_id')->constrained('payment_methods');
            $table->string('status')->default('pending');
            $table->decimal('amount', 15, 2);
            $table->string('currency', 3)->default('IDR');
            $table->string('provider_txn_id')->nullable();
            $table->json('metadata_json')->nullable();
            $table->timestamps();

            $table->index(['order_id', 'status']);
        });

        Schema::create('payment_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_id')->constrained()->onDelete('cascade');
            $table->string('status');
            $table->decimal('amount', 15, 2);
            $table->json('raw_json')->nullable();
            $table->timestamp('created_at');

            $table->index('payment_id');
        });

        // ============================================
        // SHIPMENTS
        // ============================================

        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->string('courier_id')->nullable();
            $table->string('tracking_no')->nullable();
            $table->string('status')->default('pending');
            $table->timestamp('shipped_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->decimal('shipping_fee', 15, 2)->default(0);
            $table->timestamps();

            $table->index(['order_id', 'status']);
        });

        Schema::create('shipment_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shipment_id')->constrained()->onDelete('cascade');
            $table->foreignId('order_item_id')->constrained()->onDelete('cascade');
            $table->integer('qty');
            $table->timestamps();

            $table->index('shipment_id');
        });

        // ============================================
        // RETURNS & REFUNDS
        // ============================================

        Schema::create('returns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->string('status')->default('pending');
            $table->text('reason')->nullable();
            $table->timestamp('requested_at')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();

            $table->index(['order_id', 'status']);
        });

        Schema::create('return_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('return_id')->constrained()->onDelete('cascade');
            $table->foreignId('order_item_id')->constrained()->onDelete('cascade');
            $table->integer('qty');
            $table->text('condition_note')->nullable();
            $table->timestamps();

            $table->index('return_id');
        });

        Schema::create('refunds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('payment_id')->constrained()->onDelete('cascade');
            $table->string('status')->default('pending');
            $table->decimal('amount', 15, 2);
            $table->text('reason')->nullable();
            $table->timestamps();

            $table->index(['order_id', 'status']);
        });

        // ============================================
        // PROMOTIONS
        // ============================================

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

        Schema::create('promotion_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('promotion_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('min_qty')->default(1);
            $table->decimal('discount_value', 15, 2)->nullable();
            $table->decimal('discount_percent', 5, 2)->nullable();
            $table->decimal('bundle_price', 15, 2)->nullable();
            $table->timestamps();

            $table->unique(['promotion_id', 'product_id']);
        });

        // ============================================
        // CMS - ARTICLES & PAGES
        // ============================================

        Schema::create('articles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['is_published', 'published_at']);
            $table->fullText(['title', 'seo_title']);
        });

        Schema::create('article_contents', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('article_id')->unique();
            $table->longText('content');
            $table->json('tags')->nullable();
            $table->timestamps();

            $table->fullText('content');
            $table->foreign('article_id')->references('id')->on('articles')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('pages', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content')->nullable();
            $table->json('blocks')->nullable();
            $table->text('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->boolean('is_published')->default(true);
            $table->string('template')->default('default');
            $table->integer('order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        // ============================================
        // NEWSLETTER
        // ============================================

        Schema::create('newsletter_subscribers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->timestamp('subscribed_at')->useCurrent();
            $table->string('ip_address')->nullable();
            $table->timestamps();
        });

        // ============================================
        // SETTINGS
        // ============================================

        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('text');
            $table->string('group')->default('general');
            $table->timestamps();
        });

        // ============================================
        // STORED PROCEDURES
        // ============================================

        DB::unprepared('DROP PROCEDURE IF EXISTS sp_register');
        DB::unprepared("
            CREATE PROCEDURE sp_register(IN `@member_id` INT UNSIGNED)
            BEGIN
                set @package_id=NULL;
                set @last_level = 1;
                set @last_lvl=1;
                set @type=NULL;
                set @possponsor=NULL;

                select `sponsor_id`,`upline_id`,`position`,`omzet`
                into @sponsor_id,@upline_id,@last_position,@omzet
                from `customers` where `id`=@member_id;

                set @sponsor_member_id=@sponsor_id;
                set @last_sponsor=@sponsor_id;

                SELECT `id` INTO @package_id FROM `customer_package` WHERE `price`<=@omzet ORDER BY `price` DESC LIMIT 1;

                if @package_id IS NOT NULL then
                    update `customers` set `package_id`=@package_id where `id`=@member_id;
                end if;

                if @last_position = 'left' then
                    update `customers` set foot_left = @member_id where id = @upline_id;
                else
                    update `customers` set foot_right = @member_id where id = @upline_id;
                end if;

                SET @last_upline=@upline_id;
                while @last_upline > 0 do
                    insert into customer_networks values(null,@member_id,@last_upline,@last_position,1,@last_level,NULL,NOW(),NULL);
                    set @last_level = @last_level + 1;
                    select `upline_id`, `position`
                    into @last_upline, @last_position
                    from customers where id=@last_upline;
                end while;

                while @last_sponsor > 0 do
                    insert into customer_network_matrixes values(null,@member_id,@last_sponsor,@last_lvl,NULL,CURRENT_DATE(),NULL);
                    select `sponsor_id`,`level`
                    into @llast_sponsor,@stype
                    from customers where id=@last_sponsor;
                    SET @last_sponsor=@llast_sponsor;
                    set @last_lvl = @last_lvl + 1;
                end while;

                select `position`
                    into @possponsor
                    from customer_networks where member_id=@member_id AND upline_id=@sponsor_id;

                IF @possponsor IS NOT NULL THEN
                    IF @possponsor = 'left' THEN
                        update customers set sponsor_left=sponsor_left + 1 where id = @sponsor_id;
                        SET @sleft= @sleft + 1;
                    ELSE
                        update customers set sponsor_right=sponsor_right + 1 where id = @sponsor_id;
                        SET @sright= @sright + 1;
                    END IF;
                END IF;

                while @upline_id > 0 do
                    select `sponsor_id`,`upline_id`,`total_left`, `total_right`,`sponsor_left`,`sponsor_right`
                    into @sponsor_upline_id,@parent_upline,@parent_total_left,@parent_total_right,@pspl,@pspr
                    from customers where id = @upline_id;

                    select `position`, `upline_id`
                    into @member_position, @member_id
                    from customers where id = @member_id;

                    if @member_position = 'right' then
                        update customers
                        set total_right = total_right + 1
                        where id = @upline_id;
                    else
                        update customers
                        set total_left = total_left + 1
                        where id = @upline_id;
                    end if;

                    set @upline_id = @parent_upline;
                end while;
            END
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop stored procedures first
        DB::unprepared('DROP PROCEDURE IF EXISTS sp_register');

        // Drop tables in reverse order to handle foreign keys
        Schema::dropIfExists('settings');
        Schema::dropIfExists('newsletter_subscribers');
        Schema::dropIfExists('article_contents');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('pages');
        Schema::dropIfExists('promotion_products');
        Schema::dropIfExists('promotions');
        Schema::dropIfExists('refunds');
        Schema::dropIfExists('return_items');
        Schema::dropIfExists('returns');
        Schema::dropIfExists('shipment_items');
        Schema::dropIfExists('shipments');
        Schema::dropIfExists('payment_transactions');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('payment_methods');
        Schema::dropIfExists('product_reviews');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('wishlist_items');
        Schema::dropIfExists('wishlists');
        Schema::dropIfExists('cart_items');
        Schema::dropIfExists('carts');
        Schema::dropIfExists('product_media');
        Schema::dropIfExists('product_categories');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('customer_wallet_transactions');
        Schema::dropIfExists('customer_bonus_lifetime_cash_rewards');
        Schema::dropIfExists('customer_bonus_retails');
        Schema::dropIfExists('customer_bonus_rewards');
        Schema::dropIfExists('customer_bonus_cashbacks');
        Schema::dropIfExists('customer_bonus_pairings');
        Schema::dropIfExists('customer_bonus_matchings');
        Schema::dropIfExists('customer_bonus_sponsors');
        Schema::dropIfExists('customer_bonuses');
        Schema::dropIfExists('customer_network_matrixes');
        Schema::dropIfExists('customer_networks');
        Schema::dropIfExists('customer_addresses');
        Schema::dropIfExists('customer_password_resets');
        Schema::dropIfExists('customers');
        Schema::dropIfExists('customer_package');
        Schema::dropIfExists('failed_jobs');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('cache_locks');
        Schema::dropIfExists('cache');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};
