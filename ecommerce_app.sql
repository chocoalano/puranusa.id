-- -------------------------------------------------------------
-- TablePlus 6.7.4(642)
--
-- https://tableplus.com/
--
-- Database: ecommerce_app
-- Generation Time: 2025-11-18 16:39:21.8990
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `article_contents`;
CREATE TABLE `article_contents` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int unsigned NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `article_contents_article_id_foreign` (`article_id`),
  CONSTRAINT `article_contents_chk_1` CHECK (json_valid(`content`)),
  CONSTRAINT `article_contents_chk_2` CHECK (json_valid(`tags`))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seo_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seo_description` text COLLATE utf8mb4_unicode_ci,
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_title_unique` (`title`),
  UNIQUE KEY `articles_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE `cart_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key item keranjang',
  `cart_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `qty` int unsigned NOT NULL DEFAULT '1' COMMENT 'Jumlah unit produk dalam keranjang',
  `unit_price` decimal(18,2) NOT NULL COMMENT 'Harga per unit produk saat ditambahkan (sebelum diskon item)',
  `currency` char(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'IDR' COMMENT 'Mata uang pada saat penambahan',
  `product_sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'SKU snapshot',
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Nama produk snapshot',
  `row_total` decimal(18,2) NOT NULL COMMENT 'Subtotal untuk item ini (qty x unit_price - diskon item)',
  `meta_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin COMMENT 'Informasi tambahan (mis. breakdown promo/bundle/gift)',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_items_cart_product_unique` (`cart_id`,`product_id`),
  KEY `cart_items_product_id_foreign` (`product_id`),
  KEY `cart_items_cart_id_index` (`cart_id`),
  CONSTRAINT `cart_items_chk_1` CHECK (json_valid(`meta_json`))
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Detail item produk dalam keranjang belanja (tanpa variant)';

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key keranjang',
  `customer_id` int unsigned DEFAULT NULL,
  `session_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ID sesi untuk keranjang guest (tanpa login)',
  `currency` char(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'IDR' COMMENT 'Kode mata uang (mis. IDR)',
  `subtotal_amount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Total harga item sebelum diskon/ongkir/pajak',
  `discount_amount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Total diskon yang diterapkan',
  `shipping_amount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Biaya pengiriman',
  `tax_amount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Total pajak',
  `grand_total` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Total akhir yang harus dibayar',
  `applied_promos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin COMMENT 'Daftar promo/voucher yang diterapkan (format JSON)',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_customer_id_foreign` (`customer_id`),
  KEY `carts_session_id_index` (`session_id`),
  CONSTRAINT `carts_chk_1` CHECK (json_valid(`applied_promos`))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Master keranjang belanja untuk user/guest';

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key kategori',
  `parent_id` bigint unsigned DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Slug unik kategori untuk URL',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nama kategori',
  `description` text COLLATE utf8mb4_unicode_ci COMMENT 'Deskripsi kategori',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT 'Urutan tampil kategori',
  `is_active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Status aktif kategori',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'storage/images/galaxy-z-flip7-share-image.png' COMMENT 'Gambar kategori',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`),
  KEY `categories_sort_order_index` (`sort_order`),
  KEY `categories_is_active_index` (`is_active`),
  KEY `categories_parent_id_foreign` (`parent_id`),
  CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Daftar kategori produk';

