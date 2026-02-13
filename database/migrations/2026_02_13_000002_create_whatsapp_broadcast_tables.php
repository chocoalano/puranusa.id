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
        if (! Schema::hasTable('whatsapp_broadcasts')) {
            Schema::create('whatsapp_broadcasts', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->text('message');
                $table->string('template_id')->nullable();
                $table->enum('status', ['draft', 'processing', 'sent', 'partial', 'failed'])->default('draft');
                $table->unsignedInteger('total_recipients')->default(0);
                $table->unsignedInteger('success_recipients')->default(0);
                $table->unsignedInteger('failed_recipients')->default(0);
                $table->timestamp('sent_at')->nullable();
                $table->text('last_error')->nullable();
                $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamps();

                $table->index(['status', 'created_at'], 'wa_broadcasts_status_created_idx');
            });
        }

        if (! Schema::hasTable('whatsapp_broadcast_recipients')) {
            Schema::create('whatsapp_broadcast_recipients', function (Blueprint $table) {
                $table->id();
                $table->foreignId('broadcast_id')
                    ->constrained('whatsapp_broadcasts', 'id', 'wa_broadcast_recipients_broadcast_fk')
                    ->cascadeOnDelete();
                $table->unsignedInteger('customer_id')->nullable();
                $table->string('customer_name')->nullable();
                $table->string('phone');
                $table->string('normalized_phone');
                $table->enum('status', ['pending', 'sent', 'failed'])->default('pending');
                $table->text('response_message')->nullable();
                $table->timestamp('sent_at')->nullable();
                $table->timestamps();

                $table->unique(['broadcast_id', 'normalized_phone'], 'wa_broadcast_recipients_unique_phone');
                $table->index(['broadcast_id', 'status'], 'wa_broadcast_recipients_status_idx');
                $table->index('customer_id', 'wa_broadcast_recipients_customer_idx');
                $table->foreign('customer_id', 'wa_broadcast_recipients_customer_fk')
                    ->references('id')
                    ->on('customers')
                    ->nullOnDelete()
                    ->cascadeOnUpdate();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('whatsapp_broadcast_recipients');
        Schema::dropIfExists('whatsapp_broadcasts');
    }
};
