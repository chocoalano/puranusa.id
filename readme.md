# ZENNER CLUB - Perancangan Schema Database

> Dokumentasi ini menjelaskan tabel-tabel baru yang dibutuhkan untuk fitur **ZENNER CLUB**.
> Semua tabel dirancang untuk **berelasi dengan model & tabel yang sudah ada** (`customers`, `products`, `product_reviews`, `customer_bonuses`, `rewards`, `orders`, `settings`, dll) **tanpa mengubah struktur tabel maupun model yang sudah ada**.

---

## Daftar Fitur & Pemetaan Tabel

| # | Fitur | Tabel Baru | Relasi ke Tabel Existing |
|---|-------|-----------|--------------------------|
| 1 | Welcome Video | `zc_contents` | - |
| 2 | Join Medsos | `zc_contents` | - |
| 3 | Marketing Kit | `zc_materials` | - |
| 4 | Copywriting | `zc_materials` | - |
| 5 | Foto dan Video | `zc_materials` | - |
| 6 | Procure Produk & Insentif | - (query) | `products`, `rewards` |
| 7 | Testimoni Produk | - (existing) | `product_reviews` |
| 8 | Zenner Academy | `zc_courses`, `zc_lessons` | - |
| 9 | Skema Insentif Program | `zc_contents` | `rewards`, `customer_package` |
| 10 | Produk Knowledge | `zc_lessons` | `products` |
| 11 | Cara Jualan (Organik) | `zc_courses`, `zc_lessons` | - |
| 12 | Cara Iklan (Ads) | `zc_courses`, `zc_lessons` | - |
| 13 | Webinar & Online Training | `zc_events` | - |
| 14 | Leaderboard | `zc_leaderboards` | `customers`, `customer_bonuses` |
| 15 | Sertifikat Program | `zc_certificates` | `customers`, `zc_courses` |
| 16 | Monthly Challenge | `zc_challenges`, `zc_challenge_participants` | `customers` |
| 17 | Top Affiliate | - (computed) | `customers`, `customer_bonus_sponsors` |
| 18 | Hall of Fame | `zc_hall_of_fame` | `customers`, `zc_challenges` |

---

## Schema Tabel Baru

### 1. `zc_contents` - Konten Umum (Welcome Video, Medsos, Skema Insentif)

Menyimpan konten statis/dinamis yang ditampilkan di berbagai section Zenner Club.

```
zc_contents
├── id                  BIGINT UNSIGNED, PK, AUTO_INCREMENT
├── section             VARCHAR(50), INDEX
│                       enum: 'welcome_video','social_media','incentive_scheme','general'
├── title               VARCHAR(255)
├── slug                VARCHAR(255), UNIQUE
├── body                TEXT, NULLABLE
│                       (HTML/markdown content, embed link video, dsb)
├── metadata            JSON, NULLABLE
│                       (data fleksibel: url video, autoplay flag, social links, dsb)
│                       Contoh welcome_video: {"video_url":"...","autoplay":true}
│                       Contoh social_media: {"platform":"instagram","api_url":"...","handle":"@puranusa"}
├── sort_order          INT, DEFAULT 0
├── is_active           BOOLEAN, DEFAULT true
├── created_at          TIMESTAMP
└── updated_at          TIMESTAMP
```

**Contoh data:**

| section | title | metadata |
|---------|-------|----------|
| `welcome_video` | Selamat Datang di Zenner Club | `{"video_url":"https://...","autoplay":true}` |
| `social_media` | Instagram | `{"platform":"instagram","api_url":"https://graph.instagram.com/...","handle":"@puranusa"}` |
| `social_media` | TikTok | `{"platform":"tiktok","api_url":"...","handle":"@puranusa"}` |
| `incentive_scheme` | Skema Bonus 2025 | `{"image_url":"..."}` |

---

### 2. `zc_materials` - Marketing Kit, Copywriting, Foto & Video

Menyimpan file-file marketing yang bisa diunduh/dilihat oleh member.

```
zc_materials
├── id                  BIGINT UNSIGNED, PK, AUTO_INCREMENT
├── category            VARCHAR(50), INDEX
│                       enum: 'marketing_kit','copywriting','photo','video'
├── title               VARCHAR(255)
├── description         TEXT, NULLABLE
├── file_path           VARCHAR(500)
│                       (path file di storage)
├── file_type           VARCHAR(20)
│                       (image/png, video/mp4, application/pdf, dsb)
├── file_size           BIGINT UNSIGNED, NULLABLE
│                       (ukuran file dalam bytes)
├── thumbnail_path      VARCHAR(500), NULLABLE
├── metadata            JSON, NULLABLE
│                       (dimensi gambar, durasi video, dsb)
├── download_count      INT UNSIGNED, DEFAULT 0
├── sort_order          INT, DEFAULT 0
├── is_active           BOOLEAN, DEFAULT true
├── created_at          TIMESTAMP
└── updated_at          TIMESTAMP
```

