<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Check existing indexes on orders table
        $ordersIndexes = collect(DB::select('SHOW INDEX FROM orders'))->pluck('Key_name')->toArray();

        Schema::table('orders', function (Blueprint $table) use ($ordersIndexes) {
            if (! in_array('orders_paid_at_index', $ordersIndexes)) {
                $table->index('paid_at');
            }
            if (! in_array('orders_status_index', $ordersIndexes)) {
                $table->index('status');
            }
            if (! in_array('orders_created_at_index', $ordersIndexes)) {
                $table->index('created_at');
            }
        });

        // Check existing indexes on order_items table
        $orderItemsIndexes = collect(DB::select('SHOW INDEX FROM order_items'))->pluck('Key_name')->toArray();

        Schema::table('order_items', function (Blueprint $table) use ($orderItemsIndexes) {
            if (! in_array('order_items_order_id_index', $orderItemsIndexes)) {
                $table->index('order_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $ordersIndexes = collect(DB::select('SHOW INDEX FROM orders'))->pluck('Key_name')->toArray();

        Schema::table('orders', function (Blueprint $table) use ($ordersIndexes) {
            if (in_array('orders_paid_at_index', $ordersIndexes)) {
                $table->dropIndex(['paid_at']);
            }
            if (in_array('orders_status_index', $ordersIndexes)) {
                $table->dropIndex(['status']);
            }
            if (in_array('orders_created_at_index', $ordersIndexes)) {
                $table->dropIndex(['created_at']);
            }
        });

        $orderItemsIndexes = collect(DB::select('SHOW INDEX FROM order_items'))->pluck('Key_name')->toArray();

        Schema::table('order_items', function (Blueprint $table) use ($orderItemsIndexes) {
            if (in_array('order_items_order_id_index', $orderItemsIndexes)) {
                $table->dropIndex(['order_id']);
            }
        });
    }
};
