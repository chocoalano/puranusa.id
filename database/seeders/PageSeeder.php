<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => 'Tentang Kami',
                'slug' => 'about',
                'content' => '<h2>Tentang Puranusa</h2><p>Puranusa adalah destinasi belanja online terpercaya untuk kebutuhan teknologi dan gaya hidup Anda. Kami menyediakan produk berkualitas tinggi dengan harga terbaik.</p><p>Sejak didirikan, kami telah melayani ribuan pelanggan di seluruh Indonesia dengan komitmen untuk memberikan pengalaman belanja terbaik.</p>',
                'seo_title' => 'Tentang Puranusa - Platform Belanja Online Terpercaya',
                'seo_description' => 'Pelajari lebih lanjut tentang Puranusa, platform belanja online terpercaya yang menyediakan produk berkualitas dengan harga terbaik.',
                'is_published' => true,
                'template' => 'default',
                'order' => 1,
            ],
            [
                'title' => 'Kebijakan Privasi',
                'slug' => 'privacy',
                'content' => '<h2>Kebijakan Privasi</h2><p>Puranusa menghargai privasi Anda. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.</p><h3>Informasi yang Kami Kumpulkan</h3><p>Kami mengumpulkan informasi yang Anda berikan saat mendaftar, berbelanja, atau berinteraksi dengan website kami.</p><h3>Penggunaan Informasi</h3><p>Informasi yang kami kumpulkan digunakan untuk memproses pesanan, meningkatkan layanan, dan berkomunikasi dengan Anda.</p>',
                'seo_title' => 'Kebijakan Privasi - Puranusa',
                'seo_description' => 'Baca kebijakan privasi Puranusa untuk memahami bagaimana kami melindungi dan menggunakan data pribadi Anda.',
                'is_published' => true,
                'template' => 'default',
                'order' => 2,
            ],
            [
                'title' => 'Syarat & Ketentuan',
                'slug' => 'terms',
                'content' => '<h2>Syarat & Ketentuan</h2><p>Dengan menggunakan website Puranusa, Anda setuju untuk mematuhi syarat dan ketentuan berikut.</p><h3>Penggunaan Website</h3><p>Website ini hanya boleh digunakan untuk tujuan yang sah dan tidak melanggar hukum yang berlaku.</p><h3>Transaksi</h3><p>Semua transaksi di Puranusa tunduk pada ketersediaan produk dan konfirmasi pembayaran.</p>',
                'seo_title' => 'Syarat & Ketentuan - Puranusa',
                'seo_description' => 'Baca syarat dan ketentuan penggunaan layanan Puranusa sebelum berbelanja di platform kami.',
                'is_published' => true,
                'template' => 'default',
                'order' => 3,
            ],
            [
                'title' => 'Hubungi Kami',
                'slug' => 'contact',
                'content' => '<h2>Hubungi Kami</h2><p>Kami siap membantu Anda. Hubungi kami melalui:</p><ul><li><strong>Email:</strong> support@puranusa.id</li><li><strong>Telepon:</strong> +62 21 1234 5678</li><li><strong>WhatsApp:</strong> +62 812 3456 7890</li><li><strong>Alamat:</strong> Jl. Contoh No. 123, Jakarta, Indonesia</li></ul><p>Tim customer service kami tersedia Senin - Jumat, 09:00 - 18:00 WIB.</p>',
                'seo_title' => 'Hubungi Kami - Puranusa Customer Service',
                'seo_description' => 'Butuh bantuan? Hubungi customer service Puranusa melalui email, telepon, atau WhatsApp.',
                'is_published' => true,
                'template' => 'default',
                'order' => 4,
            ],
            [
                'title' => 'FAQ - Pertanyaan Umum',
                'slug' => 'faq',
                'content' => '<h2>Pertanyaan yang Sering Diajukan</h2><h3>Bagaimana cara memesan produk?</h3><p>Pilih produk yang Anda inginkan, tambahkan ke keranjang, dan lakukan checkout dengan mengikuti panduan yang tersedia.</p><h3>Metode pembayaran apa saja yang tersedia?</h3><p>Kami menerima transfer bank, kartu kredit, dan e-wallet seperti GoPay dan OVO.</p><h3>Berapa lama waktu pengiriman?</h3><p>Waktu pengiriman bervariasi tergantung lokasi Anda, biasanya 2-5 hari kerja.</p>',
                'seo_title' => 'FAQ - Pertanyaan Umum Puranusa',
                'seo_description' => 'Temukan jawaban untuk pertanyaan umum tentang belanja di Puranusa.',
                'is_published' => true,
                'template' => 'default',
                'order' => 5,
            ],
        ];

        foreach ($pages as $page) {
            Page::create($page);
        }
    }
}
