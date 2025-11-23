<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    BookOpen,
    ShoppingCart,
    Users,
    TrendingUp,
    Wallet,
    Grid3x3,
    Package,
    Settings,
    CreditCard,
    Truck,
    Star,
    BadgePercent,
    CheckCircle,
    AlertCircle,
    Info,
    ArrowRight,
} from 'lucide-vue-next';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Documentation', href: '/admin/documentation' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="rounded-xl p-4 space-y-6 py-6">

            <Head title="Dokumentasi Aplikasi" />

            <div class="flex flex-col gap-6">
                <!-- Header -->
                <div class="flex items-start justify-between">
                    <div class="space-y-1">
                        <h1 class="text-3xl font-bold tracking-tight">Dokumentasi Aplikasi</h1>
                        <p class="text-muted-foreground">
                            Panduan lengkap penggunaan sistem E-Commerce MLM Puranusa
                        </p>
                    </div>
                    <Badge variant="secondary" class="text-sm">
                        <Info class="w-4 h-4 mr-1" />
                        Version 1.0.0
                    </Badge>
                </div>

                <!-- Quick Start Guide -->
                <Card>
                    <CardHeader>
                        <div class="flex items-center gap-2">
                            <BookOpen class="w-5 h-5 text-primary" />
                            <CardTitle>Panduan Cepat</CardTitle>
                        </div>
                        <CardDescription>Memulai menggunakan aplikasi dalam 3 langkah</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="grid gap-4 md:grid-cols-3">
                            <div class="flex gap-4 p-4 rounded-lg border bg-card">
                                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <span class="text-lg font-bold text-primary">1</span>
                                </div>
                                <div class="flex-1 space-y-1">
                                    <h4 class="font-semibold">Login ke Sistem</h4>
                                    <p class="text-sm text-muted-foreground">
                                        Gunakan kredensial admin untuk mengakses dashboard
                                    </p>
                                </div>
                            </div>
                            <div class="flex gap-4 p-4 rounded-lg border bg-card">
                                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <span class="text-lg font-bold text-primary">2</span>
                                </div>
                                <div class="flex-1 space-y-1">
                                    <h4 class="font-semibold">Kelola Konten</h4>
                                    <p class="text-sm text-muted-foreground">
                                        Tambahkan produk, kelola pesanan, dan atur member
                                    </p>
                                </div>
                            </div>
                            <div class="flex gap-4 p-4 rounded-lg border bg-card">
                                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <span class="text-lg font-bold text-primary">3</span>
                                </div>
                                <div class="flex-1 space-y-1">
                                    <h4 class="font-semibold">Monitor & Analisa</h4>
                                    <p class="text-sm text-muted-foreground">
                                        Pantau penjualan, bonus, dan performa jaringan
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Main Documentation Tabs -->
                <Tabs default-value="overview" class="w-full">
                    <TabsList class="grid w-full grid-cols-5">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="ecommerce">E-Commerce</TabsTrigger>
                        <TabsTrigger value="mlm">MLM System</TabsTrigger>
                        <TabsTrigger value="management">Manajemen</TabsTrigger>
                        <TabsTrigger value="api">API Response</TabsTrigger>
                    </TabsList>

                    <!-- Overview Tab -->
                    <TabsContent value="overview" class="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tentang Aplikasi</CardTitle>
                                <CardDescription>Sistem E-Commerce dengan fitur Multi-Level Marketing</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-6">
                                <div>
                                    <h3 class="text-lg font-semibold mb-3">Fitur Utama</h3>
                                    <div class="grid gap-3 md:grid-cols-2">
                                        <div class="flex items-start gap-3 p-3 rounded-lg border">
                                            <ShoppingCart class="w-5 h-5 text-primary mt-0.5" />
                                            <div>
                                                <h4 class="font-medium">E-Commerce Lengkap</h4>
                                                <p class="text-sm text-muted-foreground">
                                                    Manajemen produk, kategori, keranjang, wishlist, review, dan promosi
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3 p-3 rounded-lg border">
                                            <TrendingUp class="w-5 h-5 text-primary mt-0.5" />
                                            <div>
                                                <h4 class="font-medium">Sistem MLM Binary & Matrix</h4>
                                                <p class="text-sm text-muted-foreground">
                                                    Jaringan binary tree dan matrix dengan bonus otomatis
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3 p-3 rounded-lg border">
                                            <Wallet class="w-5 h-5 text-primary mt-0.5" />
                                            <div>
                                                <h4 class="font-medium">E-Wallet Terintegrasi</h4>
                                                <p class="text-sm text-muted-foreground">
                                                    Sistem wallet dengan top-up dan withdrawal otomatis
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3 p-3 rounded-lg border">
                                            <Package class="w-5 h-5 text-primary mt-0.5" />
                                            <div>
                                                <h4 class="font-medium">Manajemen Order</h4>
                                                <p class="text-sm text-muted-foreground">
                                                    Tracking pesanan, pengiriman, retur & refund lengkap
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- <Separator />

                                <div>
                                    <h3 class="text-lg font-semibold mb-3">Teknologi</h3>
                                    <div class="flex flex-wrap gap-2">
                                        <Badge variant="secondary">Laravel 12</Badge>
                                        <Badge variant="secondary">Inertia.js v2</Badge>
                                        <Badge variant="secondary">Vue 3</Badge>
                                        <Badge variant="secondary">TypeScript</Badge>
                                        <Badge variant="secondary">Tailwind CSS v4</Badge>
                                        <Badge variant="secondary">Shadcn-vue</Badge>
                                        <Badge variant="secondary">Midtrans Payment</Badge>
                                        <Badge variant="secondary">RajaOngkir API</Badge>
                                    </div>
                                </div> -->
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Struktur Menu</CardTitle>
                                <CardDescription>Navigasi dan akses fitur sistem</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div class="space-y-3">
                                    <div class="flex items-center gap-3 p-3 rounded-lg border">
                                        <Users class="w-5 h-5 text-primary" />
                                        <div class="flex-1">
                                            <h4 class="font-medium">Kelola</h4>
                                            <p class="text-sm text-muted-foreground">User admin dan data pelanggan</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3 p-3 rounded-lg border">
                                        <ShoppingCart class="w-5 h-5 text-primary" />
                                        <div class="flex-1">
                                            <h4 class="font-medium">E-Commerce</h4>
                                            <p class="text-sm text-muted-foreground">
                                                Produk, kategori, keranjang, wishlist, review, dan promosi
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3 p-3 rounded-lg border">
                                        <Package class="w-5 h-5 text-primary" />
                                        <div class="flex-1">
                                            <h4 class="font-medium">Pembelian</h4>
                                            <p class="text-sm text-muted-foreground">
                                                Pesanan, pembayaran, pengiriman, dan retur
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3 p-3 rounded-lg border">
                                        <TrendingUp class="w-5 h-5 text-primary" />
                                        <div class="flex-1">
                                            <h4 class="font-medium">Bonus & Komisi MLM</h4>
                                            <p class="text-sm text-muted-foreground">
                                                Bonus umum, matching, pairing, dan sponsor
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3 p-3 rounded-lg border">
                                        <Wallet class="w-5 h-5 text-primary" />
                                        <div class="flex-1">
                                            <h4 class="font-medium">E-Wallet</h4>
                                            <p class="text-sm text-muted-foreground">
                                                Saldo, transaksi, top-up, dan withdrawal
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3 p-3 rounded-lg border">
                                        <Grid3x3 class="w-5 h-5 text-primary" />
                                        <div class="flex-1">
                                            <h4 class="font-medium">Jaringan MLM</h4>
                                            <p class="text-sm text-muted-foreground">
                                                Binary tree dan matrix network visualization
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3 p-3 rounded-lg border">
                                        <Settings class="w-5 h-5 text-primary" />
                                        <div class="flex-1">
                                            <h4 class="font-medium">Pengaturan</h4>
                                            <p class="text-sm text-muted-foreground">
                                                Alamat, payment, kurir, dan newsletter
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <!-- E-Commerce Tab -->
                    <TabsContent value="ecommerce" class="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Manajemen Produk</CardTitle>
                                <CardDescription>Kelola produk, kategori, dan promosi</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div class="space-y-3">
                                    <div>
                                        <h4 class="font-semibold mb-2 flex items-center gap-2">
                                            <Package class="w-4 h-4" />
                                            Produk
                                        </h4>
                                        <ul class="space-y-2 ml-6">
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Tambah Produk:</strong> Klik tombol "Tambah Produk", isi
                                                    nama,
                                                    deskripsi, harga, stok, berat, dan kategori
                                                </span>
                                            </li>
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Upload Gambar:</strong> Maksimal 5 gambar per produk, gambar
                                                    pertama akan menjadi gambar utama
                                                </span>
                                            </li>
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Edit/Hapus:</strong> Klik icon pensil untuk edit atau icon
                                                    trash
                                                    untuk hapus produk
                                                </span>
                                            </li>
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Status:</strong> Toggle aktif/non-aktif untuk menampilkan/
                                                    menyembunyikan produk di store
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 class="font-semibold mb-2 flex items-center gap-2">
                                            <Star class="w-4 h-4" />
                                            Review Produk
                                        </h4>
                                        <ul class="space-y-2 ml-6">
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>Customer dapat memberikan rating 1-5 bintang dan komentar</span>
                                            </li>
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>Admin dapat approve/reject review sebelum ditampilkan</span>
                                            </li>
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>Review hanya bisa diberikan setelah pesanan selesai
                                                    (COMPLETED)</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 class="font-semibold mb-2 flex items-center gap-2">
                                            <BadgePercent class="w-4 h-4" />
                                            Promosi & Diskon
                                        </h4>
                                        <ul class="space-y-2 ml-6">
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Tipe Diskon:</strong> Persentase (%) atau Nominal (Rp)
                                                </span>
                                            </li>
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Periode:</strong> Set tanggal mulai dan berakhir promosi
                                                </span>
                                            </li>
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Minimum Order:</strong> Opsional, set minimal pembelian
                                                    untuk
                                                    diskon
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Manajemen Pesanan</CardTitle>
                                <CardDescription>Proses order dari pembayaran hingga pengiriman</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div>
                                    <h4 class="font-semibold mb-3">Alur Pesanan</h4>
                                    <div class="space-y-3">
                                        <div class="flex items-start gap-3 p-3 rounded-lg border bg-muted/50">
                                            <div
                                                class="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10">
                                                <span class="text-sm font-bold text-yellow-600">1</span>
                                            </div>
                                            <div class="flex-1">
                                                <Badge variant="secondary" class="mb-1">PENDING</Badge>
                                                <p class="text-sm text-muted-foreground">
                                                    Customer checkout dan menunggu pembayaran via Midtrans
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3 p-3 rounded-lg border bg-muted/50">
                                            <div
                                                class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                                                <span class="text-sm font-bold text-blue-600">2</span>
                                            </div>
                                            <div class="flex-1">
                                                <Badge variant="default" class="mb-1">PAID</Badge>
                                                <p class="text-sm text-muted-foreground">
                                                    Pembayaran berhasil, admin setup pengiriman (pilih kurir, input
                                                    resi)
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3 p-3 rounded-lg border bg-muted/50">
                                            <div
                                                class="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10">
                                                <span class="text-sm font-bold text-purple-600">3</span>
                                            </div>
                                            <div class="flex-1">
                                                <Badge variant="secondary" class="mb-1">SHIPPED</Badge>
                                                <p class="text-sm text-muted-foreground">
                                                    Paket dalam pengiriman, customer bisa tracking dengan nomor resi
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3 p-3 rounded-lg border bg-muted/50">
                                            <div
                                                class="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                                                <span class="text-sm font-bold text-green-600">4</span>
                                            </div>
                                            <div class="flex-1">
                                                <Badge variant="default" class="mb-1">COMPLETED</Badge>
                                                <p class="text-sm text-muted-foreground">
                                                    Paket diterima customer, bonus MLM otomatis dihitung
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h4 class="font-semibold mb-2">Aksi Admin</h4>
                                    <ul class="space-y-2 ml-6">
                                        <li class="text-sm flex items-start gap-2">
                                            <CheckCircle class="w-4 h-4 mt-0.5 text-green-600" />
                                            <span>
                                                <strong>Setup Pengiriman:</strong> Pilih kurir (JNE, TIKI, POS), input
                                                nomor
                                                resi, dan konfirmasi
                                            </span>
                                        </li>
                                        <li class="text-sm flex items-start gap-2">
                                            <CheckCircle class="w-4 h-4 mt-0.5 text-green-600" />
                                            <span>
                                                <strong>Tandai Dikirim:</strong> Update status menjadi SHIPPED setelah
                                                paket
                                                diserahkan ke kurir
                                            </span>
                                        </li>
                                        <li class="text-sm flex items-start gap-2">
                                            <CheckCircle class="w-4 h-4 mt-0.5 text-green-600" />
                                            <span>
                                                <strong>Tandai Selesai:</strong> Update status menjadi COMPLETED setelah
                                                customer terima paket
                                            </span>
                                        </li>
                                        <li class="text-sm flex items-start gap-2">
                                            <AlertCircle class="w-4 h-4 mt-0.5 text-red-600" />
                                            <span>
                                                <strong>Batalkan Pesanan:</strong> Hanya bisa dibatalkan jika status
                                                PENDING
                                                atau PAID
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <!-- MLM System Tab -->
                    <TabsContent value="mlm" class="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sistem Jaringan MLM</CardTitle>
                                <CardDescription>Binary Tree dan Matrix Network</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-6">
                                <div>
                                    <h4 class="font-semibold mb-3 flex items-center gap-2">
                                        <Grid3x3 class="w-4 h-4" />
                                        Jaringan Binary
                                    </h4>
                                    <div class="space-y-3">
                                        <p class="text-sm text-muted-foreground">
                                            Setiap member memiliki maksimal 2 downline (kiri dan kanan). Placement
                                            otomatis
                                            menggunakan algoritma breadth-first search.
                                        </p>
                                        <ul class="space-y-2 ml-6">
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Auto Placement:</strong> Member baru otomatis ditempatkan di
                                                    posisi tersedia pertama
                                                </span>
                                            </li>
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Visualisasi Tree:</strong> Lihat struktur jaringan binary
                                                    dalam
                                                    bentuk tree diagram
                                                </span>
                                            </li>
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Bonus Pairing:</strong> Dihitung berdasarkan pasangan (pair)
                                                    dari
                                                    BV kiri dan kanan
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h4 class="font-semibold mb-3 flex items-center gap-2">
                                        <TrendingUp class="w-4 h-4" />
                                        Jaringan Matrix
                                    </h4>
                                    <div class="space-y-3">
                                        <p class="text-sm text-muted-foreground">
                                            Mencatat hubungan sponsor-member untuk perhitungan bonus sponsor dan
                                            matching.
                                        </p>
                                        <ul class="space-y-2 ml-6">
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Sponsor Direct:</strong> Member yang langsung direkrut oleh
                                                    sponsor
                                                </span>
                                            </li>
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Level Tracking:</strong> Mencatat level kedalaman setiap
                                                    member
                                                    dari sponsor
                                                </span>
                                            </li>
                                            <li class="text-sm flex items-start gap-2">
                                                <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                                <span>
                                                    <strong>Bonus Sponsor:</strong> Diberikan ke sponsor langsung saat
                                                    member
                                                    belanja
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Sistem Bonus & Komisi</CardTitle>
                                <CardDescription>4 jenis bonus otomatis</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div class="grid gap-4 md:grid-cols-2">
                                    <div class="p-4 rounded-lg border bg-card space-y-2">
                                        <div class="flex items-center gap-2 mb-2">
                                            <Wallet class="w-5 h-5 text-primary" />
                                            <h4 class="font-semibold">Bonus Umum</h4>
                                        </div>
                                        <p class="text-sm text-muted-foreground">
                                            Bonus untuk member saat melakukan pembelian pertama atau pencapaian
                                            tertentu.
                                        </p>
                                        <ul class="text-xs space-y-1 ml-4 text-muted-foreground">
                                            <li>• Diberikan sekali saat kondisi terpenuhi</li>
                                            <li>• Status: PENDING → RELEASED</li>
                                            <li>• Otomatis masuk ke wallet saat RELEASED</li>
                                        </ul>
                                    </div>

                                    <div class="p-4 rounded-lg border bg-card space-y-2">
                                        <div class="flex items-center gap-2 mb-2">
                                            <CreditCard class="w-5 h-5 text-primary" />
                                            <h4 class="font-semibold">Bonus Sponsor</h4>
                                        </div>
                                        <p class="text-sm text-muted-foreground">
                                            Komisi untuk sponsor langsung saat downline melakukan pembelian.
                                        </p>
                                        <ul class="text-xs space-y-1 ml-4 text-muted-foreground">
                                            <li>• Persentase dari total pembelian downline</li>
                                            <li>• Dihitung otomatis saat order COMPLETED</li>
                                            <li>• Langsung masuk wallet sponsor</li>
                                        </ul>
                                    </div>

                                    <div class="p-4 rounded-lg border bg-card space-y-2">
                                        <div class="flex items-center gap-2 mb-2">
                                            <Grid3x3 class="w-5 h-5 text-primary" />
                                            <h4 class="font-semibold">Bonus Pairing</h4>
                                        </div>
                                        <p class="text-sm text-muted-foreground">
                                            Bonus dari pasangan (pair) BV antara kaki kiri dan kanan di binary tree.
                                        </p>
                                        <ul class="text-xs space-y-1 ml-4 text-muted-foreground">
                                            <li>• Berdasarkan BV terkecil dari 2 kaki</li>
                                            <li>• Sisa BV carry over ke periode berikutnya</li>
                                            <li>• Dihitung otomatis setiap ada transaksi</li>
                                        </ul>
                                    </div>

                                    <div class="p-4 rounded-lg border bg-card space-y-2">
                                        <div class="flex items-center gap-2 mb-2">
                                            <TrendingUp class="w-5 h-5 text-primary" />
                                            <h4 class="font-semibold">Bonus Matching</h4>
                                        </div>
                                        <p class="text-sm text-muted-foreground">
                                            Bonus matching dari bonus pairing downline hingga level tertentu.
                                        </p>
                                        <ul class="text-xs space-y-1 ml-4 text-muted-foreground">
                                            <li>• Persentase dari bonus pairing downline</li>
                                            <li>• Maksimal sampai level N (konfigurasi)</li>
                                            <li>• Dihitung setelah bonus pairing</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="p-4 rounded-lg border bg-yellow-50 dark:bg-yellow-950/20">
                                    <div class="flex gap-2">
                                        <Info class="w-5 h-5 text-yellow-600 flex-shrink-0" />
                                        <div>
                                            <h4 class="font-semibold text-sm text-yellow-900 dark:text-yellow-100 mb-1">
                                                Catatan Penting
                                            </h4>
                                            <p class="text-sm text-yellow-800 dark:text-yellow-200">
                                                Semua bonus dihitung otomatis oleh sistem saat order mencapai status
                                                COMPLETED. Admin hanya perlu melakukan release bonus dari PENDING
                                                menjadi
                                                RELEASED jika ada approval manual.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <!-- Management Tab -->
                    <TabsContent value="management" class="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Manajemen E-Wallet</CardTitle>
                                <CardDescription>Top-up dan withdrawal customer</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div>
                                    <h4 class="font-semibold mb-3">Top-Up (Deposit)</h4>
                                    <ul class="space-y-2 ml-6">
                                        <li class="text-sm flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>Customer request top-up via Midtrans (transfer bank, e-wallet,
                                                dll)</span>
                                        </li>
                                        <li class="text-sm flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>
                                                Setelah pembayaran berhasil, saldo otomatis masuk ke wallet customer
                                            </span>
                                        </li>
                                        <li class="text-sm flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>Admin bisa melihat riwayat top-up di menu "Permintaan Top Up"</span>
                                        </li>
                                    </ul>
                                </div>

                                <Separator />

                                <div>
                                    <h4 class="font-semibold mb-3">Withdrawal (Penarikan)</h4>
                                    <ul class="space-y-2 ml-6">
                                        <li class="text-sm flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>Customer request withdrawal dengan minimum nominal tertentu</span>
                                        </li>
                                        <li class="text-sm flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>Admin approve/reject withdrawal di menu "Permintaan Withdrawal"</span>
                                        </li>
                                        <li class="text-sm flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>
                                                Jika approved, saldo customer berkurang dan admin transfer manual ke
                                                rekening
                                                customer
                                            </span>
                                        </li>
                                        <li class="text-sm flex items-start gap-2">
                                            <AlertCircle class="w-4 h-4 mt-0.5 text-red-600" />
                                            <span>
                                                <strong>Catatan:</strong> Pastikan saldo customer cukup sebelum approve
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Manajemen User & Customer</CardTitle>
                                <CardDescription>Kelola akses dan data pengguna</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div>
                                    <h4 class="font-semibold mb-2">User Admin</h4>
                                    <p class="text-sm text-muted-foreground mb-2">
                                        User dengan akses ke admin panel untuk mengelola sistem
                                    </p>
                                    <ul class="space-y-1 ml-6 text-sm">
                                        <li class="flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>Tambah/edit/hapus user admin</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>Set password dan email untuk login</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>Upload avatar/foto profil</span>
                                        </li>
                                    </ul>
                                </div>

                                <Separator />

                                <div>
                                    <h4 class="font-semibold mb-2">Customer/Member</h4>
                                    <p class="text-sm text-muted-foreground mb-2">
                                        Data pelanggan yang berbelanja dan bergabung dalam jaringan MLM
                                    </p>
                                    <ul class="space-y-1 ml-6 text-sm">
                                        <li class="flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>Lihat data lengkap customer (nama, email, phone, alamat)</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>Lihat riwayat pesanan dan transaksi wallet</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>Lihat posisi dalam jaringan (upline, downline, level)</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <ArrowRight class="w-4 h-4 mt-0.5 text-primary" />
                                            <span>Lihat total bonus yang diterima</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pengaturan Sistem</CardTitle>
                                <CardDescription>Konfigurasi payment, shipping, dan lainnya</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div class="grid gap-4 md:grid-cols-2">
                                    <div class="p-3 rounded-lg border">
                                        <h4 class="font-semibold mb-2 flex items-center gap-2">
                                            <CreditCard class="w-4 h-4" />
                                            Metode Pembayaran
                                        </h4>
                                        <p class="text-sm text-muted-foreground">
                                            Konfigurasi payment gateway Midtrans (server key, client key, environment)
                                        </p>
                                    </div>
                                    <div class="p-3 rounded-lg border">
                                        <h4 class="font-semibold mb-2 flex items-center gap-2">
                                            <Truck class="w-4 h-4" />
                                            Kurir Pengiriman
                                        </h4>
                                        <p class="text-sm text-muted-foreground">
                                            Aktifkan/nonaktifkan kurir (JNE, TIKI, POS) dan set biaya admin
                                        </p>
                                    </div>
                                    <div class="p-3 rounded-lg border">
                                        <h4 class="font-semibold mb-2 flex items-center gap-2">
                                            <Settings class="w-4 h-4" />
                                            Alamat Pengiriman
                                        </h4>
                                        <p class="text-sm text-muted-foreground">
                                            Kelola alamat customer untuk pengiriman produk
                                        </p>
                                    </div>
                                    <div class="p-3 rounded-lg border">
                                        <h4 class="font-semibold mb-2 flex items-center gap-2">
                                            <Package class="w-4 h-4" />
                                            Newsletter
                                        </h4>
                                        <p class="text-sm text-muted-foreground">
                                            Kelola subscriber newsletter dan kirim email campaign
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <!-- API Response Tab -->
                    <TabsContent value="api" class="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Format Response Standar</CardTitle>
                                <CardDescription>Struktur response dari backend ke frontend</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div>
                                    <h4 class="font-semibold mb-2 flex items-center gap-2">
                                        <CheckCircle class="w-4 h-4 text-green-600" />
                                        Success Response
                                    </h4>
                                    <div class="rounded-lg bg-muted p-4">
                                        <pre class="text-xs overflow-x-auto"><code>{
  "success": true,
  "message": "Data berhasil disimpan",
  "data": {
    // Data object sesuai resource
  }
}</code></pre>
                                    </div>
                                </div>

                                <div>
                                    <h4 class="font-semibold mb-2 flex items-center gap-2">
                                        <AlertCircle class="w-4 h-4 text-red-600" />
                                        Error Response
                                    </h4>
                                    <div class="rounded-lg bg-muted p-4">
                                        <pre class="text-xs overflow-x-auto"><code>{
  "success": false,
  "message": "Validation Error",
  "errors": {
    "field_name": ["Error message 1", "Error message 2"]
  }
}</code></pre>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h4 class="font-semibold mb-3">Flash Messages</h4>
                                    <p class="text-sm text-muted-foreground mb-2">
                                        Flash messages ditampilkan menggunakan toast notification di pojok kanan atas:
                                    </p>
                                    <ul class="space-y-2 ml-6 text-sm">
                                        <li class="flex items-start gap-2">
                                            <CheckCircle class="w-4 h-4 mt-0.5 text-green-600" />
                                            <span>
                                                <strong>Success:</strong> Background hijau untuk aksi berhasil (create,
                                                update,
                                                delete)
                                            </span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <AlertCircle class="w-4 h-4 mt-0.5 text-red-600" />
                                            <span>
                                                <strong>Error:</strong> Background merah untuk aksi gagal atau
                                                validation error
                                            </span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <Info class="w-4 h-4 mt-0.5 text-blue-600" />
                                            <span>
                                                <strong>Info:</strong> Background biru untuk informasi umum
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Status Code HTTP</CardTitle>
                                <CardDescription>Kode status yang digunakan aplikasi</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between p-2 rounded border">
                                        <div class="flex items-center gap-2">
                                            <Badge variant="default">200</Badge>
                                            <span class="text-sm font-medium">OK</span>
                                        </div>
                                        <span class="text-sm text-muted-foreground">Request berhasil</span>
                                    </div>
                                    <div class="flex items-center justify-between p-2 rounded border">
                                        <div class="flex items-center gap-2">
                                            <Badge variant="default">201</Badge>
                                            <span class="text-sm font-medium">Created</span>
                                        </div>
                                        <span class="text-sm text-muted-foreground">Data berhasil dibuat</span>
                                    </div>
                                    <div class="flex items-center justify-between p-2 rounded border">
                                        <div class="flex items-center gap-2">
                                            <Badge variant="secondary">400</Badge>
                                            <span class="text-sm font-medium">Bad Request</span>
                                        </div>
                                        <span class="text-sm text-muted-foreground">Request tidak valid</span>
                                    </div>
                                    <div class="flex items-center justify-between p-2 rounded border">
                                        <div class="flex items-center gap-2">
                                            <Badge variant="secondary">401</Badge>
                                            <span class="text-sm font-medium">Unauthorized</span>
                                        </div>
                                        <span class="text-sm text-muted-foreground">Belum login/autentikasi</span>
                                    </div>
                                    <div class="flex items-center justify-between p-2 rounded border">
                                        <div class="flex items-center gap-2">
                                            <Badge variant="secondary">403</Badge>
                                            <span class="text-sm font-medium">Forbidden</span>
                                        </div>
                                        <span class="text-sm text-muted-foreground">Tidak memiliki akses</span>
                                    </div>
                                    <div class="flex items-center justify-between p-2 rounded border">
                                        <div class="flex items-center gap-2">
                                            <Badge variant="secondary">404</Badge>
                                            <span class="text-sm font-medium">Not Found</span>
                                        </div>
                                        <span class="text-sm text-muted-foreground">Data tidak ditemukan</span>
                                    </div>
                                    <div class="flex items-center justify-between p-2 rounded border">
                                        <div class="flex items-center gap-2">
                                            <Badge variant="destructive">422</Badge>
                                            <span class="text-sm font-medium">Unprocessable Entity</span>
                                        </div>
                                        <span class="text-sm text-muted-foreground">Validation error</span>
                                    </div>
                                    <div class="flex items-center justify-between p-2 rounded border">
                                        <div class="flex items-center gap-2">
                                            <Badge variant="destructive">500</Badge>
                                            <span class="text-sm font-medium">Internal Server Error</span>
                                        </div>
                                        <span class="text-sm text-muted-foreground">Error server</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Contoh Response API</CardTitle>
                                <CardDescription>Response dari berbagai endpoint</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div>
                                    <h4 class="font-semibold mb-2">Product List</h4>
                                    <div class="rounded-lg bg-muted p-4">
                                        <pre class="text-xs overflow-x-auto"><code>{
  "data": [
    {
      "id": 1,
      "name": "Samsung Galaxy S24",
      "slug": "samsung-galaxy-s24",
      "base_price": 12000000,
      "selling_price": 11500000,
      "stock_quantity": 50,
      "weight": 500,
      "is_active": true,
      "category": {
        "id": 1,
        "name": "Smartphone"
      },
      "images": [
        {
          "id": 1,
          "url": "/storage/products/image1.jpg",
          "is_primary": true
        }
      ]
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 100
  }
}</code></pre>
                                    </div>
                                </div>

                                <div>
                                    <h4 class="font-semibold mb-2">Order Detail</h4>
                                    <div class="rounded-lg bg-muted p-4">
                                        <pre class="text-xs overflow-x-auto"><code>{
  "id": 1,
  "order_no": "ORD-20250121-001",
  "status": "PAID",
  "subtotal_amount": 11500000,
  "shipping_cost": 50000,
  "grand_total": 11550000,
  "customer": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "items": [
    {
      "product_id": 1,
      "product_name": "Samsung Galaxy S24",
      "quantity": 1,
      "unit_price": 11500000
    }
  ],
  "shipment": {
    "courier_code": "jne",
    "service_code": "REG",
    "tracking_number": "JNE123456789",
    "status": "IN_TRANSIT"
  }
}</code></pre>
                                    </div>
                                </div>

                                <div>
                                    <h4 class="font-semibold mb-2">Bonus Detail</h4>
                                    <div class="rounded-lg bg-muted p-4">
                                        <pre class="text-xs overflow-x-auto"><code>{
  "id": 1,
  "member_id": 1,
  "bonus_type": "PAIRING",
  "amount": 500000,
  "status": "RELEASED",
  "description": "Bonus pairing dari pair BV kiri-kanan",
  "released_at": "2025-01-21T10:30:00Z",
  "created_at": "2025-01-21T10:00:00Z"
}</code></pre>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <!-- Support Section -->
                <Card>
                    <CardHeader>
                        <CardTitle>Butuh Bantuan?</CardTitle>
                        <CardDescription>Hubungi tim support untuk assistance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="grid gap-4 md:grid-cols-3">
                            <div class="p-4 rounded-lg border bg-card text-center">
                                <Users class="w-8 h-8 mx-auto mb-2 text-primary" />
                                <h4 class="font-semibold mb-1">Support Team</h4>
                                <p class="text-sm text-muted-foreground">support@puranusa.id</p>
                            </div>
                            <div class="p-4 rounded-lg border bg-card text-center">
                                <BookOpen class="w-8 h-8 mx-auto mb-2 text-primary" />
                                <h4 class="font-semibold mb-1">Developer</h4>
                                <p class="text-sm text-muted-foreground">chocoalano.github.io</p>
                            </div>
                            <div class="p-4 rounded-lg border bg-card text-center">
                                <Info class="w-8 h-8 mx-auto mb-2 text-primary" />
                                <h4 class="font-semibold mb-1">Version</h4>
                                <p class="text-sm text-muted-foreground">1.0.0</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
