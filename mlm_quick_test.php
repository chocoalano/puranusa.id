<?php

/**
 * Quick Testing Script untuk MLM System
 *
 * Cara run:
 * php artisan tinker
 * >>> include 'mlm_quick_test.php';
 *
 * Atau buat sebagai Artisan Command
 */

use App\Models\Manage\Customer;
use App\Services\MLMService;

// Initialize service
$mlmService = app(MLMService::class);

echo "=== MLM SYSTEM QUICK TEST ===\n\n";

// Test 1: Buat root member (tanpa upline/sponsor)
echo "1. Creating root member...\n";
$root = Customer::create([
    'name' => 'Root Member',
    'email' => 'root@mlm.test',
    'phone' => '081234567890',
    'password' => 'password',
]);
echo "   ✓ Root member created: {$root->name} ({$root->ewallet_id})\n\n";

// Test 2: Register member dengan sponsor
echo "2. Registering member with sponsor...\n";
$result = $mlmService->completeRegistrationFlow(
    customerData: [
        'name' => 'Member Level 1',
        'email' => 'member1@mlm.test',
        'phone' => '081234567891',
        'password' => 'password',
    ],
    sponsorId: $root->id,
    uplineId: null, // Akan jadi root di binary tree
    registrationAmount: 500000,
    preferredPosition: 'left'
);
$member1 = $result['customer'];
echo "   ✓ Member registered: {$member1->name} ({$member1->ewallet_id})\n";
if ($result['bonuses']['sponsor'] ?? null) {
    echo '   ✓ Sponsor bonus created: Rp '.number_format($result['bonuses']['sponsor']->amount, 0, ',', '.').")\n";
}
echo "\n";

// Test 3: Register member kedua
echo "3. Registering second member...\n";
$result2 = $mlmService->completeRegistrationFlow(
    customerData: [
        'name' => 'Member Level 2',
        'email' => 'member2@mlm.test',
        'phone' => '081234567892',
        'password' => 'password',
    ],
    sponsorId: $member1->id,
    uplineId: $root->id,
    registrationAmount: 500000,
    preferredPosition: 'left'
);
$member2 = $result2['customer'];
echo "   ✓ Member registered: {$member2->name} ({$member2->ewallet_id})\n\n";

// Test 4: Get network statistics
echo "4. Getting network statistics for root...\n";
$stats = $mlmService->getNetworkStatistics($root->id);
echo "   Binary Tree:\n";
echo "   - Left Count: {$stats['binary_tree']['left_count']}\n";
echo "   - Right Count: {$stats['binary_tree']['right_count']}\n";
echo "   - Total Downlines: {$stats['binary_tree']['total_downlines']}\n";
echo "   Matrix:\n";
echo "   - Direct Downlines: {$stats['matrix']['direct_downlines']}\n";
echo "   - Total Downlines: {$stats['matrix']['total_downlines']}\n";
echo "   Bonuses:\n";
echo '   - Pending: Rp '.number_format($stats['bonuses']['total_pending'], 0, ',', '.')."\n";
echo '   - Released: Rp '.number_format($stats['bonuses']['total_released'], 0, ',', '.')."\n\n";

// Test 5: Process transaction bonuses
echo "5. Processing transaction bonuses...\n";
$matchingBonuses = $mlmService->processMatchingBonus(
    fromMemberId: $member2->id,
    amount: 1000000,
    maxLevel: 5
);
echo '   ✓ Matching bonuses created: '.count($matchingBonuses)." bonuses\n";
foreach ($matchingBonuses as $bonus) {
    echo "     - Level {$bonus->level}: Rp ".number_format($bonus->amount, 0, ',', '.')." for member #{$bonus->member_id}\n";
}
echo "\n";

// Test 6: Calculate and create pairing bonus
echo "6. Processing pairing bonus...\n";
$pairingBonus = $mlmService->processPairingBonus(
    memberId: $root->id,
    bonusPerPair: 100000
);
if ($pairingBonus) {
    echo "   ✓ Pairing bonus created: {$pairingBonus->pair} pairs = Rp ".number_format($pairingBonus->amount, 0, ',', '.')."\n";
} else {
    echo "   - No pairing bonus (insufficient pairs)\n";
}
echo "\n";

// Test 7: Release all bonuses for root
echo "7. Releasing all pending bonuses for root...\n";
$releaseResults = $mlmService->releaseAllPendingBonuses($root->id);
echo "   Regular Bonus: {$releaseResults['regular_bonus']['count']} bonuses, Rp ".number_format($releaseResults['regular_bonus']['amount'], 0, ',', '.')."\n";
echo "   Matching Bonus: {$releaseResults['matching_bonus']['count']} bonuses, Rp ".number_format($releaseResults['matching_bonus']['amount'], 0, ',', '.')."\n";
echo "   Pairing Bonus: {$releaseResults['pairing_bonus']['count']} bonuses, Rp ".number_format($releaseResults['pairing_bonus']['amount'], 0, ',', '.')."\n";
echo "   Sponsor Bonus: {$releaseResults['sponsor_bonus']['count']} bonuses, Rp ".number_format($releaseResults['sponsor_bonus']['amount'], 0, ',', '.')."\n";
echo '   ✓ Total Released: Rp '.number_format($releaseResults['total_amount'], 0, ',', '.')."\n\n";

// Test 8: Check ewallet balance
echo "8. Checking ewallet balances...\n";
$root->refresh();
$member1->refresh();
$member2->refresh();
echo '   Root: Rp '.number_format($root->ewallet_saldo, 0, ',', '.')."\n";
echo '   Member 1: Rp '.number_format($member1->ewallet_saldo, 0, ',', '.')."\n";
echo '   Member 2: Rp '.number_format($member2->ewallet_saldo, 0, ',', '.')."\n\n";

// Test 9: Test top up and withdrawal
echo "9. Testing ewallet operations...\n";
$root->addBalance(500000, 'Top up test');
echo "   ✓ Added Rp 500,000 to root\n";
$root->refresh();
echo '   New balance: Rp '.number_format($root->ewallet_saldo, 0, ',', '.')."\n";

try {
    $root->deductBalance(100000, 'Withdrawal test');
    echo "   ✓ Deducted Rp 100,000 from root\n";
    $root->refresh();
    echo '   New balance: Rp '.number_format($root->ewallet_saldo, 0, ',', '.')."\n";
} catch (\Exception $e) {
    echo "   ✗ Error: {$e->getMessage()}\n";
}
echo "\n";

// Test 10: Get downline tree
echo "10. Getting downline tree visualization...\n";
$tree = $mlmService->getDownlineTree($root->id, maxLevel: 3);
echo "   ✓ Tree structure retrieved\n";
echo "   Root: {$tree['name']} (ID: {$tree['id']})\n";
if (! empty($tree['children'])) {
    foreach ($tree['children'] as $position => $child) {
        echo "   └─ {$position}: {$child['name']} (ID: {$child['id']}, Level: {$child['level']})\n";
    }
}
echo "\n";

echo "=== TEST COMPLETED ===\n";
echo "\nNote: Data ini adalah test data. Untuk production, gunakan proper seeding atau UI.\n";
