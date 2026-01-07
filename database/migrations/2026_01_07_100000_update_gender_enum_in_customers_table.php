<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Update ENUM to include 'laki-laki' and 'perempuan'
        DB::statement("ALTER TABLE customers MODIFY COLUMN gender ENUM('male', 'female', 'L', 'P', 'laki-laki', 'perempuan') NULL");
    }

    public function down(): void
    {
        // First convert any 'laki-laki'/'perempuan' values back to 'male'/'female'
        DB::statement("UPDATE customers SET gender = 'male' WHERE gender = 'laki-laki'");
        DB::statement("UPDATE customers SET gender = 'female' WHERE gender = 'perempuan'");

        // Then revert ENUM
        DB::statement("ALTER TABLE customers MODIFY COLUMN gender ENUM('male', 'female', 'L', 'P') NULL");
    }
};
