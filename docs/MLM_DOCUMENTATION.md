# MLM System - Documentation

## Overview
Sistem MLM (Multi-Level Marketing) lengkap dengan struktur binary tree dan matrix, serta sistem bonus yang komprehensif.

## Models

### 1. Customer
Model utama untuk member/customer MLM.

**Fitur:**
- Auto-generate `ewallet_id` dengan format: `EW-YYYYMMDD-XXXXX`
- Manajemen saldo ewallet dengan `addBalance()` dan `deductBalance()`
- Relasi lengkap ke semua tabel terkait
- Helper methods untuk akses upline/downline

**Contoh Penggunaan:**
```php
// Buat customer baru (ewallet_id otomatis di-generate)
$customer = Customer::create([
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'phone' => '081234567890',
    'password' => 'password123',
]);

// Tambah saldo
$customer->addBalance(100000, 'Top up saldo');

// Kurangi saldo
$customer->deductBalance(50000, 'Pembelian produk');

// Cek upline
$upline = $customer->getUpline();

// Cek sponsor
$sponsor = $customer->getSponsor();

// Hitung jaringan
$leftCount = $customer->countLeftNetwork();
$rightCount = $customer->countRightNetwork();
```

### 2. CustomerAddress
Model untuk manajemen alamat customer.

**Contoh Penggunaan:**
```php
// Buat alamat baru
$address = CustomerAddress::create([
    'customer_id' => $customer->id,
    'label' => 'Rumah',
    'recipient_name' => 'John Doe',
    'recipient_phone' => '081234567890',
    'address_line1' => 'Jl. Contoh No. 123',
    'province_label' => 'DKI Jakarta',
    'province_id' => 1,
    'city_label' => 'Jakarta Selatan',
    'city_id' => 101,
    'postal_code' => '12345',
]);

// Set sebagai default
$address->setAsDefault();

// Get alamat lengkap
$fullAddress = $address->getFullAddress();
```

### 3. CustomerNetwork (Binary Tree)
Model untuk jaringan binary tree dengan posisi left/right.

**Contoh Penggunaan:**
```php
// Placement otomatis ke posisi kosong terdekat
$network = CustomerNetwork::placeNewMember(
    memberId: $newMember->id,
    uplineId: $upline->id,
    preferredPosition: 'left' // optional
);

// Cari posisi tersedia
$position = CustomerNetwork::findAvailablePosition($uplineId);
// Returns: ['upline_id' => 1, 'position' => 'left', 'level' => 2]

// Validasi posisi
$isValid = CustomerNetwork::validatePlacement($uplineId, 'left');
```

### 4. CustomerNetworkMatrix
Model untuk jaringan matrix (sponsor/referral).

**Contoh Penggunaan:**
```php
// Tambah ke matrix
$matrix = CustomerNetworkMatrix::addToMatrix(
    memberId: $newMember->id,
    sponsorId: $sponsor->id
);

// Get upline sponsors sampai level tertentu
$uplines = $matrix->getUplineSponsors(maxLevel: 5);

// Hitung total downlines
$totalDownlines = $matrix->countTotalDownlines(maxLevel: 10);
```

### 5. CustomerBonus
Model untuk bonus umum dengan kalkulasi pajak otomatis.

**Contoh Penggunaan:**
```php
// Buat bonus dengan kalkulasi pajak otomatis
$bonus = CustomerBonus::createBonus(
    memberId: $member->id,
    amount: 1000000,
    indexValue: 1000000,
    taxPercent: 10,
    description: 'Bonus penjualan'
);

// Release bonus ke ewallet
$bonus->release();

// Release multiple bonuses
$results = CustomerBonus::releaseBulk([1, 2, 3, 4]);

// Query bonus pending
$pending = CustomerBonus::pending()->get();
```

### 6. CustomerBonusMatching
Model untuk bonus matching berdasarkan level sponsor.

**Contoh Penggunaan:**
```php
// Distribusi bonus matching ke upline
$bonuses = CustomerBonusMatching::distributeMatchingBonus(
    fromMemberId: $buyer->id,
    amount: 1000000,
    maxLevel: 5,
    levelPercentages: [
        1 => 10, // 10% untuk level 1
        2 => 5,  // 5% untuk level 2
        3 => 3,  // 3% untuk level 3
        4 => 2,  // 2% untuk level 4
        5 => 1,  // 1% untuk level 5
    ]
);

// Release bonus
foreach ($bonuses as $bonus) {
    $bonus->release();
}
```

