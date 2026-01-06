<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerBvReward;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerBonusReward;
use App\Models\Reward;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerPromotionsRewardController extends Controller
{
    /**
     * Display promotions rewards progress for a customer
     */
    public function index(Request $request, Customer $customer): Response
    {
        $now = now()->toDateString();

        // Get active promotions rewards (type=0, status=1, start<=today, end>=today)
        $activeRewards = Reward::query()
            ->where('type', 0)
            ->where('status', 1)
            ->whereDate('start', '<=', $now)
            ->whereDate('end', '>=', $now)
            ->orderBy('end', 'asc')
            ->get()
            ->map(function ($reward) use ($customer) {
                // Get progress from customer_bv_rewards
                $progress = CustomerBvReward::where('member_id', $customer->id)
                    ->where('reward_id', $reward->id)
                    ->first();

                return [
                    'id' => $reward->id,
                    'name' => $reward->name,
                    'reward' => $reward->reward,
                    'bv_required' => $reward->bv,
                    'start' => $reward->start?->format('Y-m-d'),
                    'end' => $reward->end?->format('Y-m-d'),
                    'omzet_left' => $progress?->omzet_left ?? 0,
                    'omzet_right' => $progress?->omzet_right ?? 0,
                    'status' => $progress?->status ?? 0, // 0 = Belum tercapai, 1 = Diproses
                    'progress_left_percent' => $reward->bv > 0 ? min(100, (($progress?->omzet_left ?? 0) / $reward->bv) * 100) : 0,
                    'progress_right_percent' => $reward->bv > 0 ? min(100, (($progress?->omzet_right ?? 0) / $reward->bv) * 100) : 0,
                ];
            });

        // Get claimed rewards (reward_type = 'promotion')
        $claimedRewards = CustomerBonusReward::query()
            ->where('member_id', $customer->id)
            ->where('reward_type', 'promotion')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($bonus) {
                return [
                    'id' => $bonus->id,
                    'reward' => $bonus->reward,
                    'bv' => $bonus->bv,
                    'amount' => $bonus->amount,
                    'claimed_at' => $bonus->created_at?->format('Y-m-d H:i:s'),
                    'status' => $bonus->status,
                ];
            });

        return Inertia::render('Admin/Customers/PromotionsRewards', [
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'ewallet_id' => $customer->ewallet_id,
                'username' => $customer->username,
            ],
            'activeRewards' => $activeRewards,
            'claimedRewards' => $claimedRewards,
        ]);
    }
}