---

### 3. `zc_courses` - Zenner Academy (Kursus/Modul)

```
zc_courses
├── id                  BIGINT UNSIGNED, PK, AUTO_INCREMENT
├── title               VARCHAR(255)
├── slug                VARCHAR(255), UNIQUE
├── description         TEXT, NULLABLE
├── category            VARCHAR(50), INDEX
│                       enum: 'product_knowledge','selling_organic','selling_ads','general'
├── cover_image         VARCHAR(500), NULLABLE
├── total_lessons       INT UNSIGNED, DEFAULT 0
├── sort_order          INT, DEFAULT 0
├── is_active           BOOLEAN, DEFAULT true
├── created_at          TIMESTAMP
└── updated_at          TIMESTAMP
```

---

### 5. `zc_lessons` - Materi/Pelajaran per Kursus

```
zc_lessons
├── id                  BIGINT UNSIGNED, PK, AUTO_INCREMENT
├── course_id           BIGINT UNSIGNED, FK → zc_courses(id) ON DELETE CASCADE
├── product_id          BIGINT UNSIGNED, NULLABLE, FK → products(id) ON DELETE SET NULL
│                       (jika lesson terkait produk tertentu, untuk Produk Knowledge)
├── title               VARCHAR(255)
├── slug                VARCHAR(255)
├── body                TEXT, NULLABLE
│                       (konten HTML/markdown)
├── video_url           VARCHAR(500), NULLABLE
├── duration_minutes    INT UNSIGNED, NULLABLE
├── attachments         JSON, NULLABLE
│                       (array of file paths)
├── sort_order          INT, DEFAULT 0
├── is_active           BOOLEAN, DEFAULT true
├── created_at          TIMESTAMP
└── updated_at          TIMESTAMP

UNIQUE(course_id, slug)
```

**Relasi:**
- `course_id` → `zc_courses.id`
- `product_id` → `products.id` (opsional, untuk konten product knowledge)

---

### 6. `zc_events` - Webinar & Online Training

```
zc_events
├── id                  BIGINT UNSIGNED, PK, AUTO_INCREMENT
├── title               VARCHAR(255)
├── slug                VARCHAR(255), UNIQUE
├── description         TEXT, NULLABLE
├── type                VARCHAR(30), INDEX
│                       enum: 'webinar','training','workshop'
├── speaker             VARCHAR(255), NULLABLE
├── cover_image         VARCHAR(500), NULLABLE
├── meeting_url         VARCHAR(500), NULLABLE
│                       (Zoom/Google Meet link)
├── start_at            DATETIME
├── end_at              DATETIME, NULLABLE
├── max_participants    INT UNSIGNED, NULLABLE
├── is_active           BOOLEAN, DEFAULT true
├── created_at          TIMESTAMP
└── updated_at          TIMESTAMP
```

---

### 7. `zc_event_registrations` - Registrasi Peserta Event

```
zc_event_registrations
├── id                  BIGINT UNSIGNED, PK, AUTO_INCREMENT
├── event_id            BIGINT UNSIGNED, FK → zc_events(id) ON DELETE CASCADE
├── customer_id         BIGINT UNSIGNED, FK → customers(id) ON DELETE CASCADE
├── status              VARCHAR(20), DEFAULT 'registered'
│                       enum: 'registered','attended','absent'
├── registered_at       TIMESTAMP
└── attended_at         TIMESTAMP, NULLABLE

UNIQUE(event_id, customer_id)
```

**Relasi:**
- `customer_id` → `customers.id`
- `event_id` → `zc_events.id`

---

### 8. `zc_leaderboards` - Leaderboard (Snapshot Periodik)

Menyimpan snapshot ranking member. Data dihitung dari tabel existing (`customers`, bonus tables, `orders`).

```
zc_leaderboards
├── id                  BIGINT UNSIGNED, PK, AUTO_INCREMENT
├── customer_id         BIGINT UNSIGNED, FK → customers(id) ON DELETE CASCADE
├── period              VARCHAR(7), INDEX
│                       (format: 'YYYY-MM', contoh: '2025-06')
├── type                VARCHAR(30), INDEX
│                       enum: 'top_sponsor','top_pairing','top_omzet','top_recruit'
├── rank                INT UNSIGNED
├── score               DECIMAL(15,2), DEFAULT 0
│                       (jumlah bonus/omzet/recruit sesuai type)
├── metadata            JSON, NULLABLE
│                       (detail tambahan)
├── created_at          TIMESTAMP
└── updated_at          TIMESTAMP

UNIQUE(customer_id, period, type)
```

