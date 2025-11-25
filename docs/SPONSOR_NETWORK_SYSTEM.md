# Sponsor Network System

## Overview
Sistem sponsor/referral network yang memungkinkan customer untuk merekrut member baru menggunakan kode referral dan melihat daftar passive members di profile mereka.

## Cara Kerja

### 1. Registrasi dengan Kode Referral
Ketika customer baru mendaftar dengan menggunakan `ref_code`:

```
https://domain.com/client/register?ref=REF-XXXXXXXX
```

Sistem akan:
- Membuat akun customer baru
- Mencari sponsor berdasarkan `ref_code`
- Menambahkan entry ke `customer_network_matrixes` dengan `sponsor_id` yang sesuai
- Menempatkan member ke binary tree (jika sponsor ada)

### 2. Tabel Database

#### `customer_network_matrixes`
Tabel ini menyimpan **sponsor relationship** (siapa yang merekrut siapa):

```sql
- id
- member_id (customer yang direkrut)
- sponsor_id (customer yang merekrut) 
- level (level dalam sponsor hierarchy)
- description
- created_at, updated_at
```

#### `customer_networks`
Tabel ini menyimpan **binary tree placement** (posisi di pohon binary):

```sql
- id
- member_id
- upline_id
- position (left/right)
- level
- status
- created_at, updated_at
```

### 3. Jenis Member

#### Active Members
- Customer yang sudah ditempatkan di binary tree
- `networkPosition !== null`
- Sudah memiliki posisi (left/right) dan level

#### Passive Members  
- Customer yang mendaftar menggunakan ref_code sponsor
- Ada di `customer_network_matrixes` sebagai downline sponsor
- Belum ditempatkan di binary tree (`networkPosition === null`)
- **Ini adalah daftar member yang meregister pakai kode referral Anda**

#### Prospect Members
- Subset dari Passive Members
- Customer yang baru bergabung dalam 30 hari terakhir
- Belum ditempatkan di binary tree

## Implementasi

### LogRegController.php
```php
// Saat register, sistem akan:
1. Create customer
2. Add to matrix dengan sponsor_id (jika ada ref_code)
3. Place to binary tree (optional, bisa ditunda)
```

### ProfileController.php
```php
// Mengambil data dari matrix downlines
$allDownlines = $customer->matrixDownlines()
    ->with(['member.orders', 'member.networkPosition'])
    ->get()
    ->pluck('member')
    ->filter();

// Filter berdasarkan networkPosition
- Active: networkPosition !== null
- Passive: networkPosition === null  
- Prospect: networkPosition === null + created < 30 days
```

### NetworkMembersTab.vue
Menampilkan 3 tab:
1. **Aktif** - Member yang sudah di binary tree
2. **Pasif** - Member yang register pakai ref_code tapi belum di tree
3. **Prospek** - Member baru (< 30 hari) yang belum di tree

## Flow Diagram

```
Customer Register (dengan ref_code)
    ↓
[customer_network_matrixes] ← Sponsor relationship created
    ↓
[customer_networks] ← Binary tree placement (optional)
    ↓
Profile → Passive Members List
    ↓
(Setelah placement ke binary tree)
    ↓
Profile → Active Members List
```

## Testing

Test tersedia di: `tests/Feature/SponsorNetworkTest.php`

- ✅ Register dengan referral code
- ✅ Sponsor dapat melihat passive members
- ✅ Passive member menjadi active setelah placement
- ✅ Register tanpa ref_code
- ✅ Prospect members filtering

## Keuntungan Sistem Ini

1. **Tracking Lengkap**: Sponsor tahu siapa saja yang register pakai kode mereka
2. **Flexible Placement**: Member bisa didaftarkan dulu (passive) baru ditempatkan ke tree kemudian
3. **Clear Separation**: Sponsor relationship (matrix) terpisah dari binary tree placement (network)
4. **Recruitment Metrics**: Mudah tracking jumlah recruitment vs placement

## Catatan Penting

- **Passive Members** = Member yang recruit pakai ref_code Anda, tapi belum masuk binary tree
- **Active Members** = Member yang sudah ada di binary tree (bisa dari ref_code Anda atau ditempatkan oleh system)
- Satu customer bisa punya sponsor (matrix) tapi belum punya upline (binary tree)
- Matrix relationship bersifat permanent, binary tree placement bisa diatur ulang

## Fitur Add to Binary Tree

### Overview
Sponsor dapat menempatkan passive members ke binary tree mereka dengan memilih posisi (left/right).

### UI Flow
1. Sponsor melihat daftar passive members di tab "Pasif"
2. Klik button "Tempatkan ke Binary" pada member yang ingin ditempatkan
3. Dialog muncul dengan pilihan posisi: Left atau Right
4. Pilih posisi yang diinginkan
5. Klik "Tempatkan" untuk konfirmasi
6. Member akan pindah dari tab "Pasif" ke tab "Aktif"

### Backend Validation
```php
ProfileController::placeMember()
- Validasi member_id dan position
- Cek member ada di database
- Cek member belum ditempatkan sebelumnya
- Cek member adalah downline sponsor di matrix
- Validasi posisi belum terisi
- Create entry di customer_networks
```

### Error Handling
- Member tidak ditemukan
- Member sudah ditempatkan
- Member bukan bagian dari jaringan sponsor
- Posisi yang dipilih sudah terisi

### Test Coverage
- ✅ Sponsor dapat place passive member
- ✅ Tidak bisa place ke posisi yang sudah terisi
- ✅ Tidak bisa place member yang bukan downline sponsor
- ✅ Member berhasil pindah dari passive ke active

### API Endpoint
```
POST /client/profile/place-member
Body: {
  member_id: integer,
  position: 'left' | 'right'
}
```