### 7. CustomerBonusPairing
Model untuk bonus pairing dari binary tree.

**Contoh Penggunaan:**
```php
// Hitung pairs
$pairs = CustomerBonusPairing::calculatePairs($member->id);

// Buat bonus pairing
$bonus = CustomerBonusPairing::createPairingBonus(
    memberId: $member->id,
    bonusPerPair: 100000,
    maxPairs: 10 // optional, batasi max pair
);

// Flush bonus pairing untuk semua member (rutin bulanan)
$results = CustomerBonusPairing::flushPairingBonus(
    memberIds: [], // kosongkan untuk proses semua
    bonusPerPair: 100000,
    maxPairs: 10
);

// Release bonus
$bonus->release();
```

### 8. CustomerBonusSponsor
Model untuk bonus sponsor dari downline langsung.

**Contoh Penggunaan:**
```php
// Bonus dari registrasi member baru
$bonus = CustomerBonusSponsor::distributeSponsorBonusFromRegistration(
    newMemberId: $newMember->id,
    registrationAmount: 500000,
    sponsorPercentage: 10 // 10% dari 500k = 50k
);

// Bonus dari transaksi downline
$bonus = CustomerBonusSponsor::distributeSponsorBonusFromTransaction(
    buyerId: $buyer->id,
    transactionAmount: 1000000,
    sponsorPercentage: 5 // 5% dari 1jt = 50k
);

// Release semua bonus pending
$results = CustomerBonusSponsor::releasePendingForMember($sponsor->id);
```

## MLMService

Service class yang mengintegrasikan semua fungsi MLM.

**Contoh Penggunaan:**

```php
use App\Services\MLMService;

$mlmService = app(MLMService::class);

// 1. Complete registration flow
$result = $mlmService->completeRegistrationFlow(
    customerData: [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'phone' => '081234567890',
        'password' => 'password123',
    ],
    sponsorId: $sponsor->id,
    uplineId: $upline->id,
    registrationAmount: 500000,
    preferredPosition: 'left'
);

// 2. Get network statistics
$stats = $mlmService->getNetworkStatistics($member->id);
/*
Returns:
[
    'member' => [...],
    'binary_tree' => [
        'upline' => [...],
        'left_count' => 5,
        'right_count' => 3,
        'total_downlines' => 8,
    ],
    'matrix' => [
        'sponsor' => [...],
        'total_downlines' => 15,
    ],
    'bonuses' => [
        'total_released' => 5000000,
        'total_pending' => 1000000,
        'breakdown' => [...],
    ],
]
*/

// 3. Release semua bonus pending
$results = $mlmService->releaseAllPendingBonuses($member->id);

// 4. Proses bonus matching
$bonuses = $mlmService->processMatchingBonus(
    fromMemberId: $buyer->id,
    amount: 1000000,
    maxLevel: 5
);

// 5. Proses bonus pairing
$bonus = $mlmService->processPairingBonus(
    memberId: $member->id,
    bonusPerPair: 100000
);

// 6. Flush semua bonus pairing (rutin bulanan)
$results = $mlmService->flushAllPairingBonuses(
    bonusPerPair: 100000,
    maxPairs: 10
);

// 7. Get downline tree untuk visualisasi
$tree = $mlmService->getDownlineTree($member->id, maxLevel: 5);
```

## Factory Usage

```php
use App\Models\Manage\Customer;

// Buat customer dengan factory
$customer = Customer::factory()->create();

// Buat customer terverifikasi
$customer = Customer::factory()->verified()->create();

// Buat customer dengan saldo tertentu
$customer = Customer::factory()->withBalance(1000000)->create();

// Buat customer tanpa saldo
$customer = Customer::factory()->withoutBalance()->create();

// Buat multiple customers
$customers = Customer::factory()->count(10)->create();
```

## Business Logic Flow