**Relasi & Sumber Data:**
- `customer_id` → `customers.id`
- Score dihitung dari:
  - `top_sponsor` → `SUM(customer_bonus_sponsors.amount)` per period
  - `top_pairing` → `SUM(customer_bonus_pairings.amount)` per period
  - `top_omzet` → `SUM(orders.grand_total)` per period
  - `top_recruit` → `COUNT(customers WHERE sponsor_id = ?)` per period

---

### 9. `zc_challenges` - Monthly Challenge

```
zc_challenges
├── id                  BIGINT UNSIGNED, PK, AUTO_INCREMENT
├── title               VARCHAR(255)
├── slug                VARCHAR(255), UNIQUE
├── description         TEXT, NULLABLE
├── rules               TEXT, NULLABLE
│                       (syarat dan ketentuan challenge)
├── reward_description  TEXT, NULLABLE
│                       (deskripsi hadiah)
├── reward_value        DECIMAL(15,2), NULLABLE
├── target_type         VARCHAR(30)
│                       enum: 'omzet','recruit','sponsor_bonus','pairing_bonus','order_count'
├── target_value        DECIMAL(15,2)
│                       (target yang harus dicapai)
├── start_date          DATE
├── end_date            DATE
├── is_active           BOOLEAN, DEFAULT true
├── created_at          TIMESTAMP
└── updated_at          TIMESTAMP
```

---

### 10. `zc_challenge_participants` - Peserta Challenge

```
zc_challenge_participants
├── id                  BIGINT UNSIGNED, PK, AUTO_INCREMENT
├── challenge_id        BIGINT UNSIGNED, FK → zc_challenges(id) ON DELETE CASCADE
├── customer_id         BIGINT UNSIGNED, FK → customers(id) ON DELETE CASCADE
├── current_value       DECIMAL(15,2), DEFAULT 0
│                       (progress saat ini, dihitung dari data existing)
├── is_completed        BOOLEAN, DEFAULT false
├── is_winner           BOOLEAN, DEFAULT false
├── completed_at        TIMESTAMP, NULLABLE
├── created_at          TIMESTAMP
└── updated_at          TIMESTAMP

UNIQUE(challenge_id, customer_id)
```

**Relasi:**
- `customer_id` → `customers.id`
- `current_value` dihitung berdasarkan `target_type` dari tabel existing:
  - `omzet` → `SUM(orders.grand_total)` dalam periode challenge
  - `recruit` → `COUNT(customers WHERE sponsor_id = ?)` dalam periode
  - `sponsor_bonus` → `SUM(customer_bonus_sponsors.amount)` dalam periode
  - `pairing_bonus` → `SUM(customer_bonus_pairings.amount)` dalam periode
  - `order_count` → `COUNT(orders)` dalam periode

---

### 11. `zc_certificates` - Sertifikat Program

```
zc_certificates
├── id                  BIGINT UNSIGNED, PK, AUTO_INCREMENT
├── customer_id         BIGINT UNSIGNED, FK → customers(id) ON DELETE CASCADE
├── certifiable_type    VARCHAR(255)
│                       (morph: 'App\Models\ZennerClub\ZcCourse', 'App\Models\ZennerClub\ZcEvent', dsb)
├── certifiable_id      BIGINT UNSIGNED
├── certificate_no      VARCHAR(50), UNIQUE
│                       (nomor sertifikat unik, e.g. 'ZC-CERT-2025-00001')
├── issued_at           DATE
├── file_path           VARCHAR(500), NULLABLE
│                       (path PDF sertifikat yang di-generate)
├── metadata            JSON, NULLABLE
├── created_at          TIMESTAMP
└── updated_at          TIMESTAMP

INDEX(certifiable_type, certifiable_id)
```

**Relasi:**
- `customer_id` → `customers.id`
- Polymorphic: bisa terkait ke `zc_courses` atau `zc_events`

---

### 12. `zc_hall_of_fame` - Hall of Fame (Pemenang Sebelumnya)

```
zc_hall_of_fame
├── id                  BIGINT UNSIGNED, PK, AUTO_INCREMENT
├── customer_id         BIGINT UNSIGNED, FK → customers(id) ON DELETE CASCADE
├── challenge_id        BIGINT UNSIGNED, NULLABLE, FK → zc_challenges(id) ON DELETE SET NULL
├── title               VARCHAR(255)
│                       (judul pencapaian, e.g. "Top Affiliate Juni 2025")
├── description         TEXT, NULLABLE
├── achievement_type    VARCHAR(50), INDEX
│                       enum: 'monthly_challenge','top_affiliate','special_award'
├── period              VARCHAR(7), NULLABLE
│                       (format: 'YYYY-MM')
├── photo_path          VARCHAR(500), NULLABLE
├── score               DECIMAL(15,2), NULLABLE
├── created_at          TIMESTAMP
└── updated_at          TIMESTAMP
```

