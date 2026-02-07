<?php

namespace Database\Seeders;

use App\Models\Content;
use App\Models\ContentsCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ZennerClubSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $creatorId = User::query()
            ->where('role', 'superadmin')
            ->orWhere('role', 'admin')
            ->value('id');

        if (! $creatorId) {
            $creatorId = User::query()->value('id');
        }

        $seedItems = [
            [
                'title' => 'Welcome Video',
                'content' => <<<HTML
<div class="space-y-4">
  <div class="aspect-video w-full overflow-hidden rounded-lg border">
    <iframe
      class="h-full w-full"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=1"
      title="Welcome Video"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <p>Selamat datang di Zenner Club. Video ini otomatis diputar dan dapat diganti sesuai kebutuhan.</p>
</div>
HTML,
                'vlink' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            ],
            [
                'title' => 'Join Medsos',
                'content' => <<<HTML
<div class="space-y-3">
  <p>Data komunitas diambil otomatis dari API media sosial.</p>
  <div data-source="api" class="rounded-md border p-4 text-sm text-muted-foreground">
    Data akan ditampilkan di sini setelah integrasi API aktif.
  </div>
</div>
HTML,
            ],
            [
                'title' => 'Marketing Kit',
                'content' => <<<HTML
<ul>
  <li>Logo & brand guideline</li>
  <li>Template poster & banner</li>
  <li>Presentasi produk (PDF)</li>
  <li>Copy materi promosi siap pakai</li>
</ul>
HTML,
            ],
            [
                'title' => 'Copywriting',
                'content' => <<<HTML
<h3>Template Copy</h3>
<ul>
  <li>Hook: "Sudah coba solusi ini?"</li>
  <li>Problem: jelaskan pain point customer.</li>
  <li>Solution: perkenalkan produk + manfaat utama.</li>
  <li>CTA: ajak untuk order/DM.</li>
</ul>
HTML,
            ],
            [
                'title' => 'Foto dan Video',
                'content' => <<<HTML
<p>Koleksi foto & video promosi. Unggah file terbaru untuk kebutuhan kampanye.</p>
HTML,
            ],
            [
                'title' => 'Procure Produk & Insentif Program',
                'content' => <<<HTML
<ol>
  <li>Pilih paket produk sesuai level.</li>
  <li>Ikuti program insentif yang sedang berjalan.</li>
  <li>Laporkan progress ke upline atau admin.</li>
</ol>
HTML,
            ],
            [
                'title' => 'Testimoni Produk',
                'content' => <<<HTML
<blockquote>
  "Produk ini membantu saya meningkatkan percaya diri dan penjualan." — Member Zenner Club
</blockquote>
HTML,
            ],
            [
                'title' => 'Zenner Academy',
                'content' => <<<HTML
<p>Modul pembelajaran Zenner Academy tersedia untuk meningkatkan skill penjualan dan leadership.</p>
HTML,
            ],
            [
                'title' => 'Skema Insentif Program',
                'content' => <<<HTML
<table>
  <thead>
    <tr>
      <th>Level</th>
      <th>Syarat</th>
      <th>Insentif</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Starter</td>
      <td>5 transaksi</td>
      <td>Bonus 5%</td>
    </tr>
  </tbody>
</table>
HTML,
            ],
            [
                'title' => 'Produk Knowledge',
                'content' => <<<HTML
<ul>
  <li>Manfaat utama produk</li>
  <li>Komposisi & keunggulan</li>
  <li>FAQ penggunaan</li>
</ul>
HTML,
            ],
            [
                'title' => 'Cara Jualan (Organik)',
                'content' => <<<HTML
<ol>
  <li>Bangun kepercayaan lewat edukasi.</li>
  <li>Gunakan testimoni real.</li>
  <li>Follow up konsisten.</li>
</ol>
HTML,
            ],
            [
                'title' => 'Cara Iklan (Ads)',
                'content' => <<<HTML
<ol>
  <li>Tentukan target audience.</li>
  <li>Siapkan materi kreatif.</li>
  <li>Analisa hasil dan optimasi.</li>
</ol>
HTML,
            ],
            [
                'title' => 'Webinar & Online Training Jadwal',
                'content' => <<<HTML
<table>
  <thead>
    <tr>
      <th>Tanggal</th>
      <th>Judul</th>
      <th>Link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2026-02-15</td>
      <td>Kickoff Zenner Club</td>
      <td>Zoom (link akan diperbarui)</td>
    </tr>
  </tbody>
</table>
HTML,
            ],
            [
                'title' => 'Leaderboard',
                'content' => <<<HTML
<p>Leaderboard menampilkan peringkat member berdasarkan performa bulan ini.</p>
HTML,
            ],
            [
                'title' => 'Sertifikat Program',
                'content' => <<<HTML
<p>Unduh sertifikat setelah menyelesaikan program pelatihan.</p>
HTML,
            ],
            [
                'title' => 'Monthly Challenge',
                'content' => <<<HTML
<h3>Syarat</h3>
<ul>
  <li>Minimal 10 transaksi.</li>
  <li>Posting 5 konten promosi.</li>
</ul>
<h3>Hadiah</h3>
<ul>
  <li>Voucher belanja</li>
  <li>Bonus cash reward</li>
</ul>
HTML,
            ],
            [
                'title' => 'Top Affiliate',
                'content' => <<<HTML
<p>Daftar klansmen sementara untuk bulan berjalan.</p>
HTML,
            ],
            [
                'title' => 'Hall of Fame',
                'content' => <<<HTML
<p>Daftar pemenang pride sebelumnya akan ditampilkan di sini.</p>
HTML,
            ],
            [
                'title' => 'Rules & FAQ',
                'content' => <<<HTML
<ul>
  <li>Ikuti aturan komunitas dan etika bisnis.</li>
  <li>FAQ utama terkait program Zenner Club.</li>
</ul>
HTML,
            ],
            [
                'title' => 'Kode Etik',
                'content' => <<<HTML
<ol>
  <li>Jujur dan transparan.</li>
  <li>Tidak menjanjikan hal di luar ketentuan.</li>
  <li>Menjaga nama baik perusahaan.</li>
</ol>
HTML,
            ],
            [
                'title' => 'FAQ',
                'content' => <<<HTML
<dl>
  <dt>Bagaimana cara bergabung?</dt>
  <dd>Hubungi admin atau upline untuk registrasi.</dd>
  <dt>Bagaimana cara klaim insentif?</dt>
  <dd>Pastikan target terpenuhi dan konfirmasi ke admin.</dd>
</dl>
HTML,
            ],
        ];

        $categorySlugs = [];
        $contentSlugs = [];

        foreach ($seedItems as $item) {
            $categorySlug = $this->makeListSlug($item['title'], $categorySlugs);

            $category = ContentsCategory::firstOrCreate(
                ['slug' => $categorySlug],
                [
                    'name' => $item['title'],
                    'parent_id' => null,
                ]
            );

            $contentSlug = $this->makeListSlug($item['title'], $contentSlugs);

            Content::firstOrCreate(
                ['slug' => $contentSlug],
                [
                    'category_id' => $category->id,
                    'title' => $item['title'],
                    'content' => $item['content'],
                    'file' => $item['file'] ?? null,
                    'vlink' => $item['vlink'] ?? null,
                    'status' => 'published',
                    'created_by' => $creatorId,
                ]
            );
        }
    }

    private function makeListSlug(string $base, array &$usedSlugs): string
    {
        $slug = Str::slug($base);
        $original = $slug;
        $counter = 1;

        while (in_array($slug, $usedSlugs, true)) {
            $slug = $original.'-'.$counter;
            $counter++;
        }

        $usedSlugs[] = $slug;

        return $slug;
    }
}
