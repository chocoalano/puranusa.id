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
            $table->integer('id')->primary()->autoIncrement();
            $table->integer('sponsor_id')->nullable()->index();
            $table->integer('upline_id')->nullable()->index();
            $table->enum('position', ['left', 'right'])->nullable();
            $table->string('ref_code', 255)->unique();
            $table->string('name', 255);
            $table->string('email', 255)->unique();
            $table->string('phone', 255)->nullable();
            $table->string('password', 255);
            $table->string('remember_token', 100)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('ewallet_id', 255)->unique()->nullable();
            $table->decimal('ewallet_saldo', 15, 2)->default(0);
            $table->text('description')->nullable();
            $table->integer('package_id')->nullable()->index();
            $table->integer('foot_left')->default(0);
            $table->integer('foot_right')->default(0);
            $table->integer('total_left')->default(0);
            $table->integer('total_right')->default(0);
            $table->integer('sponsor_left')->default(0);
            $table->integer('sponsor_right')->default(0);
            $table->integer('pv_left')->default(0);
            $table->integer('pv_right')->default(0);
            $table->decimal('omzet', 15, 2)->default(0);
            $table->decimal('omzet_group_left', 15, 2)->default(0);
            $table->decimal('omzet_group_right', 15, 2)->default(0);
            $table->timestamps();

            // Foreign keys
            $table->foreign('package_id')->references('id')->on('customer_package')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('sponsor_id')->references('id')->on('customers')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('upline_id')->references('id')->on('customers')->onUpdate('cascade')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
