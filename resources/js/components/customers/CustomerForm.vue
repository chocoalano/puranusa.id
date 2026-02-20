<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type {
    CustomerFormMode,
    CustomerFormState,
} from '@/composables/customers/useCustomerForm';
import type { ShippingLocationOption } from '@/composables/customers/useShippingLocation';
import type { InertiaForm } from '@inertiajs/vue3';
import { Loader2 } from 'lucide-vue-next';
import { computed } from 'vue';

interface Props {
    mode: CustomerFormMode;
    provinces: ShippingLocationOption[];
    cities: ShippingLocationOption[];
    loadingProvinces: boolean;
    loadingCities: boolean;
}

const props = defineProps<Props>();
const form = defineModel<InertiaForm<CustomerFormState>>('form', {
    required: true,
});

const emit = defineEmits<{
    submit: [];
}>();

const isCreateMode = computed(() => props.mode === 'create');

const selectedProvinceLabel = computed(() => {
    return props.provinces.find(
        (province) => province.id === form.value.province_id,
    )?.name;
});

const selectedCityLabel = computed(() => {
    return props.cities.find((city) => city.id === form.value.city_id)?.name;
});
</script>

<template>
    <form @submit.prevent="emit('submit')" class="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Data Utama Pelanggan</CardTitle>
                <CardDescription>
                    Lengkapi data identitas secara akurat. Field bertanda
                    <span class="font-medium">*</span> wajib diisi.
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="name">Nama Lengkap *</Label>
                        <Input
                            id="name"
                            v-model="form.name"
                            placeholder="Masukkan nama lengkap"
                            :class="{
                                'border-destructive': form.errors.name,
                            }"
                            required
                        />
                        <p class="text-xs text-muted-foreground">
                            Gunakan nama sesuai identitas resmi pelanggan.
                        </p>
                        <p
                            v-if="form.errors.name"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.name }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="username">Username *</Label>
                        <Input
                            id="username"
                            v-model="form.username"
                            placeholder="contoh: budi_santoso"
                            :class="{
                                'border-destructive': form.errors.username,
                            }"
                            required
                        />
                        <p class="text-xs text-muted-foreground">
                            Username dipakai untuk login dan harus unik.
                        </p>
                        <p
                            v-if="form.errors.username"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.username }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="nik">NIK *</Label>
                        <Input
                            id="nik"
                            v-model="form.nik"
                            inputmode="numeric"
                            maxlength="32"
                            placeholder="Contoh: 3174xxxxxxxxxxxx"
                            :class="{
                                'border-destructive': form.errors.nik,
                            }"
                            required
                        />
                        <p class="text-xs text-muted-foreground">
                            NIK berisi angka 8 sampai 32 digit.
                        </p>
                        <p
                            v-if="form.errors.nik"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.nik }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="gender">Jenis Kelamin *</Label>
                        <Select v-model="form.gender">
                            <SelectTrigger
                                id="gender"
                                :class="{
                                    'border-destructive': form.errors.gender,
                                }"
                            >
                                <SelectValue
                                    placeholder="Pilih jenis kelamin"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="laki-laki"
                                    >Laki-laki</SelectItem
                                >
                                <SelectItem value="perempuan"
                                    >Perempuan</SelectItem
                                >
                            </SelectContent>
                        </Select>
                        <p class="text-xs text-muted-foreground">
                            Pilih jenis kelamin sesuai data legal.
                        </p>
                        <p
                            v-if="form.errors.gender"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.gender }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="email">Email *</Label>
                        <Input
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="nama@email.com"
                            :class="{
                                'border-destructive': form.errors.email,
                            }"
                            required
                        />
                        <p class="text-xs text-muted-foreground">
                            Email aktif untuk notifikasi akun pelanggan.
                        </p>
                        <p
                            v-if="form.errors.email"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.email }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="phone">No. Telepon *</Label>
                        <Input
                            id="phone"
                            v-model="form.phone"
                            inputmode="tel"
                            placeholder="08xxxxxxxxxx"
                            :class="{
                                'border-destructive': form.errors.phone,
                            }"
                            required
                        />
                        <p class="text-xs text-muted-foreground">
                            Nomor aktif untuk komunikasi dan verifikasi.
                        </p>
                        <p
                            v-if="form.errors.phone"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.phone }}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Alamat Pelanggan</CardTitle>
                <CardDescription>
                    Masukkan alamat utama pengiriman dan domisili untuk
                    kebutuhan operasional.
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
                <div class="space-y-2">
                    <Label for="address">Address *</Label>
                    <Textarea
                        id="address"
                        v-model="form.address"
                        placeholder="Alamat utama pengiriman"
                        rows="3"
                        :class="{
                            'border-destructive': form.errors.address,
                        }"
                        required
                    />
                    <p class="text-xs text-muted-foreground">
                        Contoh: nama jalan, nomor rumah, RT/RW, kelurahan,
                        kecamatan.
                    </p>
                    <p
                        v-if="form.errors.address"
                        class="text-sm text-destructive"
                    >
                        {{ form.errors.address }}
                    </p>
                </div>

                <div class="grid gap-4 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="province_id">Provinsi *</Label>
                        <Select
                            v-model="form.province_id"
                            :disabled="props.loadingProvinces"
                        >
                            <SelectTrigger
                                id="province_id"
                                :class="{
                                    'border-destructive':
                                        form.errors.province_id,
                                }"
                            >
                                <SelectValue>
                                    <span v-if="selectedProvinceLabel">{{
                                        selectedProvinceLabel
                                    }}</span>
                                    <span
                                        v-else-if="props.loadingProvinces"
                                        class="inline-flex items-center gap-2"
                                    >
                                        <Loader2 class="h-4 w-4 animate-spin" />
                                        Memuat provinsi...
                                    </span>
                                    <span v-else>Pilih provinsi</span>
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    v-for="province in props.provinces"
                                    :key="province.id"
                                    :value="province.id"
                                >
                                    {{ province.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <p class="text-xs text-muted-foreground">
                            Pilih provinsi untuk memuat daftar kota/kabupaten.
                        </p>
                        <p
                            v-if="form.errors.province_id"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.province_id }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="city_id">Kota/Kabupaten *</Label>
                        <Select
                            v-model="form.city_id"
                            :disabled="props.loadingCities || !form.province_id"
                        >
                            <SelectTrigger
                                id="city_id"
                                :class="{
                                    'border-destructive': form.errors.city_id,
                                }"
                            >
                                <SelectValue>
                                    <span v-if="selectedCityLabel">{{
                                        selectedCityLabel
                                    }}</span>
                                    <span
                                        v-else-if="props.loadingCities"
                                        class="inline-flex items-center gap-2"
                                    >
                                        <Loader2 class="h-4 w-4 animate-spin" />
                                        Memuat kota...
                                    </span>
                                    <span v-else-if="form.province_id"
                                        >Pilih kota/kabupaten</span
                                    >
                                    <span v-else>Pilih provinsi dulu</span>
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    v-for="city in props.cities"
                                    :key="city.id"
                                    :value="city.id"
                                >
                                    {{ city.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <p class="text-xs text-muted-foreground">
                            Daftar kota akan menyesuaikan provinsi yang dipilih.
                        </p>
                        <p
                            v-if="form.errors.city_id"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.city_id }}
                        </p>
                    </div>
                </div>

                <div class="space-y-2">
                    <Label for="alamat">Alamat Domisili (alamat) *</Label>
                    <Textarea
                        id="alamat"
                        v-model="form.alamat"
                        placeholder="Alamat domisili/administratif pelanggan"
                        rows="3"
                        :class="{
                            'border-destructive': form.errors.alamat,
                        }"
                        required
                    />
                    <p class="text-xs text-muted-foreground">
                        Pisahkan data domisili untuk kebutuhan dokumen internal.
                    </p>
                    <p
                        v-if="form.errors.alamat"
                        class="text-sm text-destructive"
                    >
                        {{ form.errors.alamat }}
                    </p>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Informasi NPWP</CardTitle>
                <CardDescription>
                    Data ini akan disimpan ke tabel NPWP customer untuk
                    kebutuhan perpajakan.
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="npwp_nama">Nama NPWP *</Label>
                        <Input
                            id="npwp_nama"
                            v-model="form.npwp.nama"
                            placeholder="Nama sesuai kartu NPWP"
                            :class="{
                                'border-destructive': form.errors['npwp.nama'],
                            }"
                            required
                        />
                        <p
                            v-if="form.errors['npwp.nama']"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors['npwp.nama'] }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="npwp_number">Nomor NPWP *</Label>
                        <Input
                            id="npwp_number"
                            v-model="form.npwp.npwp"
                            inputmode="numeric"
                            maxlength="20"
                            placeholder="15 atau 16 digit NPWP"
                            :class="{
                                'border-destructive': form.errors['npwp.npwp'],
                            }"
                            required
                        />
                        <p
                            v-if="form.errors['npwp.npwp']"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors['npwp.npwp'] }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="npwp_jk">Jenis Kelamin NPWP *</Label>
                        <Select v-model="form.npwp.jk">
                            <SelectTrigger
                                id="npwp_jk"
                                :class="{
                                    'border-destructive':
                                        form.errors['npwp.jk'],
                                }"
                            >
                                <SelectValue
                                    placeholder="Pilih jenis kelamin"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="laki-laki"
                                    >Laki-laki</SelectItem
                                >
                                <SelectItem value="perempuan"
                                    >Perempuan</SelectItem
                                >
                            </SelectContent>
                        </Select>
                        <p
                            v-if="form.errors['npwp.jk']"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors['npwp.jk'] }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="npwp_date">Tanggal NPWP *</Label>
                        <Input
                            id="npwp_date"
                            v-model="form.npwp.npwp_date"
                            type="date"
                            :class="{
                                'border-destructive':
                                    form.errors['npwp.npwp_date'],
                            }"
                            required
                        />
                        <p
                            v-if="form.errors['npwp.npwp_date']"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors['npwp.npwp_date'] }}
                        </p>
                    </div>
                </div>

                <div class="space-y-2">
                    <Label for="npwp_alamat">Alamat NPWP *</Label>
                    <Textarea
                        id="npwp_alamat"
                        v-model="form.npwp.alamat"
                        rows="3"
                        placeholder="Alamat terdaftar di data NPWP"
                        :class="{
                            'border-destructive': form.errors['npwp.alamat'],
                        }"
                        required
                    />
                    <p
                        v-if="form.errors['npwp.alamat']"
                        class="text-sm text-destructive"
                    >
                        {{ form.errors['npwp.alamat'] }}
                    </p>
                </div>

                <div class="grid gap-4 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="npwp_menikah">Status Menikah *</Label>
                        <Select v-model="form.npwp.menikah">
                            <SelectTrigger
                                id="npwp_menikah"
                                :class="{
                                    'border-destructive':
                                        form.errors['npwp.menikah'],
                                }"
                            >
                                <SelectValue
                                    placeholder="Pilih status menikah"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Menikah</SelectItem>
                                <SelectItem value="0">Belum Menikah</SelectItem>
                            </SelectContent>
                        </Select>
                        <p
                            v-if="form.errors['npwp.menikah']"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors['npwp.menikah'] }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="npwp_anak">Jumlah Anak *</Label>
                        <Input
                            id="npwp_anak"
                            v-model.number="form.npwp.anak"
                            type="number"
                            min="0"
                            max="3"
                            placeholder="0-3"
                            :class="{
                                'border-destructive': form.errors['npwp.anak'],
                            }"
                            required
                        />
                        <p class="text-xs text-muted-foreground">
                            Mengikuti batas data perpajakan: maksimal 3 anak.
                        </p>
                        <p
                            v-if="form.errors['npwp.anak']"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors['npwp.anak'] }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="npwp_kerja">Pekerjaan *</Label>
                        <Input
                            id="npwp_kerja"
                            v-model="form.npwp.kerja"
                            placeholder="Contoh: Karyawan"
                            :class="{
                                'border-destructive': form.errors['npwp.kerja'],
                            }"
                            required
                        />
                        <p
                            v-if="form.errors['npwp.kerja']"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors['npwp.kerja'] }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="npwp_office">Nama Perusahaan *</Label>
                        <Input
                            id="npwp_office"
                            v-model="form.npwp.office"
                            placeholder="Contoh: PT Contoh Sejahtera"
                            :class="{
                                'border-destructive':
                                    form.errors['npwp.office'],
                            }"
                            required
                        />
                        <p
                            v-if="form.errors['npwp.office']"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors['npwp.office'] }}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Rekening dan Catatan</CardTitle>
                <CardDescription>
                    Informasi rekening dipakai untuk proses finansial pelanggan.
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="bank_name">Nama Bank *</Label>
                        <Input
                            id="bank_name"
                            v-model="form.bank_name"
                            placeholder="Contoh: BCA, BNI, Mandiri"
                            :class="{
                                'border-destructive': form.errors.bank_name,
                            }"
                            required
                        />
                        <p
                            v-if="form.errors.bank_name"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.bank_name }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="bank_account">Nomor Rekening *</Label>
                        <Input
                            id="bank_account"
                            v-model="form.bank_account"
                            placeholder="Masukkan nomor rekening"
                            :class="{
                                'border-destructive': form.errors.bank_account,
                            }"
                            required
                        />
                        <p
                            v-if="form.errors.bank_account"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.bank_account }}
                        </p>
                    </div>
                </div>

                <div class="space-y-2">
                    <Label for="description">Deskripsi *</Label>
                    <Textarea
                        id="description"
                        v-model="form.description"
                        placeholder="Catatan tambahan yang informatif tentang pelanggan"
                        rows="4"
                        :class="{
                            'border-destructive': form.errors.description,
                        }"
                        required
                    />
                    <p class="text-xs text-muted-foreground">
                        Contoh: sumber lead, kebutuhan khusus, atau informasi
                        follow-up.
                    </p>
                    <p
                        v-if="form.errors.description"
                        class="text-sm text-destructive"
                    >
                        {{ form.errors.description }}
                    </p>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{{
                    isCreateMode ? 'Password Akun' : 'Ubah Password (Opsional)'
                }}</CardTitle>
                <CardDescription>
                    <template v-if="isCreateMode">
                        Password wajib diisi minimal 8 karakter.
                    </template>
                    <template v-else>
                        Kosongkan bila tidak ingin mengubah password.
                    </template>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="password">{{
                            isCreateMode ? 'Password *' : 'Password Baru'
                        }}</Label>
                        <Input
                            id="password"
                            v-model="form.password"
                            type="password"
                            placeholder="Minimal 8 karakter"
                            :class="{
                                'border-destructive': form.errors.password,
                            }"
                            :required="isCreateMode"
                        />
                        <p
                            v-if="form.errors.password"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.password }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="password_confirmation">
                            {{
                                isCreateMode
                                    ? 'Konfirmasi Password *'
                                    : 'Konfirmasi Password Baru'
                            }}
                        </Label>
                        <Input
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            type="password"
                            placeholder="Ulangi password"
                            :required="isCreateMode"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>

        <div class="flex justify-end gap-4">
            <slot name="actions" :processing="form.processing" />
        </div>
    </form>
</template>