DROP TABLE IF EXISTS `newsletter_subscribers`;
CREATE TABLE `newsletter_subscribers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscribed_at` timestamp NULL DEFAULT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `newsletter_subscribers_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key order item',
  `order_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Nama item saat checkout (snapshot)',
  `sku` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'SKU item saat checkout (snapshot)',
  `qty` int unsigned NOT NULL COMMENT 'Kuantitas item pada order',
  `unit_price` decimal(18,2) NOT NULL COMMENT 'Harga per unit saat checkout (sebelum diskon item)',
  `discount_amount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Total diskon yang menempel pada item ini',
  `row_total` decimal(18,2) NOT NULL COMMENT 'Subtotal baris (qty x unit_price - diskon item)',
  `weight_gram` int unsigned DEFAULT NULL COMMENT 'Berat snapshot (gram)',
  `length_mm` int unsigned DEFAULT NULL COMMENT 'Panjang snapshot (mm)',
  `width_mm` int unsigned DEFAULT NULL COMMENT 'Lebar snapshot (mm)',
  `height_mm` int unsigned DEFAULT NULL COMMENT 'Tinggi snapshot (mm)',
  `meta_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin COMMENT 'Metadata tambahan (rincian promo per item, bundle, catatan)',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  KEY `order_items_order_id_index` (`order_id`),
  CONSTRAINT `order_items_chk_1` CHECK (json_valid(`meta_json`))
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Detail item yang dipesan pada suatu order (tanpa variant)';

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key order',
  `order_no` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nomor order unik yang ditampilkan ke pengguna',
  `customer_id` bigint unsigned DEFAULT NULL,
  `currency` char(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'IDR' COMMENT 'Kode mata uang (mis. IDR)',
  `status` enum('PENDING','PAID','PROCESSING','SHIPPED','COMPLETED','CANCELED','REFUNDED','PARTIAL_REFUND') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING' COMMENT 'Status order terkini',
  `subtotal_amount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Subtotal item sebelum diskon/ongkir/pajak',
  `discount_amount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Total diskon yang diterapkan pada order',
  `shipping_amount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Biaya pengiriman',
  `tax_amount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Total pajak',
  `grand_total` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Total akhir yang harus dibayar',
  `shipping_address_id` bigint unsigned DEFAULT NULL,
  `billing_address_id` bigint unsigned DEFAULT NULL,
  `applied_promos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin COMMENT 'Daftar promo/voucher yang diterapkan (JSON)',
  `notes` text COLLATE utf8mb4_unicode_ci COMMENT 'Catatan tambahan dari pengguna/CS',
  `placed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Waktu order dibuat/checkout selesai',
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_order_no_unique` (`order_no`),
  KEY `orders_customer_id_foreign` (`customer_id`),
  KEY `orders_shipping_address_id_foreign` (`shipping_address_id`),
  KEY `orders_billing_address_id_foreign` (`billing_address_id`),
  KEY `orders_status_index` (`status`),
  CONSTRAINT `orders_chk_1` CHECK (json_valid(`applied_promos`))
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Ringkasan pesanan pelanggan';

DROP TABLE IF EXISTS `payment_methods`;
CREATE TABLE `payment_methods` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key payment method',
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Kode metode bayar (CC, VA, QRIS, E-WALLET, COD)',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Nama tampilan metode bayar',
  `is_active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Status aktif metode bayar',
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_methods_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Daftar metode pembayaran yang didukung';

DROP TABLE IF EXISTS `payment_transactions`;
CREATE TABLE `payment_transactions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key log transaksi pembayaran',
  `payment_id` bigint unsigned NOT NULL,
  `status` enum('INITIATED','AUTHORIZED','CAPTURED','FAILED','CANCELED','REFUNDED','PARTIAL_REFUND') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Status pada event ini (AUTHORIZED, CAPTURED, dll)',
  `amount` decimal(18,2) NOT NULL COMMENT 'Jumlah pada event ini (jika relevan)',
  `raw_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin COMMENT 'Payload mentah dari gateway (JSON)',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Waktu event terjadi',
  PRIMARY KEY (`id`),
  KEY `payment_transactions_payment_id_status_created_at_index` (`payment_id`,`status`,`created_at`),
  CONSTRAINT `payment_transactions_chk_1` CHECK (json_valid(`raw_json`))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Log historis status/payment events';

DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key pembayaran',
  `order_id` bigint unsigned NOT NULL,
  `method_id` smallint unsigned NOT NULL COMMENT 'FK ke payment_methods.id',
  `status` enum('INITIATED','AUTHORIZED','CAPTURED','FAILED','CANCELED','REFUNDED','PARTIAL_REFUND') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'INITIATED' COMMENT 'Status pembayaran terkini',
  `amount` decimal(18,2) NOT NULL COMMENT 'Jumlah yang dibayar (gross/charged)',
  `currency` char(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'IDR' COMMENT 'Mata uang pembayaran (mis. IDR)',
  `provider_txn_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ID transaksi pada provider gateway',
  `metadata_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin COMMENT 'Payload/response gateway (JSON)',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_method_id_foreign` (`method_id`),
  KEY `payments_order_id_status_index` (`order_id`,`status`),
  KEY `payments_status_index` (`status`),
  CONSTRAINT `payments_chk_1` CHECK (json_valid(`metadata_json`))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Data pembayaran yang terkait dengan suatu order';

DROP TABLE IF EXISTS `product_categories`;
CREATE TABLE `product_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key pivot',
  `product_id` int unsigned NOT NULL,
  `category_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_categories_unique` (`product_id`,`category_id`),
  KEY `product_categories_product_id_index` (`product_id`),
  KEY `product_categories_category_id_index` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Relasi produk dengan beberapa kategori';

DROP TABLE IF EXISTS `product_media`;
CREATE TABLE `product_media` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key media produk',
  `product_id` int unsigned NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'URL file media',
  `type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Tipe media: image, video, 3d',
  `alt_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Alt text SEO / aksesibilitas',
  `sort_order` int NOT NULL DEFAULT '0' COMMENT 'Urutan tampil media',
  `is_primary` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Penanda media utama',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_media_product_id_sort_order_index` (`product_id`,`sort_order`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Media (gambar/video) untuk produk';

DROP TABLE IF EXISTS `product_reviews`;
CREATE TABLE `product_reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key review produk',
  `customer_id` bigint unsigned DEFAULT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `order_item_id` bigint unsigned DEFAULT NULL,
  `rating` tinyint unsigned NOT NULL COMMENT 'Rating produk (1..5 bintang)',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Judul singkat review',
  `comment` longtext COLLATE utf8mb4_unicode_ci COMMENT 'Isi review/komentar user',
  `is_approved` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Status moderasi review',
  `is_verified_purchase` tinyint(1) GENERATED ALWAYS AS ((`order_item_id` is not null)) VIRTUAL COMMENT 'Diturunkan dari order_item_id',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reviews_product_user_unique` (`product_id`,`customer_id`),
  KEY `product_reviews_customer_id_foreign` (`customer_id`),
  KEY `product_reviews_order_item_id_foreign` (`order_item_id`),
  KEY `reviews_query_idx` (`product_id`,`is_approved`,`rating`),
  KEY `product_reviews_is_approved_index` (`is_approved`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Review & rating produk oleh user (tanpa variant)';

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key produk',
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Kode unik produk (Stock Keeping Unit)',
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Slug unik produk untuk URL',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nama produk',
  `short_desc` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Deskripsi singkat',
  `long_desc` longtext COLLATE utf8mb4_unicode_ci COMMENT 'Deskripsi panjang produk',
  `brand` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Merek/brand produk',
  `warranty_months` int DEFAULT NULL COMMENT 'Garansi dalam bulan, null jika tidak ada',
  `base_price` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Harga dasar produk',
  `currency` char(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'IDR' COMMENT 'Kode mata uang (mis. IDR)',
  `stock` int unsigned NOT NULL DEFAULT '0' COMMENT 'Persediaan stok produk',
  `weight_gram` int unsigned DEFAULT NULL COMMENT 'Berat (gram)',
  `length_mm` int unsigned DEFAULT NULL COMMENT 'Panjang (mm)',
  `width_mm` int unsigned DEFAULT NULL COMMENT 'Lebar (mm)',
  `height_mm` int unsigned DEFAULT NULL COMMENT 'Tinggi (mm)',
  `is_active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Status aktif produk',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_sku_unique` (`sku`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  KEY `products_is_active_index` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Master produk utama tanpa variasi';

DROP TABLE IF EXISTS `promotion_products`;
CREATE TABLE `promotion_products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key mapping promo-produk',
  `promotion_id` int unsigned NOT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `min_qty` int unsigned NOT NULL DEFAULT '1' COMMENT 'Minimal qty untuk eligible promo',
  `discount_value` decimal(18,2) DEFAULT NULL COMMENT 'Diskon nominal (FIXED_DISCOUNT)',
  `discount_percent` decimal(5,2) DEFAULT NULL COMMENT 'Diskon persen (PERCENT_DISCOUNT)',
  `bundle_price` decimal(18,2) DEFAULT NULL COMMENT 'Harga bundling (BUNDLE_PRICE)',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `promotion_products_unique` (`promotion_id`,`product_id`),
  KEY `promotion_products_product_id_foreign` (`product_id`),
  KEY `promotion_products_promotion_id_min_qty_index` (`promotion_id`,`min_qty`),
  CONSTRAINT `chk_promo_values` CHECK ((((`discount_percent` is not null) and (`discount_percent` >= 0) and (`discount_percent` <= 100) and (`discount_value` is null) and (`bundle_price` is null)) or ((`discount_value` is not null) and (`discount_value` >= 0) and (`discount_percent` is null) and (`bundle_price` is null)) or ((`bundle_price` is not null) and (`bundle_price` >= 0) and (`discount_percent` is null) and (`discount_value` is null)) or ((`discount_percent` is null) and (`discount_value` is null) and (`bundle_price` is null))))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Cakupan produk yang terkena promo + parameter diskonnya (tanpa variant)';

DROP TABLE IF EXISTS `promotions`;
CREATE TABLE `promotions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key promo',
  `code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Kode unik promo (mis. GALAXYWEEK)',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nama promo untuk tampilan',
  `type` enum('PERCENT_DISCOUNT','FIXED_DISCOUNT','CASHBACK','BUNDLE_PRICE','GIFT_WITH_PURCHASE','BANK_INSTALLMENT','PAYMENT_METHOD_DISCOUNT','FLASH_SALE','TRADE_IN') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Jenis promo',
  `landing_slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Slug halaman landing/offer (opsional)',
  `description` longtext COLLATE utf8mb4_unicode_ci COMMENT 'Deskripsi/ketentuan promo (rich text)',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_at` timestamp NOT NULL COMMENT 'Waktu mulai promo (UTC/DB time)',
  `end_at` timestamp NOT NULL COMMENT 'Waktu akhir promo',
  `is_active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Status aktif promo',
  `priority` int NOT NULL DEFAULT '100' COMMENT 'Prioritas aplikasi promo (angka kecil = lebih prioritas)',
  `max_redemption` int DEFAULT NULL COMMENT 'Kuota global pemakaian promo',
  `per_user_limit` int DEFAULT NULL COMMENT 'Batas penggunaan per user',
  `conditions_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin COMMENT 'Syarat & filter granular (min spend, channel, bank, whitelist dsb.)',
  `show_on` enum('HERO','BANNER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'HERO' COMMENT 'Tampilkan pada section HERO/BANNER',
  `custom_html` longtext COLLATE utf8mb4_unicode_ci COMMENT 'HTML kustom untuk tampilan promo',
  `page` enum('beranda') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'beranda' COMMENT 'Tampilkan pada halaman tertentu',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `promotions_code_unique` (`code`),
  KEY `promotions_is_active_index` (`is_active`),
  KEY `promotions_priority_index` (`priority`),
  CONSTRAINT `promotions_chk_1` CHECK (json_valid(`conditions_json`))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Master promosi: definisi, periode, dan rule global';

DROP TABLE IF EXISTS `refunds`;
CREATE TABLE `refunds` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key refund',
  `order_id` bigint unsigned NOT NULL,
  `payment_id` bigint unsigned DEFAULT NULL,
  `status` enum('INITIATED','AUTHORIZED','CAPTURED','FAILED','CANCELED','REFUNDED','PARTIAL_REFUND') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'REFUNDED' COMMENT 'Status refund (REFUNDED/PARTIAL_REFUND/dll)',
  `amount` decimal(18,2) NOT NULL COMMENT 'Jumlah dana yang dikembalikan',
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Alasan/ref catatan refund',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `refunds_payment_id_foreign` (`payment_id`),
  KEY `refunds_order_id_payment_id_index` (`order_id`,`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Catatan pengembalian dana untuk suatu order/pembayaran';

DROP TABLE IF EXISTS `return_items`;
CREATE TABLE `return_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key retur item',
  `return_id` bigint unsigned NOT NULL,
  `order_item_id` bigint unsigned NOT NULL,
  `qty` int unsigned NOT NULL COMMENT 'Jumlah unit yang diretur',
  `condition_note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Catatan kondisi barang (opsional)',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `return_items_order_item_id_foreign` (`order_item_id`),
  KEY `return_items_return_id_index` (`return_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Detail item yang termasuk dalam pengajuan retur';

DROP TABLE IF EXISTS `returns`;
CREATE TABLE `returns` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key retur',
  `order_id` bigint unsigned NOT NULL,
  `status` enum('REQUESTED','APPROVED','REJECTED','RECEIVED','REFUNDED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'REQUESTED' COMMENT 'Status pengajuan retur',
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Alasan retur dari pelanggan/CS',
  `requested_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Waktu retur diajukan',
  `processed_at` timestamp NULL DEFAULT NULL COMMENT 'Waktu retur diproses/diapprove/ditolak',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `returns_order_id_status_index` (`order_id`,`status`),
  KEY `returns_status_index` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Pengajuan retur untuk item pada order';

DROP TABLE IF EXISTS `shipment_items`;
CREATE TABLE `shipment_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key shipment item',
  `shipment_id` bigint unsigned NOT NULL,
  `order_item_id` bigint unsigned NOT NULL,
  `qty` int unsigned NOT NULL COMMENT 'Jumlah unit item yang dikirim dalam shipment ini',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `shipment_items_order_item_id_foreign` (`order_item_id`),
  KEY `shipment_items_shipment_id_index` (`shipment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Item-item yang dikirim pada sebuah shipment';

DROP TABLE IF EXISTS `shipments`;
CREATE TABLE `shipments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key shipment',
  `order_id` bigint unsigned NOT NULL,
  `courier_id` smallint unsigned DEFAULT NULL COMMENT 'FK ke couriers.id',
  `tracking_no` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Nomor resi/penelusuran pengiriman',
  `status` enum('READY_TO_SHIP','IN_TRANSIT','DELIVERED','FAILED','RETURNED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'READY_TO_SHIP' COMMENT 'Status pengiriman',
  `shipped_at` timestamp NULL DEFAULT NULL COMMENT 'Waktu barang dikirim',
  `delivered_at` timestamp NULL DEFAULT NULL COMMENT 'Waktu barang diterima',
  `shipping_fee` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 'Biaya pengiriman yang dikenakan',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `shipments_courier_id_foreign` (`courier_id`),
  KEY `shipments_order_id_courier_id_index` (`order_id`,`courier_id`),
  KEY `shipments_status_index` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Data pengiriman (shipment) terkait order';

DROP TABLE IF EXISTS `wishlist_items`;
CREATE TABLE `wishlist_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key item wishlist',
  `wishlist_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Snapshot nama produk saat ditambahkan',
  `product_sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Snapshot SKU saat ditambahkan',
  `meta_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin COMMENT 'Catatan/label kustom, sumber, dsb.',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wishlist_unique_item` (`wishlist_id`,`product_id`),
  KEY `wishlist_items_product_id_foreign` (`product_id`),
  KEY `wishlist_items_wishlist_id_index` (`wishlist_id`),
  CONSTRAINT `wishlist_items_chk_1` CHECK (json_valid(`meta_json`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Detail produk dalam wishlist user (tanpa variant)';

DROP TABLE IF EXISTS `wishlists`;
CREATE TABLE `wishlists` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key wishlist',
  `customer_id` bigint unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Default' COMMENT 'Nama wishlist (mendukung multi-wishlist)',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wishlists_user_name_unique` (`customer_id`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Wishlist milik user yang berisi produk favorit';

INSERT INTO `article_contents` (`id`, `article_id`, `content`, `tags`, `created_at`, `updated_at`) VALUES
(1, 1, '[{\"type\":\"image\",\"data\":{\"url\":\"articles\\/images\\/01K8NDJWC9Y1JZBX2GSHFGX7NC.jpg\",\"alt\":\"Penghargaan tertinggi untuk Afiliator peraih omset tahunan terbesar periode tahun 2025\"}}]', '\"penghargaan,testimoni,\"', '2025-10-29 02:44:44', '2025-10-29 02:44:44');

INSERT INTO `articles` (`id`, `title`, `slug`, `seo_title`, `seo_description`, `is_published`, `published_at`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Penghargaan', 'penghargaan', NULL, NULL, 0, NULL, NULL, '2025-10-29 02:44:44', '2025-10-29 02:44:44');

INSERT INTO `cart_items` (`id`, `cart_id`, `product_id`, `qty`, `unit_price`, `currency`, `product_sku`, `product_name`, `row_total`, `meta_json`, `created_at`, `updated_at`) VALUES
(25, 9, 40, 1, 750000.00, 'IDR', 'SKU-INFRAREDPADS', 'Far Infrared Knee Pads - Tourmaline Self-heating', 750000.00, NULL, '2025-10-28 21:24:15', '2025-10-28 21:24:15'),
(26, 9, 41, 1, 1000000.00, 'IDR', 'SKU-WAISTTOURMALINE', 'Nano-tech Lumbar Waist Brace Tourmaline', 1000000.00, NULL, '2025-10-28 21:24:32', '2025-10-28 21:24:32'),
(27, 9, 37, 1, 150000.00, 'IDR', 'SKU-WASHFEMININ', 'PURANUSA - Feminin Wash', 150000.00, NULL, '2025-10-28 21:25:04', '2025-10-28 21:25:04'),
(28, 9, 1, 1, 300000.00, 'IDR', 'SKU-NPKBOGBUQD', 'Puranusa Beauty Care, Brightening Soap, Feminime Spray, Feminime Wash', 300000.00, NULL, '2025-10-28 21:25:59', '2025-10-28 21:25:59'),
(29, 9, 29, 1, 350000.00, 'IDR', 'SKU-TVEQ1ITB4V', 'BIOZENLITE: Kemurnian Serat Harian', 350000.00, NULL, '2025-10-28 21:26:24', '2025-10-28 21:26:24'),
(35, 8, 40, 1, 750000.00, 'IDR', 'SKU-INFRAREDPADS', 'Far Infrared Knee Pads - Tourmaline Self-heating', 750000.00, NULL, '2025-10-29 00:34:19', '2025-10-29 00:34:19'),
(36, 8, 34, 1, 200000.00, 'IDR', 'SKU-VPIVK1QUJ3', 'ROYAL PROPOLIS - Premium Grade Brazilian Propolis 8ml ', 200000.00, NULL, '2025-10-29 11:44:07', '2025-10-29 11:44:07'),
(37, 8, 29, 10, 350000.00, 'IDR', 'SKU-TVEQ1ITB4V', 'BIOZENLITE: Kemurnian Serat Harian', 3500000.00, NULL, '2025-10-29 11:44:20', '2025-10-29 11:44:20'),
(38, 8, 38, 5, 50000.00, 'IDR', 'SKU-SPRAYFEMININ', 'PURANUSA - Feminin Spray', 250000.00, NULL, '2025-10-29 11:45:20', '2025-10-29 11:45:20'),
(39, 11, 38, 1, 50000.00, 'IDR', 'SKU-SPRAYFEMININ', 'PURANUSA - Feminin Spray', 50000.00, NULL, '2025-10-29 13:59:34', '2025-10-29 13:59:34');

INSERT INTO `carts` (`id`, `customer_id`, `session_id`, `currency`, `subtotal_amount`, `discount_amount`, `shipping_amount`, `tax_amount`, `grand_total`, `applied_promos`, `created_at`, `updated_at`) VALUES
(6, 1, NULL, 'IDR', 0.00, 0.00, 0.00, 0.00, 0.00, NULL, '2025-10-10 14:37:38', '2025-11-10 16:39:28'),
(8, 6, NULL, 'IDR', 4700000.00, 0.00, 0.00, 0.00, 4700000.00, NULL, '2025-10-27 12:56:49', '2025-10-29 11:45:20'),
(9, NULL, 'uomk6UzJnsJdwzuROAj4N7pECjVLD0RvlYoR8rSn', 'IDR', 2550000.00, 0.00, 0.00, 0.00, 2550000.00, NULL, '2025-10-28 21:24:15', '2025-10-28 21:26:24'),
(10, NULL, NULL, 'IDR', 0.00, 0.00, 0.00, 0.00, 0.00, NULL, '2025-10-28 22:40:44', '2025-10-28 22:43:00'),
(11, 8, NULL, 'IDR', 50000.00, 0.00, 0.00, 0.00, 50000.00, NULL, '2025-10-29 13:59:34', '2025-10-29 13:59:34');

INSERT INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `sort_order`, `is_active`, `image`, `created_at`, `updated_at`) VALUES
(1, NULL, 'officia-sint-6bt6jb', 'Health Therapy', 'Puranusa', 1, 1, 'images/category-products/01K8NCS0E3H5C7C4WEP1ZXE6FK.png', '2025-10-08 11:38:32', '2025-10-29 02:30:37'),
(2, NULL, 'aut-totam-Yhec7L', 'Beauty Care', 'Puranusa', 1, 1, 'images/category-products/01K8NCW90F80Q7W4WR84R50XK6.jpg', '2025-10-08 11:38:32', '2025-10-29 02:32:24'),
(3, NULL, 'sed-nulla-UXJGib', 'Health Care', 'Puranusa', 2, 1, 'images/category-products/01K8METSTFYZHAVWSMBQ39EGQR.jpg', '2025-10-08 11:38:32', '2025-10-28 17:47:18'),
(4, NULL, 'voluptatem-et-wyKKu2', 'Fashion', 'Puranusa', 4, 1, 'images/category-products/01K8ND4299C9FEH9P4YTJRV6DM.png', '2025-10-08 11:38:32', '2025-10-29 02:36:39');

INSERT INTO `newsletter_subscribers` (`id`, `email`, `subscribed_at`, `ip_address`, `created_at`, `updated_at`) VALUES
(1, 'demo@email.com', '2025-10-21 16:16:06', '127.0.0.1', '2025-10-21 16:16:06', '2025-10-21 16:16:06'),
(2, 'testing@mail.tes', '2025-10-26 20:48:31', '202.51.207.42', '2025-10-26 20:48:31', '2025-10-26 20:48:31'),
(3, 'testing@gmail.com', NULL, NULL, '2025-10-28 13:34:15', '2025-10-28 13:34:15'),
(4, 'zakariyaflasa@gmail.com', '2025-10-28 22:19:23', '180.242.63.198', '2025-10-28 22:19:23', '2025-10-28 22:19:23'),
(5, 'ferry.yulianto69@gmail.com', '2025-10-29 13:56:20', '51.158.205.226', '2025-10-29 13:56:20', '2025-10-29 13:56:20');

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `name`, `sku`, `qty`, `unit_price`, `discount_amount`, `row_total`, `weight_gram`, `length_mm`, `width_mm`, `height_mm`, `meta_json`, `created_at`, `updated_at`) VALUES
(1, 1, 28, 'Adipisci Sit Vel Ut Ut Asperiores Laudantium Tenetur.', 'SKU-OA2RLMAJIM', 1, 397460.49, 0.00, 397460.49, 4854, 73, 263, 64, NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(2, 1, 29, 'Dolores Nemo Quia Eius Facere Voluptas.', 'SKU-TVEQ1ITB4V', 1, 2115850.51, 0.00, 2115850.51, 2018, 250, 95, 50, NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(3, 1, 30, 'Modi Ut In Eligendi Soluta Eos.', 'SKU-5I1TO2KKG1', 2, 936008.57, 0.00, 1872017.14, 2046, 123, 341, 200, NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(4, 2, 31, 'Porro Aperiam Dicta Ea Exercitationem Sit Sunt.', 'SKU-TTOWZ2VEFE', 2, 1575658.94, 0.00, 3151317.88, 1682, 382, 369, 176, NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(5, 3, 32, 'Et Eveniet Nam Temporibus Blanditiis Sit Error.', 'SKU-L05PJVCZ3G', 3, 85225.34, 0.00, 255676.02, 2446, 266, 115, 91, NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(6, 4, 33, 'Perferendis Officia Et Quos Perspiciatis A.', 'SKU-33YAPSXPBI', 1, 434819.86, 0.00, 434819.86, 357, 382, 64, 63, NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(7, 5, 34, 'Reprehenderit Inventore Nemo Aliquid Accusamus Suscipit.', 'SKU-VPIVK1QUJ3', 1, 676473.98, 0.00, 676473.98, 1233, 71, 170, 274, NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(8, 6, 13, 'Sed Similique Voluptates Ipsam Unde Porro Ipsum.', 'SKU-3OXGXR8JCD', 6, 2039802.52, 0.00, 12238815.12, NULL, NULL, NULL, NULL, NULL, '2025-10-10 18:05:55', '2025-10-10 18:05:55'),
(9, 7, 34, 'Reprehenderit Inventore Nemo Aliquid Accusamus Suscipit.', 'SKU-VPIVK1QUJ3', 5, 676473.98, 0.00, 3382369.90, NULL, NULL, NULL, NULL, NULL, '2025-10-10 22:41:59', '2025-10-10 22:41:59'),
(10, 8, 32, 'Et Eveniet Nam Temporibus Blanditiis Sit Error.', 'SKU-L05PJVCZ3G', 1, 85225.34, 0.00, 85225.34, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:09:22', '2025-10-10 23:09:22'),
(11, 8, 34, 'Reprehenderit Inventore Nemo Aliquid Accusamus Suscipit.', 'SKU-VPIVK1QUJ3', 7, 676473.98, 0.00, 4735317.86, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:09:22', '2025-10-10 23:09:22'),
(12, 9, 32, 'Et Eveniet Nam Temporibus Blanditiis Sit Error.', 'SKU-L05PJVCZ3G', 1, 85225.34, 0.00, 85225.34, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:12:32', '2025-10-10 23:12:32'),
(13, 9, 34, 'Reprehenderit Inventore Nemo Aliquid Accusamus Suscipit.', 'SKU-VPIVK1QUJ3', 7, 676473.98, 0.00, 4735317.86, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:12:32', '2025-10-10 23:12:32'),
(14, 10, 32, 'Et Eveniet Nam Temporibus Blanditiis Sit Error.', 'SKU-L05PJVCZ3G', 1, 85225.34, 0.00, 85225.34, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:16:12', '2025-10-10 23:16:12'),
(15, 10, 34, 'Reprehenderit Inventore Nemo Aliquid Accusamus Suscipit.', 'SKU-VPIVK1QUJ3', 7, 676473.98, 0.00, 4735317.86, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:16:12', '2025-10-10 23:16:12'),
(16, 11, 32, 'Et Eveniet Nam Temporibus Blanditiis Sit Error.', 'SKU-L05PJVCZ3G', 1, 85225.34, 0.00, 85225.34, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:40:18', '2025-10-10 23:40:18'),
(17, 11, 34, 'Reprehenderit Inventore Nemo Aliquid Accusamus Suscipit.', 'SKU-VPIVK1QUJ3', 7, 676473.98, 0.00, 4735317.86, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:40:18', '2025-10-10 23:40:18'),
(18, 12, 32, 'Et Eveniet Nam Temporibus Blanditiis Sit Error.', 'SKU-L05PJVCZ3G', 1, 85225.34, 0.00, 85225.34, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:44:09', '2025-10-10 23:44:09'),
(19, 12, 34, 'Reprehenderit Inventore Nemo Aliquid Accusamus Suscipit.', 'SKU-VPIVK1QUJ3', 7, 676473.98, 0.00, 4735317.86, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:44:09', '2025-10-10 23:44:09'),
(20, 13, 32, 'Et Eveniet Nam Temporibus Blanditiis Sit Error.', 'SKU-L05PJVCZ3G', 1, 85225.34, 0.00, 85225.34, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:46:13', '2025-10-10 23:46:13'),
(21, 13, 34, 'Reprehenderit Inventore Nemo Aliquid Accusamus Suscipit.', 'SKU-VPIVK1QUJ3', 7, 676473.98, 0.00, 4735317.86, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:46:13', '2025-10-10 23:46:13'),
(22, 14, 32, 'Et Eveniet Nam Temporibus Blanditiis Sit Error.', 'SKU-L05PJVCZ3G', 1, 85225.34, 0.00, 85225.34, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:48:03', '2025-10-10 23:48:03'),
(23, 14, 34, 'Reprehenderit Inventore Nemo Aliquid Accusamus Suscipit.', 'SKU-VPIVK1QUJ3', 7, 676473.98, 0.00, 4735317.86, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:48:03', '2025-10-10 23:48:03'),
(24, 15, 32, 'Et Eveniet Nam Temporibus Blanditiis Sit Error.', 'SKU-L05PJVCZ3G', 1, 85225.34, 0.00, 85225.34, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:49:47', '2025-10-10 23:49:47'),
(25, 15, 34, 'Reprehenderit Inventore Nemo Aliquid Accusamus Suscipit.', 'SKU-VPIVK1QUJ3', 7, 676473.98, 0.00, 4735317.86, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:49:47', '2025-10-10 23:49:47'),
(26, 16, 32, 'Et Eveniet Nam Temporibus Blanditiis Sit Error.', 'SKU-L05PJVCZ3G', 1, 85225.34, 0.00, 85225.34, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:58:59', '2025-10-10 23:58:59'),
(27, 16, 34, 'Reprehenderit Inventore Nemo Aliquid Accusamus Suscipit.', 'SKU-VPIVK1QUJ3', 7, 676473.98, 0.00, 4735317.86, NULL, NULL, NULL, NULL, NULL, '2025-10-10 23:58:59', '2025-10-10 23:58:59'),
(28, 17, 1, 'Asperiores Adipisci Excepturi Quos Quia Expedita Soluta.', 'SKU-NPKBOGBUQD', 1, 153775.02, 0.00, 153775.02, NULL, NULL, NULL, NULL, NULL, '2025-10-13 20:41:38', '2025-10-13 20:41:38'),
(29, 18, 41, 'Nano-tech Lumbar Waist Brace Tourmaline', 'SKU-WAISTTOURMALINE', 1, 1000000.00, 0.00, 1000000.00, NULL, NULL, NULL, NULL, NULL, '2025-10-18 00:39:12', '2025-10-18 00:39:12'),
(30, 19, 38, 'PURANUSA - Feminin Spray', 'SKU-SPRAYFEMININ', 2, 50000.00, 0.00, 100000.00, NULL, NULL, NULL, NULL, NULL, '2025-10-28 17:40:16', '2025-10-28 17:40:16'),
(31, 20, 38, 'PURANUSA - Feminin Spray', 'SKU-SPRAYFEMININ', 2, 50000.00, 0.00, 100000.00, NULL, NULL, NULL, NULL, NULL, '2025-10-28 18:58:08', '2025-10-28 18:58:08'),
(32, 20, 32, 'BIOZENERVE: Ketenangan Alami dari Akar Bumi 30 Kapsul Hitam', 'SKU-L05PJVCZ3G', 2, 350000.00, 0.00, 700000.00, NULL, NULL, NULL, NULL, NULL, '2025-10-28 18:58:08', '2025-10-28 18:58:08'),
(33, 20, 39, '3 in 1 Terahertz - Foot Therapy', 'SKU-THERATRPHEARTZ', 1, 5000000.00, 0.00, 5000000.00, NULL, NULL, NULL, NULL, NULL, '2025-10-28 18:58:08', '2025-10-28 18:58:08'),
(34, 21, 41, 'Nano-tech Lumbar Waist Brace Tourmaline', 'SKU-WAISTTOURMALINE', 2, 1000000.00, 0.00, 2000000.00, NULL, NULL, NULL, NULL, NULL, '2025-10-28 22:06:19', '2025-10-28 22:06:19'),
(35, 21, 40, 'Far Infrared Knee Pads - Tourmaline Self-heating', 'SKU-INFRAREDPADS', 1, 750000.00, 0.00, 750000.00, NULL, NULL, NULL, NULL, NULL, '2025-10-28 22:06:19', '2025-10-28 22:06:19'),
(36, 22, 33, 'BIOLOVE: Vitalitas dan Kehangatan Nusantara', 'SKU-33YAPSXPBI', 1, 350000.00, 0.00, 350000.00, NULL, NULL, NULL, NULL, NULL, '2025-10-28 22:43:00', '2025-10-28 22:43:00'),
(37, 23, 2, 'Puranusa Beauty Care, Brightening Soap, Feminime Spray, Feminime Wash', 'SKU-SMYBVSTSJF', 1, 300000.00, 0.00, 300000.00, NULL, NULL, NULL, NULL, NULL, '2025-11-10 16:39:28', '2025-11-10 16:39:28');

INSERT INTO `orders` (`id`, `order_no`, `customer_id`, `currency`, `status`, `subtotal_amount`, `discount_amount`, `shipping_amount`, `tax_amount`, `grand_total`, `shipping_address_id`, `billing_address_id`, `applied_promos`, `notes`, `placed_at`, `paid_at`, `created_at`, `updated_at`) VALUES
(1, 'ORD-20251008-WKSIQ8', 3, 'IDR', 'PENDING', 4385328.14, 0.00, 0.00, 0.00, 4385328.14, 3, 4, NULL, NULL, '2025-10-08 11:38:33', NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(2, 'ORD-20251008-IY8BNY', NULL, 'IDR', 'PENDING', 3151317.88, 0.00, 0.00, 0.00, 3151317.88, NULL, NULL, NULL, NULL, '2025-10-08 11:38:33', NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(3, 'ORD-20251008-D6D15K', NULL, 'IDR', 'PENDING', 255676.02, 0.00, 0.00, 0.00, 255676.02, NULL, NULL, NULL, NULL, '2025-10-08 11:38:33', NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(4, 'ORD-20251008-AHRMSJ', NULL, 'IDR', 'PENDING', 434819.86, 0.00, 0.00, 0.00, 434819.86, NULL, NULL, NULL, NULL, '2025-10-08 11:38:33', NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(5, 'ORD-20251008-TVMZ27', NULL, 'IDR', 'PENDING', 676473.98, 0.00, 0.00, 0.00, 676473.98, NULL, NULL, NULL, NULL, '2025-10-08 11:38:33', NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(6, 'ORD-20251010-37017B', NULL, 'IDR', 'PENDING', 12238815.12, 0.00, 0.00, 0.00, 12238815.12, 5, 5, NULL, NULL, '2025-10-10 18:05:55', NULL, '2025-10-10 18:05:55', '2025-10-10 18:05:55'),
(7, 'ORD-20251010-74D3CD', 1, 'IDR', 'PENDING', 3382369.90, 0.00, 0.00, 0.00, 3382369.90, 6, 6, NULL, NULL, '2025-10-10 22:41:59', NULL, '2025-10-10 22:41:59', '2025-10-10 22:41:59'),
(8, 'ORD-20251010-23618B', 1, 'IDR', 'PENDING', 4820543.20, 0.00, 0.00, 0.00, 4820543.20, 7, 7, NULL, NULL, '2025-10-10 23:09:22', NULL, '2025-10-10 23:09:22', '2025-10-10 23:09:22'),
(9, 'ORD-20251010-05416A', 1, 'IDR', 'PENDING', 4820543.20, 0.00, 0.00, 0.00, 4820543.20, 8, 8, NULL, NULL, '2025-10-10 23:12:32', NULL, '2025-10-10 23:12:32', '2025-10-10 23:12:32'),
(10, 'ORD-20251010-CE61ED', 1, 'IDR', 'PENDING', 4820543.20, 0.00, 0.00, 0.00, 4820543.20, 9, 9, NULL, NULL, '2025-10-10 23:16:12', NULL, '2025-10-10 23:16:12', '2025-10-10 23:16:12'),
(11, 'ORD-20251010-2CF207', 1, 'IDR', 'PENDING', 4820543.20, 0.00, 0.00, 0.00, 4820543.20, 10, 10, NULL, NULL, '2025-10-10 23:40:18', NULL, '2025-10-10 23:40:18', '2025-10-10 23:40:18'),
(12, 'ORD-20251010-9B1FF2', 1, 'IDR', 'PENDING', 4820543.20, 0.00, 0.00, 0.00, 4820543.20, 12, 12, NULL, NULL, '2025-10-10 23:44:09', NULL, '2025-10-10 23:44:09', '2025-10-10 23:44:09'),
(13, 'ORD-20251010-5D33C5', 1, 'IDR', 'PENDING', 4820543.20, 0.00, 0.00, 0.00, 4820543.20, 13, 13, NULL, NULL, '2025-10-10 23:46:13', NULL, '2025-10-10 23:46:13', '2025-10-10 23:46:13'),
(14, 'ORD-20251010-35159E', 1, 'IDR', 'PENDING', 4820543.20, 0.00, 0.00, 0.00, 4820543.20, 14, 14, NULL, NULL, '2025-10-10 23:48:03', NULL, '2025-10-10 23:48:03', '2025-10-10 23:48:03'),
(15, 'ORD-20251010-B156B6', 1, 'IDR', 'PENDING', 4820543.20, 0.00, 0.00, 0.00, 4820543.20, 15, 15, NULL, NULL, '2025-10-10 23:49:47', NULL, '2025-10-10 23:49:47', '2025-10-10 23:49:47'),
(16, 'ORD-20251010-31D977', 1, 'IDR', 'PENDING', 4820543.20, 0.00, 0.00, 0.00, 4820543.20, 19, 19, NULL, '{\"gateway\":\"midtrans\",\"snap_token\":\"4ce6f065-cdc7-44e5-8649-8f12c5e13350\",\"redirect_url\":\"https:\\/\\/app.sandbox.midtrans.com\\/snap\\/v4\\/redirection\\/e7c533be-2368-4430-91bb-04b58c3bdfa1\",\"payment_method\":\"midtrans\",\"created_at\":\"2025-10-10T16:58:59.485449Z\"}', '2025-10-10 23:58:59', NULL, '2025-10-10 23:58:59', '2025-10-10 23:58:59'),
(17, 'ORD-20251013-2422D5', 1, 'IDR', 'PENDING', 153775.02, 0.00, 0.00, 0.00, 153775.02, 20, 20, NULL, '{\"gateway\":\"midtrans\",\"snap_token\":\"f3b1da08-44ad-44c8-b80c-ce95d0d8f412\",\"redirect_url\":\"https:\\/\\/app.sandbox.midtrans.com\\/snap\\/v4\\/redirection\\/dcef7118-fc83-45cd-ab84-408552087018\",\"payment_method\":\"bank_transfer\",\"created_at\":\"2025-10-13T06:41:38.949962Z\"}', '2025-10-13 20:41:38', NULL, '2025-10-13 20:41:38', '2025-10-13 20:41:38'),
(18, 'ORD-20251017-06624D', 1, 'IDR', 'PAID', 1000000.00, 0.00, 0.00, 0.00, 1000000.00, 21, 21, NULL, '{\"gateway\":\"midtrans\",\"snap_token\":\"28489ab8-e0bb-4318-86d9-76928285ac1b\",\"redirect_url\":\"https:\\/\\/app.sandbox.midtrans.com\\/snap\\/v4\\/redirection\\/69746142-ee17-4308-be57-f9d00c887456\",\"payment_method\":\"midtrans\",\"created_at\":\"2025-10-17T10:39:12.854116Z\"}', '2025-10-18 00:39:12', NULL, '2025-10-18 00:39:12', '2025-10-18 00:40:56'),
(19, 'ORD-20251028-0EA403', 1, 'IDR', 'PENDING', 100000.00, 0.00, 0.00, 0.00, 100000.00, 22, 22, NULL, '{\"gateway\":\"midtrans\",\"snap_token\":\"c6520622-37b2-47f1-9dd8-eefb26d2171c\",\"redirect_url\":\"https:\\/\\/app.sandbox.midtrans.com\\/snap\\/v4\\/redirection\\/3add97e0-2712-43e7-a8f0-3e639864204f\",\"payment_method\":\"midtrans\",\"created_at\":\"2025-10-28T03:40:17.363468Z\"}', '2025-10-28 17:40:16', NULL, '2025-10-28 17:40:16', '2025-10-28 17:40:17'),
(20, 'ORD-20251028-04FFC9', 6, 'IDR', 'PENDING', 5800000.00, 0.00, 0.00, 0.00, 5800000.00, 23, 23, NULL, '{\"gateway\":\"midtrans\",\"snap_token\":\"21d695bf-1930-4904-991d-ddc9e163c6f0\",\"redirect_url\":\"https:\\/\\/app.sandbox.midtrans.com\\/snap\\/v4\\/redirection\\/78a2be44-d061-4325-add7-bc2f82b01bec\",\"payment_method\":\"midtrans\",\"created_at\":\"2025-10-28T04:58:08.752134Z\"}', '2025-10-28 18:58:08', NULL, '2025-10-28 18:58:08', '2025-10-28 18:58:08'),
(21, 'ORD-20251028-AF2AA2', 1, 'IDR', 'PENDING', 2750000.00, 0.00, 0.00, 0.00, 2750000.00, 24, 24, NULL, '{\"gateway\":\"midtrans\",\"snap_token\":\"ef9be74a-1892-444e-9ba9-8cc2f8fcbcb5\",\"redirect_url\":\"https:\\/\\/app.sandbox.midtrans.com\\/snap\\/v4\\/redirection\\/20ecd573-b91f-49e2-bdde-4084fff74d45\",\"payment_method\":\"midtrans\",\"created_at\":\"2025-10-28T08:06:19.400057Z\"}', '2025-10-28 22:06:18', NULL, '2025-10-28 22:06:18', '2025-10-28 22:06:19'),
(22, 'ORD-20251028-44A4B8', NULL, 'IDR', 'PENDING', 350000.00, 0.00, 0.00, 0.00, 350000.00, 25, 25, NULL, '{\"gateway\":\"midtrans\",\"snap_token\":\"103f9e95-a950-4754-b529-796caeacd609\",\"redirect_url\":\"https:\\/\\/app.sandbox.midtrans.com\\/snap\\/v4\\/redirection\\/c7511396-a10b-4582-8e90-12f7c85e4341\",\"payment_method\":\"midtrans\",\"created_at\":\"2025-10-28T08:43:00.702747Z\"}', '2025-10-28 22:43:00', NULL, '2025-10-28 22:43:00', '2025-10-28 22:43:00'),
(23, 'ORD-20251110-007380', 1, 'IDR', 'PAID', 300000.00, 0.00, 0.00, 0.00, 300000.00, 26, 26, NULL, '{\"gateway\":\"midtrans\",\"snap_token\":\"02925c0d-2a40-49e9-bc7f-6b4110f2cfff\",\"redirect_url\":\"https:\\/\\/app.sandbox.midtrans.com\\/snap\\/v4\\/redirection\\/86662a65-57c1-44b7-9533-3349faddc902\",\"payment_method\":\"midtrans\",\"created_at\":\"2025-11-10T09:39:28.427975Z\",\"midtrans_notifications\":[{\"timestamp\":\"2025-11-10T10:37:44.977699Z\",\"status\":\"success\",\"transaction_status\":\"settlement\",\"payment_type\":\"bank_transfer\",\"fraud_status\":\"accept\",\"checked_from\":\"thankyou_page\"}]}', '2025-11-10 16:39:28', '2025-11-10 17:37:44', '2025-11-10 16:39:28', '2025-11-10 17:37:44');

INSERT INTO `payment_methods` (`id`, `code`, `name`, `is_active`) VALUES
(1, 'E-WALLET', 'E-WALLET', 1),
(2, 'QRIS', 'QRIS', 1),
(3, 'VA', 'Virtual Account', 1);

INSERT INTO `payment_transactions` (`id`, `payment_id`, `status`, `amount`, `raw_json`, `created_at`) VALUES
(1, 1, 'CAPTURED', 4385328.14, NULL, '2025-10-08 11:38:33');

INSERT INTO `payments` (`id`, `order_id`, `method_id`, `status`, `amount`, `currency`, `provider_txn_id`, `metadata_json`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'CAPTURED', 4385328.14, 'IDR', NULL, NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33');

INSERT INTO `product_categories` (`id`, `product_id`, `category_id`) VALUES
(1, 1, 3),
(2, 1, 2),
(3, 2, 3),
(4, 2, 4),
(5, 3, 4),
(6, 3, 2),
(21, 13, 3),
(22, 13, 2),
(23, 28, 2),
(24, 28, 1),
(25, 29, 3),
(26, 30, 1),
(27, 31, 1),
(28, 31, 3),
(29, 32, 3),
(30, 32, 1),
(31, 33, 3),
(32, 33, 1),
(33, 34, 3),
(34, 34, 1),
(35, 35, 3),
(36, 35, 1),
(37, 36, 2),
(38, 36, 3),
(39, 37, 2),
(40, 37, 3),
(41, 38, 2),
(42, 38, 3),
(43, 39, 1),
(44, 39, 3),
(45, 40, 4),
(46, 40, 1),
(47, 41, 4),
(48, 41, 1);

INSERT INTO `product_media` (`id`, `product_id`, `url`, `type`, `alt_text`, `sort_order`, `is_primary`, `created_at`, `updated_at`) VALUES
(1, 1, 'images/products/01K7EAZB04W3JCW0413WXKMY5H.png', 'image', 'Asperiores Adipisci Excepturi Quos Quia Expedita Soluta. Image 1', 1, 1, '2025-10-08 11:38:32', '2025-10-14 03:14:09'),
(4, 2, 'images/products/01K7EB9WY51RKWNBX5N953T75K.png', 'image', 'Sed Voluptatem Deleniti Vel In Nulla Sunt Ut. Image 1', 2, 1, '2025-10-08 11:38:32', '2025-10-13 22:34:30'),
(7, 3, 'images/products/01K7EBM5EE47RCSY7TPFBYQY9Z.png', 'image', 'Vero Culpa Atque Exercitationem Molestias Necessitatibus. Image 1', 1, 1, '2025-10-08 11:38:32', '2025-10-14 01:59:41'),
(29, 32, 'images/products/01K7P6A8BZ7PXK98ZMEWBVV9B2.png', 'image', 'Commodi Non Dolores Rem Velit Et Deleniti Accusantium. Image 2', 1, 1, '2025-10-08 11:38:32', '2025-10-16 23:41:14'),
(32, 2, 'images/products/01K7EB9WY97AHATTRHRABTMCA4.png', NULL, NULL, 3, 0, '2025-10-13 22:34:30', '2025-10-13 22:34:30'),
(33, 3, 'images/products/01K7EBM5EKWXFVSR9D69D0G7JZ.png', NULL, NULL, 2, 0, '2025-10-13 22:40:06', '2025-10-14 01:59:41'),
(34, 13, 'images/products/01K7EPYHWXYMCM8XBR0HZ9Y9P4.png', NULL, NULL, 1, 1, '2025-10-14 01:26:56', '2025-10-14 01:58:01'),
(35, 13, 'images/products/01K7EPYHXATJD3F5FR1HCZSZW6.png', NULL, NULL, 2, 0, '2025-10-14 01:58:01', '2025-10-14 01:58:01'),
(38, 29, 'images/products/01K7P869M4VDSQ76BH7JJ1N4KQ.png', NULL, NULL, 1, 1, '2025-10-14 02:08:16', '2025-10-17 00:14:02'),
(40, 30, 'images/products/01K8Q00T5VBEMM48K868VA9QED.png', NULL, NULL, 1, 1, '2025-10-14 02:25:31', '2025-10-29 17:26:10'),
(43, 31, 'images/products/01K7ESDDFZ2F0S9RJZGEWJ43AQ.jpg', NULL, NULL, 1, 1, '2025-10-14 02:41:05', '2025-10-14 02:41:05'),
(44, 31, 'images/products/01K7ESDDG1JJ16Q2GYVE0YR4AD.jpg', NULL, NULL, 2, 0, '2025-10-14 02:41:05', '2025-10-14 02:41:05'),
(45, 31, 'images/products/01K7ESDDG35V0EFKWD5Z194HYS.jpg', NULL, NULL, 3, 0, '2025-10-14 02:41:05', '2025-10-14 02:41:05'),
(46, 31, 'images/products/01K7ESDDG4HR1CVMA8RH0H4ZP7.jpg', NULL, NULL, 4, 0, '2025-10-14 02:41:05', '2025-10-14 02:41:36'),
(47, 33, 'images/products/01K7P54ZZ1SFZAXX7D3HQFVJF1.png', NULL, NULL, 1, 1, '2025-10-14 03:01:44', '2025-10-16 23:20:53'),
(48, 34, 'images/products/01K7EV63T7K3E6F060835MN2D3.jpg', NULL, NULL, 1, 1, '2025-10-14 03:12:03', '2025-10-14 03:12:03'),
(49, 28, 'images/products/01K7EVET11FRQTQ00XMNT6PMFE.png', NULL, NULL, 1, 1, '2025-10-14 03:16:48', '2025-10-14 03:16:48'),
(50, 28, 'images/products/01K7EVET144HD8DKF5PJBBAXYB.png', NULL, NULL, 0, 0, '2025-10-14 03:16:48', '2025-10-14 03:16:48'),
(51, 35, 'images/products/01K7EVV5VAAMB7FV6VS32R449Z.png', NULL, NULL, 1, 1, '2025-10-14 03:23:33', '2025-10-14 03:23:33'),
(52, 36, 'images/products/01K7F175WKM51Y72A6JWGDV18Z.png', NULL, NULL, 1, 1, '2025-10-14 04:57:30', '2025-10-14 04:57:30'),
(53, 37, 'images/products/01K7F21A22MKAZ2HMEGQ3AG1R1.png', NULL, NULL, 1, 1, '2025-10-14 05:11:46', '2025-10-14 05:11:46'),
(54, 38, 'images/products/01K7F2B256VJ7ZPHQY0XP95X01.png', NULL, NULL, 1, 1, '2025-10-14 05:17:05', '2025-10-14 05:17:05'),
(56, 39, 'images/products/01K7F4YRSGXQ0C9HWJ13NXESKQ.jpg', NULL, NULL, 2, 0, '2025-10-14 06:02:48', '2025-10-14 06:02:48'),
(57, 39, 'images/products/01K7F4YRSKH52BN476KJ12BXR1.jpg', NULL, NULL, 1, 1, '2025-10-14 06:02:48', '2025-10-14 06:02:48'),
(58, 39, 'images/products/01K7F4YRSN4MXJXE4HK1JZC296.jpg', NULL, NULL, 3, 0, '2025-10-14 06:02:48', '2025-10-14 06:02:48'),
(59, 40, 'images/products/01K7P9EA2Z8BB00XJ7B7SS4DSB.jpg', NULL, NULL, 0, 1, '2025-10-17 00:35:53', '2025-10-17 00:35:53'),
(60, 40, 'images/products/01K7P9EA31ES8WN84FJ976570B.jpg', NULL, NULL, 2, 0, '2025-10-17 00:35:53', '2025-10-17 00:35:53'),
(61, 40, 'images/products/01K7P9EA33WKKVMSXBK1R57X3D.jpg', NULL, NULL, 3, 0, '2025-10-17 00:35:53', '2025-10-17 00:35:53'),
(62, 41, 'images/products/01K7PA3ZZH8JVG1E6ZYTPN03RR.jpg', NULL, NULL, 1, 1, '2025-10-17 00:47:43', '2025-10-17 00:47:43'),
(63, 41, 'images/products/01K7PA3ZZJ7YFXA3QBP8T3GNQ6.jpg', NULL, NULL, 2, 0, '2025-10-17 00:47:43', '2025-10-17 00:47:43'),
(64, 41, 'images/products/01K7PA3ZZMXD4GPA4N43XE3X4Y.jpg', NULL, NULL, 2, 0, '2025-10-17 00:47:43', '2025-10-17 00:47:43');

INSERT INTO `product_reviews` (`id`, `customer_id`, `product_id`, `order_item_id`, `rating`, `title`, `comment`, `is_approved`, `created_at`, `updated_at`) VALUES
(1, 2, 1, NULL, 4, 'Pelayanan ramah dan produk OK', 'Produk berkualitas dan sesuai deskripsi. Pelayanan excellent, fast response. Packaging sangat rapi dan aman. Highly recommended!', 1, '2025-08-06 07:44:15', '2025-10-10 16:07:35'),
(2, 3, 1, NULL, 4, 'Produk sangat berkualitas!', 'Barang sesuai gambar dan deskripsi. Kualitas memuaskan untuk harga yang ditawarkan. Pengiriman standar, packaging ok.', 1, '2025-07-14 16:19:04', '2025-10-10 16:07:35'),
(3, 1, 1, NULL, 3, 'Worth it untuk dibeli', 'Alhamdulillah barang sudah sampai. Kualitas bagus, sesuai foto. Harga worth it. Packaging ok, pengiriman standar.', 0, '2025-09-03 11:36:26', '2025-10-10 16:07:35'),
(4, 1, 2, NULL, 5, 'Packaging rapi dan aman', 'Produk sampai dengan selamat, packaging rapi dan aman. Kualitas produk sangat baik sesuai dengan deskripsi. Pelayanan penjual juga sangat memuaskan. Recommended!', 1, '2025-08-31 02:42:21', '2025-10-10 16:07:35'),
(5, 2, 2, NULL, 3, 'Worth it untuk dibeli', 'Produk original dan berkualitas. Packaging sangat rapi dan aman. Pengiriman cepat. Penjual responsif dan ramah. Puas dengan pembelian ini.', 0, '2025-07-25 20:43:18', '2025-10-10 16:07:35'),
(6, 3, 2, NULL, 4, 'Produk sesuai deskripsi', 'Produk berkualitas dan sesuai deskripsi. Pelayanan excellent, fast response. Packaging sangat rapi dan aman. Highly recommended!', 1, '2025-09-27 01:09:00', '2025-10-10 16:07:35'),
(7, 3, 3, NULL, 4, 'Pelayanan ramah dan produk OK', 'Alhamdulillah produk sudah sampai dengan selamat. Kualitas bagus, sesuai ekspektasi. Harga juga terjangkau. Pelayanan penjual responsif.', 1, '2025-08-25 15:42:03', '2025-10-10 16:07:35'),
(8, 2, 3, NULL, 5, 'Worth it untuk dibeli', 'Produk original dan berkualitas. Packaging sangat rapi dan aman. Pengiriman cepat. Penjual responsif dan ramah. Puas dengan pembelian ini.', 1, '2025-08-01 01:26:56', '2025-10-10 16:07:35'),
(9, 2, NULL, NULL, 5, 'Worth it untuk dibeli', 'Kualitas produk sangat baik, sesuai dengan yang diharapkan. Packaging aman dan rapi. Pengiriman cepat. Terima kasih!', 1, '2025-09-20 14:53:13', '2025-10-10 16:07:35'),
(10, 1, NULL, NULL, 5, 'Produk sangat berkualitas!', 'Barang sampai dengan kondisi baik. Kualitas sesuai harga. Penjual komunikatif dan ramah. Packaging cukup aman.', 1, '2025-09-27 18:09:38', '2025-10-10 16:07:35'),
(11, 3, NULL, NULL, 4, 'Produk original dan berkualitas', 'Alhamdulillah produk sudah sampai dengan selamat. Kualitas bagus, sesuai ekspektasi. Harga juga terjangkau. Pelayanan penjual responsif.', 1, '2025-07-31 04:24:15', '2025-10-10 16:07:35'),
(12, 2, NULL, NULL, 4, 'Pelayanan ramah dan produk OK', 'Produk bagus, sesuai ekspektasi. Pelayanan penjual ramah dan fast response. Packaging rapi. Akan order lagi kalau ada kebutuhan.', 1, '2025-10-04 00:40:05', '2025-10-10 16:07:35'),
(13, 3, NULL, NULL, 5, 'Sesuai ekspektasi', 'Produk original dan berkualitas. Packaging sangat rapi dan aman. Pengiriman cepat. Penjual responsif dan ramah. Puas dengan pembelian ini.', 1, '2025-09-03 16:46:43', '2025-10-10 16:07:35');

INSERT INTO `products` (`id`, `sku`, `slug`, `name`, `short_desc`, `long_desc`, `brand`, `warranty_months`, `base_price`, `currency`, `stock`, `weight_gram`, `length_mm`, `width_mm`, `height_mm`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'SKU-NPKBOGBUQD', 'Mencerahkan, anti aging, anti keputihan, wangi sepanjang hari', 'Puranusa Beauty Care, Brightening Soap, Feminime Spray, Feminime Wash', 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.', 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.\nDirancang untuk wanita aktif yang mengutamakan kebersihan dan kesehatan holistik. Produk ini memberikan perlindungan pH seimbang dan kesegaran alami.', 'PURANUSA', 23, 300000.00, 'IDR', 122, 2954, 352, 395, 49, 1, '2025-10-08 11:38:32', '2025-10-13 22:28:44'),
(2, 'SKU-SMYBVSTSJF', 'Mencerahkan, anti aging, anti keputihan, wangi sepanjang hari, alami', 'Puranusa Beauty Care, Brightening Soap, Feminime Spray, Feminime Wash', 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan', 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.\nDirancang untuk wanita aktif yang mengutamakan kebersihan dan kesehatan holistik. Produk ini memberikan perlindungan pH seimbang dan kesegaran alami.', 'PURANUSA', 21, 300000.00, 'IDR', 235, 131, 205, 132, 270, 1, '2025-10-08 11:38:32', '2025-10-13 22:34:30'),
(3, 'SKU-YWGK1M88UN', 'Mencerahkan, anti aging, anti keputihan, wangi sepanjang hari, rapet wangi', 'Puranusa Beauty Care, Brightening Soap, Feminime Spray, Feminime Wash', 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan', 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.\nDirancang untuk wanita aktif yang mengutamakan kebersihan dan kesehatan holistik. Produk ini memberikan perlindungan pH seimbang dan kesegaran alami.', 'PURANUSA', 12, 300000.00, 'IDR', 34, 4744, 99, 393, 174, 1, '2025-10-08 11:38:32', '2025-10-14 01:59:41'),
(13, 'SKU-3OXGXR8JCD', 'Mencerahkan-anti aging-anti keputihan-wangi sepanjang hari', 'Puranusa Beauty Care, Brightening Soap, Feminime Spray, Feminime Wash', 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.', 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.\nDirancang untuk wanita aktif yang mengutamakan kebersihan dan kesehatan holistik. Produk ini memberikan perlindungan pH seimbang dan kesegaran alami.', 'PURANUSA', 14, 300000.00, 'IDR', 231, 684, 189, 301, 125, 1, '2025-10-08 11:38:32', '2025-10-14 02:01:26'),
(28, 'SKU-OA2RLMAJIM', 'Mencerahkan-anti aging-anti keputihan-wangi sepanjang hari-natural kosmetik', 'Puranusa Beauty Care, Brightening Soap, Feminime Spray, Feminime Wash', 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan', 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.\nDirancang untuk wanita aktif yang mengutamakan kebersihan dan kesehatan holistik. Produk ini memberikan perlindungan pH seimbang dan kesegaran alami.', 'PURANUSA', 1, 300000.00, 'IDR', 472, 4854, 73, 263, 64, 1, '2025-10-08 11:38:33', '2025-10-14 02:03:55'),
(29, 'SKU-TVEQ1ITB4V', 'serat-fiber-kesehatan pencernaan-tubuh ideal-slimming', 'BIOZENLITE: Kemurnian Serat Harian', 'Pencernaan yang sehat adalah fondasi kebugaran dan glowing skin modern. BIOZENLITE adalah revolusi serat yang ringan, lezat, dan esensial.', 'Psyllium Husk, Inulin, & Fibersol :Bertindak sebagai \'pembersih\' alami usus, membantu mengeluarkan racun (detoks), dan mendukung keteraturan metabolisme.\nAloevera & Stevia : Membantu menjaga kelembaban usus, memberikan nutrisi serat tanpa tambahan gula berlebih.\nPremix Vitamin & Mineral : Mencukupi kebutuhan nutrisi harian untuk tubuh yang lebih bertenaga dan ringan', 'ZENLITE-Puranusa', 1, 350000.00, 'IDR', 479, 2018, 250, 95, 50, 1, '2025-10-08 11:38:33', '2025-10-14 02:08:16'),
(30, 'SKU-5I1TO2KKG1', 'anti aging-bio energi-ion negatif-melancarkan peredaran darah', 'BIOHEALTH PENDANT-High Ions 6000cc Energy Bio pendant', 'Lava and Tourmaline High Ions 6000cc Energy Bio pendant Glass', 'Health Benefits:\n1,Enhancement or Normalization of human immunity function\n2,Antineoplastic function\n3,Anti-carcinogen function\n4,Prevention and treatment of diseases\n5,Significant anti-senility effect\n6,Unimpeded blood pressure\n7,Enhances circulation and increases energy\n8,Harmless to skin just for help body! ', 'BIOHEALTH PENDANT Puranusa', 12, 1500000.00, 'IDR', 276, 2046, 123, 341, 200, 1, '2025-10-08 11:38:33', '2025-10-14 02:25:31'),
(31, 'SKU-TTOWZ2VEFE', 'ion negatif-alkali water-botol alkali', 'BIOFLASK- Alkaline water glass 300ml', 'PH Level reaches to PH 8-9.5 for neutralized the acid for keep body balance in healthy', '7 Filter material : ORP Ball, Germanium Ball, Negative ION Ball, Far-Infrared Ball, Hydrogen Ball, Alkaline Ball, Zinc Stone, More filter material.\n1. Neuturalize the acid for keep body balance\n2. Improve water quality of taste\n3. Neuturalize the oil for keep slim body', 'BIOFLASK - Puranusa', 12, 1300000.00, 'IDR', 311, 1682, 382, 369, 176, 1, '2025-10-08 11:38:33', '2025-10-14 13:22:46'),
(32, 'SKU-L05PJVCZ3G', 'asam urat - nyeri sendi - vitalitas - daya tahan tubuh - herbal alami', 'BIOZENERVE: Ketenangan Alami dari Akar Bumi 30 Kapsul Hitam', 'Peradangan adalah akar dari ketidaknyamanan kronis. BIOZENERVE kembali ke kearifan alam untuk memulihkan tubuh dari akarnya.', '\nPeradangan adalah akar dari ketidaknyamanan kronis. BIOZENERVE kembali ke kearifan alam untuk memulihkan tubuh dari akarnya.\nCurcumin (Kunyit): Anti-inflamasi alami terkuat. Membantu meredakan nyeri akibat peradangan pada sendi dan saraf.\nAndrographis Paniculata (Sambiloto): Dikenal luas dalam Jamu untuk meningkatkan daya tahan tubuh dan membantu proses detoksifikasi alami.\nNigella Sativa (Habbatussauda) & Propolis: Memperkuat sistem imun dan memberikan perlindungan seluler, menciptakan ketenangan alami dari dalam.\n', 'BIOZENERVE- Puranusa', 1, 350000.00, 'IDR', 107, 2446, 266, 115, 91, 1, '2025-10-08 11:38:33', '2025-10-14 02:51:30'),
(33, 'SKU-33YAPSXPBI', 'Stamina pria - Kopi kuat - Kopi Jantan - Kuat dan tahan lama', 'BIOLOVE: Vitalitas dan Kehangatan Nusantara', 'Resep Harmoni Rumah Tangga Sejak zaman dahulu, leluhur kita mencari kekuatan di alam. Purwaceng (akar legendaris dari Dieng) dan Tongkat Ali telah menjadi rahasia para raja dan ksatria. Kami melanjutkan tradisi ini dengan memadukan herbal tersebut dengan energi modern.', 'Komposisi utama:\nPurwaceng, Tongkat Ali, & Ginseng: Meningkatkan stamina, gairah, dan daya tahan tubuh secara alami.\nL-Arginine & Guarana: Memberikan dorongan energi maskulin dan menjaga vitalitas yang seimbang dan tahan lama.\nGinseng & Kopi Arabika: Membantu meningkatkan fokus dan mood positif.', 'BIOLOVE - Puranusa', 1, 350000.00, 'IDR', 138, 357, 382, 64, 63, 1, '2025-10-08 11:38:33', '2025-10-14 03:01:44'),
(34, 'SKU-VPIVK1QUJ3', 'Propolis Brazil - Anti Virus - Anti Bakteri - Anti Jamur - Anti Kanker', 'ROYAL PROPOLIS - Premium Grade Brazilian Propolis 8ml ', 'Royal Propolis memiliki kualitas produk yang sangat baik. Hal ini didukung dari berbagai pengujian yang telah terstandarisasi, Ukuran partikel 64,2 Nano Meter (PSA/ Partikel Size Analyzer), Bebas Alkohol dan Wax/Lilin, Memiliki 22 Jenis Polifenol & Flavonoid', 'ROYAL PROPOLIS\nBeberapa penelitian menunjukkan bahwa propolis memiliki sifat antibakteri, antijamur, antivirus, antiradang, dan antikanker. Hal ini membuat propolis diklaim memiliki beberapa manfaat untuk Kesehatan, membantu penyembuhan luka di kulit, membantu mengontrol kadar gula darah dan kolesterol, mengatasi radang gusi, meringankan nyeri dan pembengkakan sendi, menghambat pertumbuhan sel kanker, meningkatkan daya tahan tubuh, menjaga fungsi dan Kesehatan otak.', 'ROYAL PROPOLIS - Puranusa', 1, 200000.00, 'IDR', 201, 1233, 71, 170, 274, 1, '2025-10-08 11:38:33', '2025-10-14 03:12:03'),
(35, 'SKU-SLIMEXWMNX', 'biozenlite-kemurnian-serat-harian-slimming', 'BIOZENLITE: Kemurnian Serat Harian', 'Pencernaan yang sehat adalah fondasi kebugaran dan glowing skin modern. BIOZENLITE adalah revolusi serat yang ringan, lezat, dan esensial', 'Komposisi Utama:\nPsyllium Husk, Inulin, & Fibersol :Bertindak sebagai \'pembersih\' alami usus, membantu mengeluarkan racun (detoks), dan mendukung keteraturan metabolisme.\nAloevera & Stevia : Membantu menjaga kelembaban usus, memberikan nutrisi serat tanpa tambahan gula berlebih.\nPremix Vitamin & Mineral : Mencukupi kebutuhan nutrisi harian untuk tubuh yang lebih bertenaga dan ringan', 'ZENLITE-Puranusa', 1, 350000.00, 'IDR', 555, 120, 50, 20, 120, 1, '2025-10-14 03:23:33', '2025-10-14 03:23:33'),
(36, 'SKU-YGTEFEMINIME', 'puranusa-beauty-care-brightening-soap-feminime-spray-feminime-wash', 'PURANUSA Brightening Soap', 'Sentuhan Salmon dan Retinol: Rahasia Kulit Cerah Alami Nusantara, Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.', 'Komposisi Utama:\nDNA Salmon & Retinol: DNA Salmon kaya antioksidan dan nutrisi, bekerja sama dengan Retinol untuk meremajakan sel dan menjaga elastisitas kulit.\nGlutathione & Niacinamide: Kombinasi pencerah kulit yang efektif untuk memudarkan flek, meratakan warna kulit, dan memberikan efek glowing sejati.\nSpirulina Platensis Extract: Sumber nutrisi kulit alami yang membantu menjaga kulit dari kerusakan radikal bebas.', 'PURANUSA Brightening Soap', NULL, 30000.00, 'IDR', 235, 20, 100, 100, 100, 1, '2025-10-14 04:57:30', '2025-10-14 04:57:30'),
(37, 'SKU-WASHFEMININ', 'puranusa-feminin-wash', 'PURANUSA - Feminin Wash', 'Perisai Alami dari Sirih dan Manjakani: Kepercayaan Diri yang Murni', 'Ekstrak Daun Sirih & Manjakani: Pusaka turun-temurun. Bertindak sebagai agen pembersih dan antibakteri alami untuk menjaga keseimbangan area kewanitaan.\nCentella Asiatica Extract: Memberikan efek menenangkan, merawat kulit sensitif, dan menjaga kelembaban area intimate.\nNiacinamide & Gliserin: Terutama dalam wash, membantu menjaga kelembutan dan tampilan kulit, serta mencegah kulit kering.', 'PURANUSA - Feminin Wash', NULL, 150000.00, 'IDR', 265, 60, 100, 10, 100, 1, '2025-10-14 05:11:46', '2025-10-14 05:13:01'),
(38, 'SKU-SPRAYFEMININ', 'puranusa-feminin-spray', 'PURANUSA - Feminin Spray', 'Perisai Alami dari Sirih dan Manjakani: Kepercayaan Diri yang Murni', 'Ekstrak Daun Sirih & Manjakani: Pusaka turun-temurun. Bertindak sebagai agen pembersih dan antibakteri alami untuk menjaga keseimbangan area kewanitaan.\nCentella Asiatica Extract: Memberikan efek menenangkan, merawat kulit sensitif, dan menjaga kelembaban area intimate.\nNiacinamide & Gliserin: Terutama dalam wash, membantu menjaga kelembutan dan tampilan kulit, serta mencegah kulit kering.', 'PURANUSA - Feminin Spray', NULL, 50000.00, 'IDR', 256, 10, 100, 10, 100, 1, '2025-10-14 05:17:05', '2025-10-14 05:17:05'),
(39, 'SKU-THERATRPHEARTZ', '3-in-1-terahertz-foot-therapy', '3 in 1 Terahertz - Foot Therapy', '3 in 1 Terahertz High Potential Electro Foot Meridian Electric Massage Therapy with Red Light Therapy Custom Terahertz Device', 'Boosts Metabolism, Promote blood circulation, Activate Cells & Energy\nRegulates body temperature, Elimates toxins and waste, Remove cold and dampness, Burns fat & shapes the body, Unclogging the foot meridians, \nRelieves inflammation and pain, Relax and relieve fatigue, improve sleep\nAids in regulating the stomach and intestines, antipyretic and antibacterial', '3 in 1 Terahertz - Puranusa', 3, 5000000.00, 'IDR', 100, 3500, 400, 267, 460, 1, '2025-10-14 06:02:48', '2025-10-14 22:53:10'),
(40, 'SKU-INFRAREDPADS', 'infrared-knee-pads', 'Far Infrared Knee Pads - Tourmaline Self-heating', 'Tourmaline Self-heating Knee Wrap Far Infrared Knee Pads Magnetic Knee Brace for Arthritis, Joint Pain Relief', 'Material\nTourmaline & 8 magnet & neoprene composite fabric\n✅ Improve blood circulation effectively,\n✅ Relieve knee muscle fatigue,\n✅ Promote metabolism,\n✅ Product safety and easy to use, durable,\n✅ Releasing fatigue and easing pain,\nMagnetic energy tourmaline knee brace pads, using nano-functional ceramic powder and special thermal induction materials Composite, the heat-sensitive material releases heat when stimulated by body temperature. Temperature can be reached at 40℃(104 °F), the far-infrared anion penetrates deep into the skin and promotes blood under the increase of thermal energy. Circulate, activate cells, promote body metabolism, regulate nervous system, activate endocrine, and relieve pain cold protection, obvious effect on arthritis and joint pain.', 'Puranusa Knee Pads', 1, 750000.00, 'IDR', 100, 250, 100, 50, 100, 1, '2025-10-17 00:35:53', '2025-10-17 00:35:53'),
(41, 'SKU-WAISTTOURMALINE', 'nano-tech-lumbar-waist-brace-tourmaline', 'Nano-tech Lumbar Waist Brace Tourmaline', 'Nano-tech Self-Heating Lumbar Waist Brace Tourmaline Waist Belt with Magnetic Therapy Made of Neoprene Polyester for Health Care', 'Product Function\n\n✅Magnetic energy tourmaline Waist support belt, using nano-functional ceramic powder and special thermal induction materials Composite, the heat-sensitive material releases heat when stimulated by body temperature.Combined with the magnetic therapy of 16 piece magnets, temperature can be reached at 40℃(104 °F), the far-infrared penetrates deep into the skin and promotes blood circulation under the increase of thermal energy. Circulate blood, activate cells, promote body metabolism, adjust nervous system, activate endocrine, and relieve pain and cold protection, significant effect on lumbar discomfort such as low back pain and disc herniation.', 'Puranusa Waist Brace', 1, 1000000.00, 'IDR', 100, 1500, 300, 100, 500, 1, '2025-10-17 00:47:43', '2025-10-17 00:47:43');

INSERT INTO `promotion_products` (`id`, `promotion_id`, `product_id`, `min_qty`, `discount_value`, `discount_percent`, `bundle_price`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 1, NULL, 15.00, NULL, '2025-10-08 11:38:32', '2025-10-08 11:38:32'),
(2, 1, NULL, 2, NULL, 15.00, NULL, '2025-10-08 11:38:32', '2025-10-08 11:38:32'),
(3, 1, NULL, 3, NULL, 15.00, NULL, '2025-10-08 11:38:32', '2025-10-08 11:38:32'),
(4, 1, NULL, 1, NULL, 15.00, NULL, '2025-10-08 11:38:32', '2025-10-08 11:38:32'),
(5, 1, NULL, 2, NULL, 15.00, NULL, '2025-10-08 11:38:32', '2025-10-08 11:38:32'),
(6, 2, NULL, 1, 20000.00, NULL, NULL, '2025-10-08 11:38:32', '2025-10-08 11:38:32'),
(7, 2, NULL, 2, 20000.00, NULL, NULL, '2025-10-08 11:38:32', '2025-10-08 11:38:32'),
(8, 2, NULL, 2, 20000.00, NULL, NULL, '2025-10-08 11:38:32', '2025-10-08 11:38:32'),
(9, 2, NULL, 2, 20000.00, NULL, NULL, '2025-10-08 11:38:32', '2025-10-08 11:38:32'),
(10, 3, NULL, 2, NULL, NULL, 99000.00, '2025-10-08 11:38:32', '2025-10-08 11:38:32');

INSERT INTO `promotions` (`id`, `code`, `name`, `type`, `landing_slug`, `description`, `image`, `start_at`, `end_at`, `is_active`, `priority`, `max_redemption`, `per_user_limit`, `conditions_json`, `show_on`, `custom_html`, `page`, `created_at`, `updated_at`) VALUES
(1, 'DISC15', 'Coming Soon', 'BUNDLE_PRICE', 'ad-omnis-et-aspernatur-ut-qui-iste-harum', '<p>&quot;ERA BARU Dimulai! Temukan Produk Inovatif &amp; Pilihan Terbaik, Hanya di PURANUSA.ID&quot;</p>', 'images/promotion/01K8Q15HT9D1ME2V9RQ6QXFWTV.png', '2025-10-05 11:38:00', '2025-11-30 11:38:00', 1, 1, 3092, NULL, '{\"min_spend\": 100000}', 'HERO', NULL, 'beranda', '2025-10-08 11:38:32', '2025-10-29 19:17:38'),
(2, 'LESS20K', '3 in 1 Terahertz', 'CASHBACK', 'et-ex-omnis-nihil', '<p><strong>3 in 1 Terahertz</strong> High Potential Electro Foot Meridian Electric Massage Therapy with Red Light Therapy Custom Terahertz Device</p>', 'images/promotion/01K7F54RFRHZSPNB9GR73Z6FPA.jpg', '2025-10-06 11:38:00', '2025-12-31 11:38:00', 1, 3, 100, NULL, '{\"bank\": \"BNI\"}', 'BANNER', NULL, 'beranda', '2025-10-08 11:38:32', '2025-10-29 19:17:07'),
(3, 'WEEKEND-BUNDLE', 'Tampil Ideal', 'FLASH_SALE', 'eveniet-a-omnis-in-quae', '<p>Pencernaan yang sehat adalah fondasi kebugaran dan <em>glowing skin</em> modern. <strong>BIOZENLITE</strong> adalah revolusi serat yang ringan, lezat, dan esensial</p>', 'images/promotion/01K8Q0R5CT5C8DPC5DG2PXMNNE.png', '2025-10-08 11:38:00', '2025-12-31 11:38:00', 1, 3, 1624, NULL, '{\"bank\": \"BNI\"}', 'BANNER', NULL, 'beranda', '2025-10-08 11:38:32', '2025-10-29 19:18:38');

INSERT INTO `refunds` (`id`, `order_id`, `payment_id`, `status`, `amount`, `reason`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'REFUNDED', 50000.00, 'Quasi optio culpa amet aut.', '2025-10-08 11:38:33', '2025-10-08 11:38:33');

INSERT INTO `return_items` (`id`, `return_id`, `order_item_id`, `qty`, `condition_note`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 'Inventore rerum placeat fugiat aspernatur officiis.', '2025-10-08 11:38:33', '2025-10-08 11:38:33');

INSERT INTO `returns` (`id`, `order_id`, `status`, `reason`, `requested_at`, `processed_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'APPROVED', 'Wrong item', '2025-10-08 11:38:33', '2025-10-08 11:38:33', '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(2, 5, 'REQUESTED', 'Size not fit', '2025-10-08 11:38:33', NULL, '2025-10-08 11:38:33', '2025-10-08 11:38:33');

INSERT INTO `shipment_items` (`id`, `shipment_id`, `order_item_id`, `qty`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(2, 1, 2, 1, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(3, 1, 3, 2, '2025-10-08 11:38:33', '2025-10-08 11:38:33');

INSERT INTO `shipments` (`id`, `order_id`, `courier_id`, `tracking_no`, `status`, `shipped_at`, `delivered_at`, `shipping_fee`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'QDQILJTPZGII', 'IN_TRANSIT', '2025-10-08 11:38:33', NULL, 34076.86, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(2, 2, 2, 'SXEC53RMBDZT', 'READY_TO_SHIP', NULL, NULL, 46066.71, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(3, 3, 3, 'DV4NQNQCMYYL', 'READY_TO_SHIP', NULL, NULL, 2572.99, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(4, 4, 4, 'ZUQHQ7VFZ5BF', 'READY_TO_SHIP', NULL, NULL, 17678.91, '2025-10-08 11:38:33', '2025-10-08 11:38:33'),
(5, 4, 3, 'TRK-68F21D4288E69', 'RETURNED', '2025-10-18 00:42:11', '2025-10-18 00:42:24', 1000.00, '2025-10-18 00:42:30', '2025-10-18 00:42:30');

INSERT INTO `wishlists` (`id`, `customer_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 1, 'My Wishlist', '2025-10-28 17:43:31', '2025-10-28 17:43:31'),
(2, 6, 'My Wishlist', '2025-10-28 18:55:30', '2025-10-28 18:55:30');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;