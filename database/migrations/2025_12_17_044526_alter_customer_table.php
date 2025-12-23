<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            // Tambah kolom baru jika belum ada
            if (! Schema::hasColumn('customers', 'nik')) {
                $table->string('nik', 32)->nullable()->after('id');
            }
            if (! Schema::hasColumn('customers', 'gender')) {
                $table->enum('gender', ['male', 'female', 'L', 'P'])->nullable()->after('nik');
            }
            if (! Schema::hasColumn('customers', 'alamat')) {
                $table->text('alamat')->nullable()->after('gender');
            }
            if (! Schema::hasColumn('customers', 'username')) {
                $table->string('username', 100)->nullable()->unique()->after('name');
            }
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