### Registrasi Member Baru
```php
$mlmService = app(MLMService::class);

// Step 1: Register dengan placement otomatis
$result = $mlmService->completeRegistrationFlow(
    customerData: [
        'name' => 'New Member',
        'email' => 'newmember@example.com',
        'password' => 'password',
    ],
    sponsorId: $sponsor->id,      // Sponsor untuk matrix
    uplineId: $upline->id,        // Upline untuk binary tree
    registrationAmount: 500000,    // Amount untuk bonus sponsor
    preferredPosition: 'left'      // Preferensi posisi (optional)
);

$newCustomer = $result['customer'];
$sponsorBonus = $result['bonuses']['sponsor'] ?? null;
```

### Transaksi dengan Distribusi Bonus
```php
// Step 1: Catat transaksi (logic sesuai kebutuhan)
$transaction = Transaction::create([...]);

// Step 2: Distribusi bonus matching ke upline
$matchingBonuses = $mlmService->processMatchingBonus(
    fromMemberId: $buyer->id,
    amount: $transaction->amount,
    maxLevel: 5,
    levelPercentages: [
        1 => 10,
        2 => 5,
        3 => 3,
        4 => 2,
        5 => 1,
    ]
);

// Step 3: Bonus sponsor untuk sponsor langsung
$sponsorBonus = CustomerBonusSponsor::distributeSponsorBonusFromTransaction(
    buyerId: $buyer->id,
    transactionAmount: $transaction->amount,
    sponsorPercentage: 5
);
```

### Proses Bonus Pairing Bulanan
```php
// Jalankan setiap bulan atau periode tertentu
$mlmService = app(MLMService::class);

// Flush semua bonus pairing
$results = $mlmService->flushAllPairingBonuses(
    bonusPerPair: 100000,  // Bonus per pasangan
    maxPairs: 10           // Max 10 pair per periode
);

echo "Processed: {$results['processed']} members\n";
echo "Total Pairs: {$results['total_pairs']}\n";
echo "Total Amount: {$results['total_amount']}\n";
```

### Release Bonus ke Ewallet
```php
$mlmService = app(MLMService::class);

// Release semua bonus pending untuk 1 member
$results = $mlmService->releaseAllPendingBonuses($member->id);

echo "Regular Bonus: {$results['regular_bonus']['count']} bonuses, Rp {$results['regular_bonus']['amount']}\n";
echo "Matching Bonus: {$results['matching_bonus']['count']} bonuses, Rp {$results['matching_bonus']['amount']}\n";
echo "Pairing Bonus: {$results['pairing_bonus']['count']} bonuses, Rp {$results['pairing_bonus']['amount']}\n";
echo "Sponsor Bonus: {$results['sponsor_bonus']['count']} bonuses, Rp {$results['sponsor_bonus']['amount']}\n";
echo "Total Amount: Rp {$results['total_amount']}\n";
```

## Important Notes

1. **Transaction Safety**: Semua operasi kritis (registrasi, release bonus) sudah dibungkus dalam database transaction.

2. **Ewallet ID**: Otomatis di-generate saat customer dibuat dengan format `EW-YYYYMMDD-XXXXX`.

3. **Binary Tree Placement**: Menggunakan breadth-first search untuk menemukan posisi kosong terdekat.

4. **Bonus Calculation**: 
   - Regular bonus: Amount dikurangi pajak otomatis
   - Matching: Distribusi ke upline berdasarkan level
   - Pairing: Berdasarkan minimum left/right network
   - Sponsor: Dari registrasi atau transaksi downline

5. **Status Bonus**: 
   - `0` = Pending (belum dirilis)
   - `1` = Released (sudah masuk ewallet)

6. **Level Tracking**: 
   - Binary tree: Track posisi (left/right) dan level
   - Matrix: Track sponsor dan level dari sponsor

## Testing

```php
use App\Models\Manage\Customer;
use App\Services\MLMService;

// Test registrasi dan placement
$sponsor = Customer::factory()->create();
$upline = Customer::factory()->create();

$mlmService = app(MLMService::class);
$result = $mlmService->completeRegistrationFlow(
    customerData: Customer::factory()->raw(),
    sponsorId: $sponsor->id,
    uplineId: $upline->id,
    registrationAmount: 500000
);

$this->assertNotNull($result['customer']);
$this->assertNotNull($result['customer']->ewallet_id);
$this->assertNotNull($result['bonuses']['sponsor']);
```
