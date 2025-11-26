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
            // Binary tree columns
            $table->unsignedInteger('upline_id')
                ->nullable()
                ->after('sponsor_id')
                ->comment('upline ketika sudah ditempatkan');

            $table->enum('position', ['left', 'right'])
                ->nullable()
                ->after('upline_id')
                ->comment('Posisi di binary tree');

            // Package column
            $table->unsignedInteger('package_id')
                ->nullable()
                ->after('description')
                ->comment('paket sesuai total omset member');

            // Foot columns (level 1 downlines)
            $table->unsignedInteger('foot_left')
                ->nullable()
                ->after('package_id')
                ->comment('kaki kiri level 1');

            $table->unsignedInteger('foot_right')
                ->nullable()
                ->after('foot_left')
                ->comment('kaki kanan level 1');

            // Total downlines counters
            $table->unsignedInteger('total_left')
                ->default(0)
                ->after('foot_right')
                ->comment('jumlah kaki kiri');

            $table->unsignedInteger('total_right')
                ->default(0)
                ->after('total_left')
                ->comment('jumlah kaki kanan');

            // Sponsor counters
            $table->unsignedInteger('sponsor_left')
                ->default(0)
                ->after('total_right')
                ->comment('jumlah member yang disponsori kaki kiri');

            $table->unsignedInteger('sponsor_right')
                ->default(0)
                ->after('sponsor_left')
                ->comment('jumlah member yang disponsori kaki kanan');

            // PV (Point Value) counters
            $table->unsignedInteger('pv_left')
                ->default(0)
                ->after('sponsor_right')
                ->comment('jumlah pv untuk pairing dari kaki kiri');

            $table->unsignedInteger('pv_right')
                ->default(0)
                ->after('pv_left')
                ->comment('jumlah pv untuk pairing dari kaki kanan');

            // Omzet columns
            $table->decimal('omzet', 10, 2)
                ->default(0.00)
                ->after('pv_right')
                ->comment('Total omzet pribadi');

            $table->decimal('omzet_group_left', 10, 2)
                ->default(0.00)
                ->after('omzet')
                ->comment('jumlah omset dari group binary kaki kiri');

            $table->decimal('omzet_group_right', 10, 2)
                ->default(0.00)
                ->after('omzet_group_left')
                ->comment('jumlah omset dari group binary kaki kanan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn([
                'upline_id',
                'position',
                'package_id',
                'foot_left',
                'foot_right',
                'total_left',
                'total_right',
                'sponsor_left',
                'sponsor_right',
                'pv_left',
                'pv_right',
                'omzet',
                'omzet_group_left',
                'omzet_group_right',
            ]);
        });
    }
};
