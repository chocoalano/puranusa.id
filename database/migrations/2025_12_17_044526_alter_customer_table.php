<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            // Tambah kolom baru
            $table->string('nik', 32)->nullable()->after('id');          // NIK biasanya 16, tapi dibuat agak longgar
            $table->string('gender', 20)->nullable()->after('nik');      // bisa "male/female" atau "L/P", terserah sistem kamu
            $table->text('alamat')->nullable()->after('gender');
            $table->string('username', 100)->nullable()->unique()->after('name');
        });
    }

    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            // Hapus kolom yang ditambahkan
            $table->dropColumn(['nik', 'gender', 'alamat', 'username']);
            // Balikkan: email & phone jadi UNIQUE lagi
            $table->unique('email', 'customers_email_unique');
            $table->unique('phone', 'customers_phone_unique');
        });
    }
};