**Relasi:**
- `customer_id` → `customers.id`
- `challenge_id` → `zc_challenges.id` (opsional)

---

## Entity Relationship Diagram (Tekstual)

```
┌─────────────────────────────────────────────────────────────────┐
│                      TABEL EXISTING (TIDAK DIUBAH)              │
│                                                                 │
│  customers ─── customer_bonus_sponsors                          │
│      │     ─── customer_bonus_pairings                          │
│      │     ─── customer_bonus_matchings                         │
│      │     ─── customer_bonus_cashbacks                         │
│      │     ─── orders ─── order_items                           │
│      │     ─── customer_package                                 │
│      │                                                          │
│  products ─── product_reviews                                   │
│  rewards                                                        │
│  settings                                                       │
└──────────┬──────────────────────────────┬───────────────────────┘
           │ FK references                │
           ▼                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   TABEL BARU ZENNER CLUB                        │
│                                                                 │
│  zc_contents          (welcome video, medsos, skema insentif)   │
│  zc_materials         (marketing kit, copywriting, foto, video) │
│                                                                 │
│  zc_courses                                                     │
│      └── zc_lessons ─→ products.id (opsional)                   │
│                                                                 │
│  zc_events                                                      │
│      └── zc_event_registrations ──→ customers.id                │
│                                                                 │
│  zc_leaderboards ────→ customers.id                             │
│      (data dari: customer_bonus_*, orders)                      │
│                                                                 │
│  zc_challenges                                                  │
│      └── zc_challenge_participants ──→ customers.id             │
│          (progress dari: orders, customer_bonus_*)              │
│                                                                 │
│  zc_certificates ────→ customers.id (polymorphic → course/event)│
│                                                                 │
│  zc_hall_of_fame ────→ customers.id, zc_challenges.id           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Fitur yang TIDAK Membutuhkan Tabel Baru

Beberapa fitur dapat diimplementasikan langsung dengan **query ke tabel existing**:

| Fitur | Implementasi |
|-------|-------------|
| **Testimoni Produk** | Menggunakan tabel `product_reviews` yang sudah ada (relasi `products` → `product_reviews`) |
| **Procure Produk & Insentif** | Query `products` (aktif) + `rewards` + `customer_package` (info insentif per paket) |
| **Skema Insentif** (data dinamis) | Query `customer_package` untuk tier bonus + `rewards` untuk reward list |
| **Top Affiliate** (realtime) | Query `customers` ORDER BY bonus sponsor/pairing terbesar pada periode berjalan |

---

## Ringkasan Model Baru yang Perlu Dibuat

Semua model baru diletakkan di `app/Models/ZennerClub/`:

```
app/Models/ZennerClub/
├── ZcContent.php
├── ZcMaterial.php
├── ZcCourse.php               → hasMany(ZcLesson), morphMany(ZcCertificate)
├── ZcLesson.php               → belongsTo(ZcCourse), belongsTo(Product)
├── ZcEvent.php                → hasMany(ZcEventRegistration), morphMany(ZcCertificate)
├── ZcEventRegistration.php    → belongsTo(ZcEvent), belongsTo(Customer)
├── ZcLeaderboard.php          → belongsTo(Customer)
├── ZcChallenge.php            → hasMany(ZcChallengeParticipant), hasMany(ZcHallOfFame)
├── ZcChallengeParticipant.php → belongsTo(ZcChallenge), belongsTo(Customer)
├── ZcCertificate.php          → belongsTo(Customer), morphTo(certifiable)
└── ZcHallOfFame.php           → belongsTo(Customer), belongsTo(ZcChallenge)
```

> **Catatan:** Model existing (`Customer`, `Product`, `Reward`, `CustomerPackage`, dll) **tidak perlu dimodifikasi**. Relasi dari sisi Zenner Club cukup didefinisikan di model-model baru menggunakan `belongsTo`.

---

## Migration File yang Dibutuhkan

Buat satu migration file:

```
database/migrations/xxxx_xx_xx_create_zenner_club_tables.php
```

Berisi pembuatan 11 tabel di atas dalam urutan yang benar (parent tables dulu, kemudian child tables).

---

## Catatan Penting

1. **Prefix `zc_`** digunakan untuk semua tabel Zenner Club agar mudah dibedakan dari tabel existing.
2. **Tidak ada perubahan** pada migration, model, atau tabel yang sudah ada.
3. **Foreign key** ke tabel existing menggunakan `ON DELETE CASCADE` atau `ON DELETE SET NULL` sesuai konteks.
4. **Kolom `metadata` (JSON)** digunakan untuk fleksibilitas data tanpa perlu alter table di kemudian hari.
5. **Leaderboard & Challenge progress** dihitung via scheduled job/command yang query data dari tabel existing.
