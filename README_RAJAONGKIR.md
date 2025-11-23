# RajaOngkir API Migration Notice

## ⚠️ Important: API Endpoint Change

API RajaOngkir lama (`https://api.rajaongkir.com/starter`) **sudah tidak aktif** sejak update terakhir mereka.

### Error yang muncul:
```json
{
  "success": false,
  "code": 410,
  "message": "Endpoint API ini sudah tidak aktif. Silakan migrasi ke platform baru dan lakukan renewal package di https://collaborator.komerce.id."
}
```

## 🔄 Yang Perlu Dilakukan:

1. **Migrasi ke Platform Baru**
   - Kunjungi: https://collaborator.komerce.id
   - Daftar/login menggunakan akun RajaOngkir lama Anda
   - Lakukan renewal package
   - Dapatkan API key baru

2. **Update Konfigurasi**
   - Update file `.env`:
     ```env
     RAJAONGKIR_API_KEY_SHIPPING=your_new_api_key
     RAJAONGKIR_ACCOUNT_TYPE=starter
     RAJAONGKIR_ORIGIN_CITY_ID=151
     ```

3. **Update Base URL** (jika diperlukan)
   - File: `app/Services/RajaOngkirService.php`
   - Sesuaikan `baseUrl` dengan endpoint baru dari documentasi Komerce.id

## 📚 Dokumentasi

- Dokumentasi lama: https://rajaongkir.com/documentation
- Platform baru: https://collaborator.komerce.id
- Untuk pertanyaan: support@komerce.id

## 🛠️ Temporary Solution

Sementara ini, sistem menggunakan data statis untuk provinsi dan kota Indonesia yang umum.
Untuk production, **wajib** mengupdate ke API baru.
