# Fitur Checkout dengan Seleksi Produk

## Overview
Implementasi fitur checkout yang terintegrasi dengan CheckoutSheet component, memungkinkan user untuk memilih produk mana saja yang ingin di-checkout dari dropdown keranjang belanja.

## Fitur Utama

### 1. Checkbox Selection di Cart Dropdown
- Setiap item di cart memiliki checkbox untuk seleksi
- "Select All" checkbox di header untuk memilih/unselect semua item
- Visual indicator untuk item yang dipilih

### 2. Dynamic Summary
- Total semua item di cart
- Total item yang dipilih (selected items)
- Counter jumlah item yang dipilih

### 3. Smart Checkout
- **Single Item**: Membuka CheckoutSheet untuk checkout langsung
- **Multiple Items**: Redirect ke halaman `/checkout?items={ids}` untuk checkout multiple items
- Tombol checkout disabled jika tidak ada item yang dipilih

### 4. Data Integration
- Cart items sekarang include field `weight` untuk shipping calculation
- Semua data cart termasuk: id, product_id, name, slug, image, price, quantity, weight

## Cara Penggunaan

1. **Buka Cart Dropdown**
   - Klik icon shopping cart di header
   - Akan muncul list produk di keranjang

2. **Pilih Produk untuk Checkout**
   - Centang checkbox pada produk yang ingin di-checkout
   - Atau gunakan "Select All" untuk memilih semua produk
   - Lihat summary harga produk yang dipilih

3. **Proses Checkout**
   - Klik tombol "Checkout" 
   - Untuk 1 produk: CheckoutSheet akan terbuka
   - Untuk >1 produk: Redirect ke halaman checkout

## Technical Details

### Frontend Components
- **Location**: `resources/js/layouts/store/Ecommerce.vue`
- **Dependencies**: 
  - CheckoutSheet component
  - Checkbox component dari shadcn-vue
  - Inertia.js shared props

### State Management
```typescript
const selectedCartItems = ref<Set<number>>(new Set());
const checkoutItems = ref<CartItem[]>([]);
const checkoutSheetOpen = ref(false);
```

### Key Functions
- `toggleCartItemSelection(itemId)`: Toggle individual item
- `toggleSelectAll()`: Select/unselect all items
- `handleCheckout()`: Process checkout based on selection

### Backend Updates
- **Location**: `app/Http/Middleware/HandleInertiaRequests.php`
- **Changes**: Added `weight` field to cart items data
- **Default weight**: 500g if product weight not set

## Next Steps (Future Enhancement)

1. Create dedicated multi-item checkout page (`/checkout`)
2. Support multiple shipping addresses
3. Bulk actions (delete selected items)
4. Save selection state across page reloads
5. Add animation for checkbox interactions

## Testing Checklist

- [ ] Checkbox berfungsi untuk select/unselect item
- [ ] Select All checkbox berfungsi dengan benar
- [ ] Summary total harga terupdate sesuai selection
- [ ] Tombol checkout disabled saat tidak ada item dipilih
- [ ] CheckoutSheet terbuka untuk single item
- [ ] Redirect ke /checkout untuk multiple items
- [ ] Weight data tersedia untuk shipping calculation
- [ ] Mobile responsive

1. Customer beli produk (direct/cart checkout)
   ↓
2. System hitung bonus dari Product fields × quantity
   bv_amount, sponsor_amount, match_amount, pairing_amount, cashback_amount
   ↓
3. Order created dengan bonus amounts
   ↓
4. Payment PAID (wallet atau Midtrans)
   ↓
5. processMlmBonuses() triggered:
   
   a) Sponsor Bonus (b_sponsor):
      → Langsung ke sponsor wallet
      → CustomerBonusSponsor record created
   
   b) Matching Bonus (b_matching):
      → Distribute ke upline matrix (level 1-5)
      → Persentase: 40%, 30%, 15%, 10%, 5%
      → CustomerBonusMatching records created
   
   c) Pairing Bonus (b_pairing):
      → Queued untuk binary pairing
      → Processed by cron job
   
   d) Cashback (b_cashback):
      → Langsung ke customer wallet
      → Transaction record created
   
6. Stock reduced & cart cleared
