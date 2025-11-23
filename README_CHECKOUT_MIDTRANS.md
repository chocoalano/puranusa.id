# Implementasi Checkout dengan Midtrans Payment Gateway

## Overview
Fitur checkout ini mengintegrasikan pembayaran menggunakan Midtrans Snap untuk proses pembelian produk langsung (Buy Now).

## Komponen yang Dibuat

### 1. Backend

#### CheckoutController (`app/Http/Controllers/Ecommerce/CheckoutController.php`)
Controller untuk menangani proses checkout dengan tiga method utama:

- **`process()`**: Memproses checkout order
  - Validasi data produk, shipping, dan customer
  - Membuat record `Order` dan `OrderItem`
  - Membuat/update `CustomerAddress`
  - Generate Midtrans Snap token
  - Return snap_token ke frontend
  
- **`callback()`**: Webhook untuk notifikasi dari Midtrans
  - Menerima notifikasi status pembayaran
  - Update status order (PENDING → PAID/CANCELED)
  - Reduce product stock saat pembayaran berhasil
  - **Process MLM bonuses untuk customer yang merupakan downline**
  - Log semua notifikasi di `applied_promos['payment']['midtrans_notifications']`

- **`processMlmBonuses()`**: Private method untuk distribusi bonus MLM
  - Check apakah customer memiliki sponsor (adalah downline)
  - Distribusi Sponsor Bonus (5%) ke sponsor langsung
  - Distribusi Matching Bonus ke upline level 1-5 (10%, 5%, 3%, 2%, 1%)
  - Log semua bonus yang dibuat di `applied_promos['mlm_bonuses']`
  - Error di-log tapi tidak throw exception (order tetap sukses)

- **`finish()`**: Halaman redirect setelah pembayaran
  - Menampilkan pesan sukses/error
  - Redirect ke beranda dengan flash message

#### CustomerAddress Model (`app/Models/CustomerAddress.php`)
Model untuk menyimpan alamat pengiriman customer dengan:
- Mass assignable fields untuk semua kolom alamat
- Cast untuk `is_default`, `province_id`, `city_id`
- Relasi `belongsTo` ke `Customer`

### 2. Frontend

#### CheckoutSheet.vue (Updated)
Komponen checkout sheet yang sudah diupdate untuk integrasi Midtrans:

- **Import axios**: Untuk HTTP request ke `/checkout/process`
- **`handleCheckout()` diubah ke async function**:
  1. Validasi form
  2. Check Midtrans Snap loaded (`window.snap`)
  3. POST data ke `/checkout/process`
  4. Terima `snap_token` dari response
  5. Close checkout sheet
  6. Open Midtrans Snap modal dengan `snap.pay()`
  7. Handle callbacks: `onSuccess`, `onPending`, `onError`, `onClose`
  8. Redirect ke `/checkout/finish?order_no=XXX` setelah pembayaran

### 3. Routes (`routes/Ecommerce/shop.php`)

```php
// Checkout routes (require authentication)
Route::middleware(['client.auth'])->group(function () {
    Route::post('/checkout/process', [CheckoutController::class, 'process']);
    Route::get('/checkout/finish', [CheckoutController::class, 'finish']);
});

// Midtrans Checkout Callback (Public)
Route::post('/checkout/midtrans/notification', [CheckoutController::class, 'callback']);
```

## Flow Checkout

### User Journey
1. User klik tombol "Beli Sekarang" di halaman produk
2. CheckoutSheet terbuka dengan data produk
3. User mengisi data pengiriman (nama, phone, alamat, provinsi, kota, kode pos)
4. User memilih ekspedisi dan service pengiriman
5. User klik "Lanjutkan ke Pembayaran"
6. CheckoutSheet memanggil `/checkout/process`
7. Backend create order dan generate Midtrans Snap token
8. Frontend membuka Midtrans Snap modal
9. User memilih metode pembayaran dan bayar
10. Midtrans kirim notifikasi ke `/checkout/midtrans/notification`
11. Backend update status order
12. **Backend process MLM bonuses (Sponsor & Matching)**
13. User di-redirect ke halaman finish dengan pesan sukses

