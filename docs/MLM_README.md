# MLM System - Quick Start

Sistem MLM lengkap telah berhasil dibuat dengan fitur:

## ✅ Yang Sudah Dibuat

### Models (8 Models)
1. **Customer** - Model utama dengan auto-generate ewallet_id
2. **CustomerAddress** - Manajemen alamat customer
3. **CustomerNetwork** - Binary tree structure (left/right placement)
4. **CustomerNetworkMatrix** - Matrix structure (sponsor/referral)
5. **CustomerBonus** - Bonus umum dengan kalkulasi pajak
6. **CustomerBonusMatching** - Bonus matching per level sponsor
7. **CustomerBonusPairing** - Bonus pairing dari binary tree
8. **CustomerBonusSponsor** - Bonus sponsor dari downline

### Service Layer
- **MLMService** - Centralized business logic untuk semua operasi MLM

### Factory
- **CustomerFactory** - Factory untuk testing dengan berbagai state

### Documentation & Examples
- **MLM_DOCUMENTATION.md** - Dokumentasi lengkap dengan contoh kode
- **MLMExampleController.php** - Contoh implementasi di controller
- **mlm_quick_test.php** - Script untuk quick testing

## 🚀 Quick Start

### 1. Jalankan Migration
```bash
php artisan migrate
```

### 2. Test dengan Tinker
```bash
php artisan tinker
```

Kemudian di tinker:
```php
include 'mlm_quick_test.php';
```

### 3. Contoh Penggunaan di Code

#### Register Member Baru
```php
use App\Services\MLMService;

$mlmService = app(MLMService::class);

$result = $mlmService->completeRegistrationFlow(
    customerData: [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '081234567890',
        'password' => 'password123',
    ],
    sponsorId: $sponsor->id,
    uplineId: $upline->id,
    registrationAmount: 500000
);

// Customer baru dengan ewallet_id otomatis
$customer = $result['customer'];
echo $customer->ewallet_id; // EW-20251117-ABC12
```

#### Get Network Statistics
```php
$stats = $mlmService->getNetworkStatistics($memberId);

echo "Left Network: {$stats['binary_tree']['left_count']}\n";
echo "Right Network: {$stats['binary_tree']['right_count']}\n";
echo "Total Bonus: Rp {$stats['bonuses']['total_released']}\n";
```

#### Process Transaction Bonuses
```php
// Matching bonus ke upline
$bonuses = $mlmService->processMatchingBonus(
    fromMemberId: $buyer->id,
    amount: 1000000,
    maxLevel: 5,
    levelPercentages: [1 => 10, 2 => 5, 3 => 3, 4 => 2, 5 => 1]
);

// Sponsor bonus
$sponsorBonus = CustomerBonusSponsor::distributeSponsorBonusFromTransaction(
    buyerId: $buyer->id,
    transactionAmount: 1000000,
    sponsorPercentage: 5
);
```

#### Release Bonuses
```php
// Release semua bonus pending
$results = $mlmService->releaseAllPendingBonuses($memberId);

echo "Total Released: Rp {$results['total_amount']}\n";
```

## 📊 Fitur Utama

### Auto-Generate Ewallet ID
Format: `EW-YYYYMMDD-XXXXX`
- Otomatis dibuat saat customer baru
- Unique dan tidak akan duplikat

### Binary Tree Placement
- Otomatis cari posisi kosong terdekat (BFS)
- Support preferred position (left/right)
- Hitung left/right network untuk bonus pairing

### Matrix Network
- Track sponsor/referral chain
- Support unlimited levels
- Untuk bonus matching distribution

### 4 Jenis Bonus
1. **Regular Bonus** - Bonus umum dengan pajak otomatis
2. **Matching Bonus** - Distribusi ke upline berdasarkan level
3. **Pairing Bonus** - Dari pasangan left-right network
4. **Sponsor Bonus** - Dari registrasi/transaksi downline

### Ewallet Management
- Top up saldo
- Deduct saldo (dengan validation)
- Track semua bonus released/pending

## 📚 File Penting

- `/app/Models/Manage/` - Semua models MLM
- `/app/Services/MLMService.php` - Business logic
- `/MLM_DOCUMENTATION.md` - Dokumentasi lengkap
- `/app/Http/Controllers/Examples/MLMExampleController.php` - Contoh implementasi
- `/mlm_quick_test.php` - Quick testing script

## 🔧 Next Steps

1. **Sesuaikan Business Logic**
   - Edit persentase bonus di MLMService
   - Sesuaikan max level, max pairs, dll

2. **Buat UI/Controller**
   - Gunakan MLMExampleController sebagai referensi
   - Buat pages untuk dashboard member, genealogy, dll

3. **Add More Features**
   - Transaction/Order management
   - Withdrawal request
   - Reports & analytics
   - Notifications

4. **Testing**
   - Buat Feature/Unit tests
   - Test edge cases
   - Load testing untuk performance

## 💡 Tips

- Semua operasi kritis sudah wrapped dalam DB transaction
- Bonus calculation bisa disesuaikan di masing-masing model
- Gunakan MLMService untuk consistency
- Check MLM_DOCUMENTATION.md untuk detail lengkap

## 🐛 Troubleshooting

**Ewallet ID tidak ter-generate?**
- Cek model Customer, method `booted()` harus ada
- Pastikan tidak override attribute ewallet_id saat create

**Placement error?**
- Pastikan upline_id valid
- Cek apakah binary tree sudah terlalu deep
- Gunakan `findAvailablePosition()` untuk cek posisi

**Bonus tidak masuk ewallet?**
- Pastikan status bonus = 0 (pending)
- Call `release()` method untuk setiap bonus
- Atau gunakan `releaseAllPendingBonuses()` dari MLMService

---

**Ready to use!** 🎉

Semua model dan fungsi sudah siap digunakan. Tinggal sesuaikan business logic dan buat UI sesuai kebutuhan.
