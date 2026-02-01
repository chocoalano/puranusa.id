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
                'content' => '<h2>Tentang Puranusa</h2><p>Puranusa adalah destinasi belanja online terpercaya untuk kebutuhan teknologi dan gaya hidup Anda.</p>',
                'blocks' => [
                    ['id' => 'about-1', 'type' => 'heading', 'content' => ['text' => 'Tentang Puranusa', 'level' => 2]],
                    ['id' => 'about-2', 'type' => 'paragraph', 'content' => ['text' => 'Puranusa adalah destinasi belanja online terpercaya untuk kebutuhan teknologi dan gaya hidup Anda. Kami menyediakan produk berkualitas tinggi dengan harga terbaik.']],
                    ['id' => 'about-3', 'type' => 'divider', 'content' => []],
                    ['id' => 'about-4', 'type' => 'heading', 'content' => ['text' => 'Visi Kami', 'level' => 3]],
                    ['id' => 'about-5', 'type' => 'paragraph', 'content' => ['text' => 'Menjadi platform e-commerce terdepan di Indonesia yang memberikan pengalaman belanja online terbaik dengan produk berkualitas dan layanan pelanggan yang unggul.']],
                    ['id' => 'about-6', 'type' => 'heading', 'content' => ['text' => 'Misi Kami', 'level' => 3]],
                    ['id' => 'about-7', 'type' => 'list', 'content' => ['ordered' => false, 'items' => [
                        'Menyediakan produk berkualitas tinggi dengan harga kompetitif',
                        'Memberikan layanan pelanggan yang responsif dan profesional',
                        'Memastikan proses belanja yang aman, mudah, dan menyenangkan',
                        'Mendukung pertumbuhan ekonomi digital di Indonesia',
                    ]]],
                    ['id' => 'about-8', 'type' => 'divider', 'content' => []],
                    ['id' => 'about-9', 'type' => 'heading', 'content' => ['text' => 'Mengapa Memilih Puranusa?', 'level' => 3]],
                    ['id' => 'about-10', 'type' => 'list', 'content' => ['ordered' => true, 'items' => [
                        'Produk 100% Original dan Berkualitas',
                        'Pengiriman Cepat ke Seluruh Indonesia',
                        'Customer Service Profesional',
                        'Garansi Resmi untuk Setiap Produk',
                        'Pembayaran Aman dan Terpercaya',
                    ]]],
                    ['id' => 'about-11', 'type' => 'paragraph', 'content' => ['text' => 'Sejak didirikan, kami telah melayani ribuan pelanggan di seluruh Indonesia dengan komitmen untuk memberikan pengalaman belanja terbaik. Terima kasih telah mempercayakan kebutuhan belanja Anda kepada Puranusa.']],
                ],
                'seo_title' => 'Tentang Puranusa - Platform Belanja Online Terpercaya',
                'seo_description' => 'Pelajari lebih lanjut tentang Puranusa, platform belanja online terpercaya yang menyediakan produk berkualitas dengan harga terbaik.',
                'is_published' => true,
                'template' => 'default',
                'order' => 1,
            ],
            [
                'title' => 'Kebijakan Privasi',
                'slug' => 'privacy',
                'content' => '<h2>Kebijakan Privasi</h2><p>Puranusa menghargai privasi Anda.</p>',
                'blocks' => [
                    ['id' => 'priv-1', 'type' => 'heading', 'content' => ['text' => 'Kebijakan Privasi', 'level' => 2]],
                    ['id' => 'priv-2', 'type' => 'paragraph', 'content' => ['text' => 'Puranusa menghargai privasi Anda. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan layanan kami.']],
                    ['id' => 'priv-3', 'type' => 'divider', 'content' => []],
                    ['id' => 'priv-4', 'type' => 'heading', 'content' => ['text' => '1. Informasi yang Kami Kumpulkan', 'level' => 3]],
                    ['id' => 'priv-5', 'type' => 'paragraph', 'content' => ['text' => 'Kami mengumpulkan informasi berikut saat Anda menggunakan layanan kami:']],
                    ['id' => 'priv-6', 'type' => 'list', 'content' => ['ordered' => false, 'items' => [
                        'Informasi akun: nama, email, nomor telepon, dan alamat',
                        'Informasi transaksi: riwayat pesanan dan detail pembayaran',
                        'Informasi teknis: alamat IP, jenis browser, dan data perangkat',
                        'Informasi penggunaan: halaman yang dikunjungi dan interaksi dengan website',
                    ]]],
                    ['id' => 'priv-7', 'type' => 'heading', 'content' => ['text' => '2. Penggunaan Informasi', 'level' => 3]],
                    ['id' => 'priv-8', 'type' => 'paragraph', 'content' => ['text' => 'Informasi yang kami kumpulkan digunakan untuk:']],
                    ['id' => 'priv-9', 'type' => 'list', 'content' => ['ordered' => false, 'items' => [
                        'Memproses dan mengelola pesanan Anda',
                        'Meningkatkan kualitas layanan dan pengalaman pengguna',
                        'Mengirimkan informasi terkait pesanan dan promosi',
                        'Menjaga keamanan akun dan mencegah penipuan',
                    ]]],
                    ['id' => 'priv-10', 'type' => 'heading', 'content' => ['text' => '3. Perlindungan Data', 'level' => 3]],
                    ['id' => 'priv-11', 'type' => 'paragraph', 'content' => ['text' => 'Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data pribadi Anda dari akses tidak sah, pengubahan, pengungkapan, atau penghancuran.']],
                    ['id' => 'priv-12', 'type' => 'heading', 'content' => ['text' => '4. Hak Pengguna', 'level' => 3]],
                    ['id' => 'priv-13', 'type' => 'paragraph', 'content' => ['text' => 'Anda memiliki hak untuk mengakses, memperbarui, atau menghapus data pribadi Anda. Hubungi kami melalui halaman Kontak untuk menggunakan hak-hak tersebut.']],
                ],
                'seo_title' => 'Kebijakan Privasi - Puranusa',
                'seo_description' => 'Baca kebijakan privasi Puranusa untuk memahami bagaimana kami melindungi dan menggunakan data pribadi Anda.',
                'is_published' => true,
                'template' => 'default',
                'order' => 2,
            ],
            [
                'title' => 'Syarat & Ketentuan',
                'slug' => 'terms',
                'content' => '<h2>Syarat & Ketentuan</h2><p>Dengan menggunakan website Puranusa, Anda setuju untuk mematuhi syarat dan ketentuan berikut.</p>',
                'blocks' => [
                    ['id' => 'terms-1', 'type' => 'heading', 'content' => ['text' => 'Syarat & Ketentuan', 'level' => 2]],
                    ['id' => 'terms-2', 'type' => 'paragraph', 'content' => ['text' => 'Dengan mengakses dan menggunakan website Puranusa, Anda menyetujui dan terikat oleh syarat dan ketentuan berikut. Mohon baca dengan seksama sebelum melakukan transaksi.']],
                    ['id' => 'terms-3', 'type' => 'divider', 'content' => []],
                    ['id' => 'terms-4', 'type' => 'heading', 'content' => ['text' => '1. Penggunaan Website', 'level' => 3]],
                    ['id' => 'terms-5', 'type' => 'paragraph', 'content' => ['text' => 'Website ini hanya boleh digunakan untuk tujuan yang sah dan tidak melanggar hukum yang berlaku di Republik Indonesia. Pengguna dilarang menggunakan website untuk tujuan penipuan atau aktivitas ilegal lainnya.']],
                    ['id' => 'terms-6', 'type' => 'heading', 'content' => ['text' => '2. Akun Pengguna', 'level' => 3]],
                    ['id' => 'terms-7', 'type' => 'list', 'content' => ['ordered' => false, 'items' => [
                        'Anda bertanggung jawab untuk menjaga kerahasiaan akun dan password Anda',
                        'Informasi yang Anda berikan harus akurat dan terkini',
                        'Satu akun hanya untuk satu pengguna dan tidak boleh dipindahtangankan',
                        'Kami berhak menangguhkan akun yang melanggar ketentuan ini',
                    ]]],
                    ['id' => 'terms-8', 'type' => 'heading', 'content' => ['text' => '3. Transaksi & Pembayaran', 'level' => 3]],
                    ['id' => 'terms-9', 'type' => 'paragraph', 'content' => ['text' => 'Semua transaksi di Puranusa tunduk pada ketersediaan produk dan konfirmasi pembayaran. Harga produk dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.']],
                    ['id' => 'terms-10', 'type' => 'list', 'content' => ['ordered' => true, 'items' => [
                        'Pembayaran harus dilakukan dalam batas waktu yang ditentukan',
                        'Pesanan yang belum dibayar akan otomatis dibatalkan',
                        'Konfirmasi pesanan akan dikirim melalui email',
                    ]]],
                    ['id' => 'terms-11', 'type' => 'heading', 'content' => ['text' => '4. Pengiriman', 'level' => 3]],
                    ['id' => 'terms-12', 'type' => 'paragraph', 'content' => ['text' => 'Pengiriman dilakukan melalui jasa ekspedisi yang bekerja sama dengan Puranusa. Waktu pengiriman bervariasi tergantung lokasi tujuan dan metode pengiriman yang dipilih.']],
                    ['id' => 'terms-13', 'type' => 'heading', 'content' => ['text' => '5. Pengembalian & Refund', 'level' => 3]],
                    ['id' => 'terms-14', 'type' => 'paragraph', 'content' => ['text' => 'Pengembalian produk dapat dilakukan dalam waktu 7 hari setelah produk diterima dengan syarat produk dalam kondisi asli dan belum digunakan. Refund akan diproses dalam 7-14 hari kerja.']],
                ],
                'seo_title' => 'Syarat & Ketentuan - Puranusa',
                'seo_description' => 'Baca syarat dan ketentuan penggunaan layanan Puranusa sebelum berbelanja di platform kami.',
                'is_published' => true,
                'template' => 'default',
                'order' => 3,
            ],
            [
                'title' => 'Hubungi Kami',
                'slug' => 'contact',
                'content' => '<h2>Hubungi Kami</h2><p>Kami siap membantu Anda.</p>',
                'blocks' => [
                    ['id' => 'contact-1', 'type' => 'heading', 'content' => ['text' => 'Hubungi Kami', 'level' => 2]],
                    ['id' => 'contact-2', 'type' => 'paragraph', 'content' => ['text' => 'Kami siap membantu Anda! Jangan ragu untuk menghubungi tim kami melalui salah satu saluran di bawah ini.']],
                    ['id' => 'contact-3', 'type' => 'divider', 'content' => []],
                    ['id' => 'contact-4', 'type' => 'heading', 'content' => ['text' => 'Informasi Kontak', 'level' => 3]],
                    ['id' => 'contact-5', 'type' => 'list', 'content' => ['ordered' => false, 'items' => [
                        'Email: support@puranusa.id',
                        'Telepon: +62 21 1234 5678',
                        'WhatsApp: +62 812 3456 7890',
                    ]]],
                    ['id' => 'contact-6', 'type' => 'heading', 'content' => ['text' => 'Alamat Kantor', 'level' => 3]],
                    ['id' => 'contact-7', 'type' => 'paragraph', 'content' => ['text' => 'Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345, Indonesia']],
                    ['id' => 'contact-8', 'type' => 'heading', 'content' => ['text' => 'Jam Operasional', 'level' => 3]],
                    ['id' => 'contact-9', 'type' => 'list', 'content' => ['ordered' => false, 'items' => [
                        'Senin - Jumat: 09:00 - 18:00 WIB',
                        'Sabtu: 09:00 - 15:00 WIB',
                        'Minggu & Hari Libur: Tutup',
                    ]]],
                    ['id' => 'contact-10', 'type' => 'divider', 'content' => []],
                    ['id' => 'contact-11', 'type' => 'quote', 'content' => ['text' => 'Kami berusaha merespons setiap pertanyaan dalam waktu maksimal 1x24 jam kerja.']],
                ],
                'seo_title' => 'Hubungi Kami - Puranusa Customer Service',
                'seo_description' => 'Butuh bantuan? Hubungi customer service Puranusa melalui email, telepon, atau WhatsApp.',
                'is_published' => true,
                'template' => 'default',
                'order' => 4,
            ],
            [
                'title' => 'FAQ - Pertanyaan Umum',
                'slug' => 'faq',
                'content' => '<h2>Pertanyaan yang Sering Diajukan</h2>',
                'blocks' => [
                    ['id' => 'faq-1', 'type' => 'heading', 'content' => ['text' => 'Pertanyaan yang Sering Diajukan (FAQ)', 'level' => 2]],
                    ['id' => 'faq-2', 'type' => 'paragraph', 'content' => ['text' => 'Temukan jawaban untuk pertanyaan umum seputar belanja di Puranusa.']],
                    ['id' => 'faq-3', 'type' => 'divider', 'content' => []],
                    ['id' => 'faq-4', 'type' => 'heading', 'content' => ['text' => 'Pemesanan', 'level' => 3]],
                    ['id' => 'faq-5', 'type' => 'heading', 'content' => ['text' => 'Bagaimana cara memesan produk?', 'level' => 3]],
                    ['id' => 'faq-6', 'type' => 'list', 'content' => ['ordered' => true, 'items' => [
                        'Pilih produk yang Anda inginkan',
                        'Tambahkan ke keranjang belanja',
                        'Klik tombol Checkout',
                        'Isi alamat pengiriman',
                        'Pilih metode pembayaran dan selesaikan pesanan',
                    ]]],
                    ['id' => 'faq-7', 'type' => 'heading', 'content' => ['text' => 'Apakah saya harus membuat akun untuk berbelanja?', 'level' => 3]],
                    ['id' => 'faq-8', 'type' => 'paragraph', 'content' => ['text' => 'Ya, Anda perlu membuat akun untuk melakukan pemesanan. Dengan memiliki akun, Anda dapat melacak pesanan, menyimpan alamat, dan mendapatkan promo eksklusif.']],
                    ['id' => 'faq-9', 'type' => 'divider', 'content' => []],
                    ['id' => 'faq-10', 'type' => 'heading', 'content' => ['text' => 'Pembayaran', 'level' => 3]],
                    ['id' => 'faq-11', 'type' => 'heading', 'content' => ['text' => 'Metode pembayaran apa saja yang tersedia?', 'level' => 3]],
                    ['id' => 'faq-12', 'type' => 'paragraph', 'content' => ['text' => 'Kami menerima berbagai metode pembayaran:']],
                    ['id' => 'faq-13', 'type' => 'list', 'content' => ['ordered' => false, 'items' => [
                        'Transfer Bank (BCA, Mandiri, BNI, BRI)',
                        'Kartu Kredit/Debit (Visa, Mastercard)',
                        'E-Wallet (GoPay, OVO, Dana, ShopeePay)',
                        'Virtual Account',
                    ]]],
                    ['id' => 'faq-14', 'type' => 'divider', 'content' => []],
                    ['id' => 'faq-15', 'type' => 'heading', 'content' => ['text' => 'Pengiriman', 'level' => 3]],
                    ['id' => 'faq-16', 'type' => 'heading', 'content' => ['text' => 'Berapa lama waktu pengiriman?', 'level' => 3]],
                    ['id' => 'faq-17', 'type' => 'paragraph', 'content' => ['text' => 'Waktu pengiriman bervariasi tergantung lokasi Anda:']],
                    ['id' => 'faq-18', 'type' => 'list', 'content' => ['ordered' => false, 'items' => [
                        'Jabodetabek: 1-2 hari kerja',
                        'Pulau Jawa: 2-3 hari kerja',
                        'Luar Jawa: 3-5 hari kerja',
                        'Indonesia Timur: 5-7 hari kerja',
                    ]]],
                    ['id' => 'faq-19', 'type' => 'heading', 'content' => ['text' => 'Bagaimana cara melacak pesanan saya?', 'level' => 3]],
                    ['id' => 'faq-20', 'type' => 'paragraph', 'content' => ['text' => 'Setelah pesanan dikirim, Anda akan menerima nomor resi melalui email. Anda juga dapat melacak status pesanan melalui halaman akun Anda di menu "Pesanan Saya".']],
                    ['id' => 'faq-21', 'type' => 'divider', 'content' => []],
                    ['id' => 'faq-22', 'type' => 'heading', 'content' => ['text' => 'Pengembalian & Refund', 'level' => 3]],
                    ['id' => 'faq-23', 'type' => 'heading', 'content' => ['text' => 'Bagaimana cara mengembalikan produk?', 'level' => 3]],
                    ['id' => 'faq-24', 'type' => 'paragraph', 'content' => ['text' => 'Hubungi customer service kami dalam waktu 7 hari setelah produk diterima. Pastikan produk dalam kondisi asli, belum digunakan, dan masih dalam kemasan asli.']],
                ],
                'seo_title' => 'FAQ - Pertanyaan Umum Puranusa',
                'seo_description' => 'Temukan jawaban untuk pertanyaan umum tentang belanja di Puranusa.',
                'is_published' => true,
                'template' => 'default',
                'order' => 5,
            ],
        ];

        foreach ($pages as $page) {
            Page::updateOrCreate(
                ['slug' => $page['slug']],
                $page
            );
        }
    }
}