### Data Flow

```
CheckoutSheet (Frontend)
    ↓ POST /checkout/process
CheckoutController::process()
    ↓ Validate & Create Order
    ↓ Generate Snap Token
    ↓ Return { snap_token, order_no }
CheckoutSheet receives snap_token
    ↓ snap.pay(snap_token, callbacks)
Midtrans Snap Modal (User pays)
    ↓ Payment notification
CheckoutController::callback()
    ↓ Update order status
    ↓ Reduce product stock (if paid)
    ↓ Process MLM Bonuses:
       - Sponsor Bonus (5% to direct sponsor)
       - Matching Bonus (10%, 5%, 3%, 2%, 1% to upline levels 1-5)
User redirected to /checkout/finish
```

## Database Schema

### Orders
- `order_no`: Unique order number (ORD-YYYYMMDD-XXXXXX)
- `customer_id`: FK to customers
- `status`: PENDING | PAID | CANCELED | etc.
- `subtotal_amount`, `discount_amount`, `shipping_amount`, `tax_amount`, `grand_total`
- `shipping_address_id`, `billing_address_id`: FK to customer_addresses
- `applied_promos`: JSON field untuk shipping info dan payment tracking
- `notes`: Catatan dari customer
- `placed_at`, `paid_at`: Timestamps

### Order Items
- `order_id`: FK to orders
- `product_id`: FK to products
- `name`, `sku`: Product info snapshot
- `qty`, `unit_price`, `row_total`
- `weight_gram`: Berat produk untuk shipping
- `meta_json`: Additional data (image, etc.)

### Customer Addresses
- `customer_id`: FK to customers
- `label`, `is_default`: Address label dan default flag
- `recipient_name`, `recipient_phone`: Penerima paket
- `address_line1`, `address_line2`: Alamat lengkap
- `province_label`, `province_id`: Provinsi
- `city_label`, `city_id`: Kota/Kabupaten
- `postal_code`, `country`: Kode pos dan negara

## Midtrans Configuration

### Environment Variables (`.env`)
```env
MIDTRANS_SERVER_KEY=your-server-key
MIDTRANS_CLIENT_KEY=your-client-key
MIDTRANS_IS_PRODUCTION=false
MIDTRANS_MERCHANT_ID=your-merchant-id
```

### Config File (`config/midtrans.php`)
```php
return [
    'server_key' => env('MIDTRANS_SERVER_KEY'),
    'client_key' => env('MIDTRANS_CLIENT_KEY'),
    'is_production' => (bool) env('MIDTRANS_IS_PRODUCTION', false),
    'is_sanitized' => true,
    'is_3ds' => true,
];
```

### Snap JS Loading (`resources/views/app.blade.php`)
```html
@if(config('midtrans.is_production'))
    <script src="https://app.midtrans.com/snap/snap.js" 
            data-client-key="{{ config('midtrans.client_key') }}" 
            onload="window.dispatchEvent(new Event('midtrans:snap:loaded'))"></script>
@else
    <script src="https://app.sandbox.midtrans.com/snap/snap.js" 
            data-client-key="{{ config('midtrans.client_key') }}" 
            onload="window.dispatchEvent(new Event('midtrans:snap:loaded'))"></script>
@endif
```

## Testing Checkout

### Sandbox Mode (Development)
1. Pastikan `MIDTRANS_IS_PRODUCTION=false`
2. Gunakan test credit card dari Midtrans:
   - Card Number: `4811 1111 1111 1114`
   - Expiry: Any future date
   - CVV: `123`
   - OTP: `112233`

### Production Mode
1. Set `MIDTRANS_IS_PRODUCTION=true`
2. Update Server Key dan Client Key production
3. Setup Midtrans notification URL:
   - URL: `https://yourdomain.com/checkout/midtrans/notification`
   - Method: POST
   - Configure di dashboard Midtrans

## MLM Bonus Integration

### Automatic Bonus Distribution
Ketika order berhasil dibayar (status PAID), sistem otomatis mendistribusikan bonus MLM jika customer adalah downline dari member lain.

### Jenis Bonus

