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
        Schema::create('customers', function (Blueprint $table) {
            $table->id()->comment('Primary key customer');
            $table->string('name')->comment('Nama lengkap customer');
            $table->string('email')->unique()->comment('Email unik untuk login dan komunikasi');
            $table->string('phone')->nullable()->comment('Nomor telepon / WhatsApp customer');
            $table->string('password')->comment('Password yang telah di-hash untuk autentikasi');
            $table->string('remember_token', 100)->nullable()->comment('Token remember me untuk tetap login');
            $table->timestamp('email_verified_at')->nullable()->comment('Waktu ketika email customer terverifikasi');
            $table->string('ewallet_id')->nullable()->unique()->comment('ID unik dompet elektronik customer');
            $table->decimal('ewallet_saldo', 15, 2)->default(0)->comment('Saldo dompet elektronik customer');
            $table->text('description')->nullable()->comment('Catatan tambahan mengenai customer');
            $table->timestamp('created_at')->nullable()->comment('Waktu data customer dibuat');
            $table->timestamp('updated_at')->nullable()->comment('Waktu data customer terakhir diperbarui');
        });

        Schema::create('customer_addresses', function (Blueprint $table) {
            $table->id()->comment('Primary key alamat customer');
            $table->foreignId('customer_id')
                ->comment('Relasi ke tabel customers sebagai pemilik alamat')
                ->constrained()
                ->onDelete('cascade');
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
            $table->timestamp('created_at')->nullable()->comment('Waktu data alamat dibuat');
            $table->timestamp('updated_at')->nullable()->comment('Waktu data alamat terakhir diperbarui');
        });

        Schema::create('customer_networks', function (Blueprint $table) {
            $table->id()->comment('Primary key jaringan customer (binary tree)');
            $table->foreignId('member_id')
                ->nullable()
                ->comment('Member/downline yang berada di jaringan')
                ->constrained('customers')
                ->onDelete('cascade');
            $table->foreignId('upline_id')
                ->nullable()
                ->comment('Upline yang menaungi member ini dalam struktur jaringan')
                ->constrained('customers')
                ->onDelete('cascade');
            $table->enum('position', ['left', 'right'])
                ->default('left')
                ->comment('Posisi member dalam binary tree: left atau right');
            $table->boolean('status')
                ->default(true)
                ->comment('Status aktif jaringan: true = aktif, false = tidak aktif');
            $table->tinyInteger('level')
                ->default(1)
                ->comment('Level kedalaman member dari upline di struktur jaringan');
            $table->text('description')->nullable()->comment('Catatan tambahan mengenai posisi jaringan member');
            $table->timestamp('created_at')->nullable()->comment('Waktu data jaringan dibuat');
            $table->timestamp('updated_at')->nullable()->comment('Waktu data jaringan terakhir diperbarui');
        });

        Schema::create('customer_network_matrixes', function (Blueprint $table) {
            $table->id()->comment('Primary key matrix jaringan customer');
            $table->foreignId('member_id')
                ->nullable()
                ->comment('Member yang berada di matrix jaringan')
                ->constrained('customers')
                ->onDelete('cascade');
            $table->foreignId('sponsor_id')
                ->nullable()
                ->comment('Sponsor/introducer yang merekrut member ini')
                ->constrained('customers')
                ->onDelete('cascade');
            $table->tinyInteger('level')
                ->default(1)
                ->comment('Level kedalaman member dari sponsor di matrix jaringan');
            $table->text('description')->nullable()->comment('Catatan tambahan terkait posisi member di matrix');
            $table->timestamp('created_at')->nullable()->comment('Waktu data matrix dibuat');
            $table->timestamp('updated_at')->nullable()->comment('Waktu data matrix terakhir diperbarui');
        });

        Schema::create('customer_bonuses', function (Blueprint $table) {
            $table->id()->comment('Primary key bonus customer');
            $table->foreignId('member_id')
                ->nullable()
                ->comment('Member penerima bonus')
                ->constrained('customers')
                ->onDelete('cascade');
            $table->decimal('amount', 15, 2)
                ->default(0)
                ->comment('Nominal bonus kotor yang diterima sebelum perhitungan pajak');
            $table->decimal('index_value', 15, 2)
                ->default(0)
                ->comment('Nilai index/point yang berkaitan dengan bonus ini');
            $table->decimal('tax_netto', 15, 2)
                ->default(0)
                ->comment('Nominal bonus bersih setelah pajak (netto)');
            $table->integer('tax_percent')
                ->default(0)
                ->comment('Persentase pajak yang dikenakan terhadap bonus');
            $table->decimal('tax_value', 15, 2)
                ->default(0)
                ->comment('Nominal pajak yang dipotong dari bonus');
            $table->tinyInteger('status')
                ->default(0)
                ->comment('Status bonus: 0 = pending, 1 = sudah dibayarkan / dirilis');
            $table->text('description')->nullable()->comment('Catatan tambahan terkait bonus customer');
            $table->timestamp('created_at')->nullable()->comment('Waktu data bonus dibuat');
            $table->timestamp('updated_at')->nullable()->comment('Waktu data bonus terakhir diperbarui');
        });

        Schema::create('customer_bonus_matchings', function (Blueprint $table) {
            $table->id()->comment('Primary key bonus matching customer');
            $table->foreignId('member_id')
                ->nullable()
                ->comment('Member penerima bonus matching')
                ->constrained('customers')
                ->onDelete('cascade');
            $table->foreignId('from_member_id')
                ->nullable()
                ->comment('Member sumber/asal omset yang memicu bonus matching');
            $table->tinyInteger('level')
                ->default(1)
                ->comment('Level kedalaman dari member sumber terhadap penerima bonus');
            $table->decimal('amount', 15, 2)
                ->default(0)
                ->comment('Nominal bonus matching yang diterima');
            $table->decimal('index_value', 15, 2)
                ->default(0)
                ->comment('Nilai index/point yang berkaitan dengan bonus matching ini');
            $table->tinyInteger('status')
                ->default(0)
                ->comment('Status bonus matching: 0 = pending, 1 = sudah dibayarkan / dirilis');
            $table->text('description')->nullable()->comment('Catatan tambahan terkait bonus matching');
            $table->timestamp('created_at')->nullable()->comment('Waktu data bonus matching dibuat');
            $table->timestamp('updated_at')->nullable()->comment('Waktu data bonus matching terakhir diperbarui');
        });

        Schema::create('customer_bonus_pairings', function (Blueprint $table) {
            $table->id()->comment('Primary key bonus pairing customer');
            $table->foreignId('member_id')
                ->nullable()
                ->comment('Member penerima bonus pairing');
            $table->integer('pair')
                ->default(0)
                ->comment('Jumlah pasangan (pair) yang tercapai dalam periode tertentu');
            $table->decimal('amount', 15, 2)
                ->default(0)
                ->comment('Nominal bonus pairing yang diterima');
            $table->decimal('index_value', 15, 2)
                ->default(0)
                ->comment('Nilai index/point yang berkaitan dengan bonus pairing ini');
            $table->tinyInteger('status')
                ->default(0)
                ->comment('Status bonus pairing: 0 = pending, 1 = sudah dibayarkan / dirilis');
            $table->text('description')->nullable()->comment('Catatan tambahan terkait bonus pairing');
            $table->timestamp('created_at')->nullable()->comment('Waktu data bonus pairing dibuat');
            $table->timestamp('updated_at')->nullable()->comment('Waktu data bonus pairing terakhir diperbarui');
        });

        Schema::create('customer_bonus_sponsors', function (Blueprint $table) {
            $table->id()->comment('Primary key bonus sponsor customer');
            $table->foreignId('member_id')
                ->nullable()
                ->comment('Member penerima bonus sponsor');
            $table->foreignId('from_member_id')
                ->nullable()
                ->comment('Member yang direkrut (downline) yang memicu bonus sponsor');
            $table->decimal('amount', 15, 2)
                ->default(0)
                ->comment('Nominal bonus sponsor yang diterima');
            $table->decimal('index_value', 15, 2)
                ->default(0)
                ->comment('Nilai index/point yang berkaitan dengan bonus sponsor ini');
            $table->tinyInteger('status')
                ->default(0)
                ->comment('Status bonus sponsor: 0 = pending, 1 = sudah dibayarkan / dirilis');
            $table->text('description')->nullable()->comment('Catatan tambahan terkait bonus sponsor');
            $table->timestamp('created_at')->nullable()->comment('Waktu data bonus sponsor dibuat');
            $table->timestamp('updated_at')->nullable()->comment('Waktu data bonus sponsor terakhir diperbarui');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_bonus_sponsors');
        Schema::dropIfExists('customer_bonus_pairings');
        Schema::dropIfExists('customer_bonus_matchings');
        Schema::dropIfExists('customer_bonuses');
        Schema::dropIfExists('customer_network_matrixes');
        Schema::dropIfExists('customer_networks');
        Schema::dropIfExists('customer_addresses');
        Schema::dropIfExists('customers');
    }
};
