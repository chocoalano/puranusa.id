<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerBonusReward;
use App\Models\Reward;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerLifetimeRewardController extends Controller
{
    /**
     * Display lifetime cash rewards for a customer
     */
    public function index(Request $request, Customer $customer): Response
    {
        // Get active lifetime rewards (type=1, status=1)
        $activeRewards = Reward::query()
            ->where('type', 1)
            ->where('status', 1)
            ->orderBy('bv', 'asc')
            ->get()
            ->map(function ($reward) use ($customer) {
                // Check if reward has been claimed
                $alreadyClaimed = CustomerBonusReward::where('member_id', $customer->id)
                    ->where('reward_type', 'lifetime')
                    ->where('bv', $reward->bv)
                    ->exists();

                // Check if customer meets the criteria (omzet_group_left_planb >= bv AND omzet_group_right_planb >= bv)
                $omzetLeft = $customer->omzet_group_left_planb ?? 0;
                $omzetRight = $customer->omzet_group_right_planb ?? 0;
                $canClaim = ! $alreadyClaimed &&
                            $omzetLeft >= $reward->bv &&
                            $omzetRight >= $reward->bv;

                return [
                    'id' => $reward->id,
                    'name' => $reward->name,
                    'reward' => $reward->reward,
                    'bv_required' => $reward->bv,
                    'value' => $reward->value,
                    'omzet_left' => $omzetLeft,
                    'omzet_right' => $omzetRight,
                    'can_claim' => $canClaim,
                    'already_claimed' => $alreadyClaimed,
                ];
            });

        // Get claimed rewards (reward_type = 'lifetime')
        $claimedRewards = CustomerBonusReward::query()
            ->where('member_id', $customer->id)
            ->where('reward_type', 'lifetime')
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

        return Inertia::render('Admin/Customers/LifetimeRewards', [
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'ewallet_id' => $customer->ewallet_id,
                'username' => $customer->username,
                'omzet_left' => $customer->omzet_group_left_planb ?? 0,
                'omzet_right' => $customer->omzet_group_right_planb ?? 0,
            ],
            'activeRewards' => $activeRewards,
            'claimedRewards' => $claimedRewards,
        ]);
    }

    /**
     * Claim a lifetime reward for a customer
     */
    public function claim(Request $request, Customer $customer, Reward $reward): RedirectResponse
    {
        // Validate reward type
        if ($reward->type !== 1 || $reward->status !== 1) {
            return back()->with('error', 'Reward tidak valid atau tidak aktif.');
        }

        // Check if already claimed
        $alreadyClaimed = CustomerBonusReward::where('member_id', $customer->id)
            ->where('reward_type', 'lifetime')
            ->where('bv', $reward->bv)
            ->exists();

        if ($alreadyClaimed) {
            return back()->with('error', 'Reward ini sudah pernah diklaim.');
        }

        // Check if customer meets the criteria
        $omzetLeft = $customer->omzet_group_left_planb ?? 0;
        $omzetRight = $customer->omzet_group_right_planb ?? 0;

        if ($omzetLeft < $reward->bv || $omzetRight < $reward->bv) {
            return back()->with('error', 'Omset belum memenuhi syarat untuk klaim reward ini.');
        }

        // Create the bonus reward record
        CustomerBonusReward::create([
            'member_id' => $customer->id,
            'reward_type' => 'lifetime',
            'reward' => $reward->name,
            'bv' => $reward->bv,
            'amount' => $reward->value,
            'status' => 0, // Pending/Diproses
        ]);

        return back()->with('success', "Reward '{$reward->name}' berhasil diklaim!");
    }
}