#### 1. Sponsor Bonus (5%)
- Diberikan kepada sponsor langsung (direct upline di matrix)
- Bonus = 5% dari `subtotal_amount` order
- Dibuat menggunakan `CustomerBonusSponsor::distributeSponsorBonusFromTransaction()`
- Status = 0 (pending), perlu release manual ke ewallet

#### 2. Matching Bonus (Multi-level)
- Diberikan kepada upline di matrix sampai level 5
- Persentase per level:
  * Level 1: 10% dari subtotal
  * Level 2: 5% dari subtotal
  * Level 3: 3% dari subtotal
  * Level 4: 2% dari subtotal
  * Level 5: 1% dari subtotal
- Dibuat menggunakan `MLMService::processMatchingBonus()`
- Status = 0 (pending), perlu release manual ke ewallet

### Bonus Tracking
Semua bonus yang dibuat dicatat di field `applied_promos` pada order:

```json
{
    "shipping": { ... },
    "payment": { ... },
    "mlm_bonuses": {
        "sponsor": {
            "bonus_id": 123,
            "sponsor_id": 45,
            "sponsor_name": "John Doe",
            "amount": 50000,
            "created_at": "2025-11-20T10:30:00+07:00"
        },
        "matching": [
            {
                "bonus_id": 124,
                "member_id": 45,
                "level": 1,
                "amount": 100000
            },
            {
                "bonus_id": 125,
                "member_id": 40,
                "level": 2,
                "amount": 50000
            }
        ]
    }
}
```

### Kondisi Bonus MLM
- Bonus HANYA diproses jika customer memiliki sponsor/upline
- Bonus dibuat dengan status = 0 (pending)
- Admin perlu release bonus secara manual atau terjadwal
- Error pada proses bonus tidak menggagalkan order (logged only)

### Release Bonus
Untuk release bonus pending ke ewallet customer, gunakan:

```php
$mlmService = app(\App\Services\MLMService::class);
$results = $mlmService->releaseAllPendingBonuses($memberId);
```

Atau release per jenis bonus di panel admin bonus commission.

## Security Notes

1. **Webhook Validation**: Midtrans callback menggunakan signature verification
2. **CSRF Protection**: POST routes protected dengan CSRF middleware
3. **Authentication**: Checkout routes require `client.auth` middleware
4. **Stock Management**: Product stock hanya di-reduce saat status PAID
5. **Order Verification**: Order no dan customer_id divalidasi sebelum update

## Error Handling

### Frontend
- Check Snap loaded sebelum payment: `window.snap`
- Alert user jika Snap belum ready
- Handle payment error dengan `onError` callback
- Handle user close modal dengan `onClose` callback

### Backend
- Transaction rollback jika error saat create order
- Log semua error dengan context lengkap
- Return JSON error response dengan message yang jelas
- Validate product stock sebelum create order

## Future Improvements

1. **Cart Checkout**: Support checkout dari cart (multiple items)
2. **Payment Method Selection**: Biarkan user pilih payment method sebelum Snap
3. **Order History**: Halaman untuk melihat riwayat order
4. **Order Tracking**: Integrasi dengan shipping API untuk tracking
5. **Email Notification**: Send email confirmation setelah payment sukses
6. **Invoice Generation**: Auto-generate PDF invoice
7. **Promo Code**: Support discount dengan promo code
8. **Loyalty Points**: Integrasi dengan sistem poin/reward

## Dependencies

- **Laravel 11**: Backend framework
- **Inertia.js**: Frontend framework
- **Vue 3**: UI components
- **Midtrans PHP SDK v2.6**: Payment gateway
- **Axios**: HTTP client untuk API calls
- **RajaOngkir API v2**: Shipping cost calculation

## Related Files

- `/app/Http/Controllers/Ecommerce/CheckoutController.php`
- `/app/Models/CustomerAddress.php`
- `/app/Models/Order.php`
- `/app/Models/OrderItem.php`
- `/resources/js/components/ecommerce/checkout/CheckoutSheet.vue`
- `/resources/js/components/ecommerce/product/ProductActions.vue`
- `/routes/Ecommerce/shop.php`
- `/config/midtrans.php`
- `/resources/views/app.blade.php`
