<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { MapPin, Plus, Pencil, Trash2, Home, Building2 } from 'lucide-vue-next';
import { router } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';

interface Address {
    id: number;
    customer_id: number;
    label: string | null;
    is_default: boolean;
    recipient_name: string;
    recipient_phone: string;
    address_line1: string;
    address_line2: string | null;
    province_label: string;
    province_id: number;
    city_label: string;
    city_id: number;
    postal_code: string | null;
    country: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

interface Province {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
}

interface Props {
    addresses: Address[];
}

defineProps<Props>();

const showDialog = ref(false);
const isEdit = ref(false);
const isDeleting = ref(false);
const processing = ref(false);

// RajaOngkir state
const provinces = ref<Province[]>([]);
const cities = ref<City[]>([]);
const loadingProvinces = ref(false);
const loadingCities = ref(false);
const selectedProvince = ref<string>('');
const selectedCity = ref<string>('');

const formData = ref<Partial<Address>>({
    label: '',
    is_default: false,
    recipient_name: '',
    recipient_phone: '',
    address_line1: '',
    address_line2: '',
    province_label: '',
    province_id: 0,
    city_label: '',
    city_id: 0,
    postal_code: '',
    country: 'Indonesia',
    description: '',
});

const selectedAddressId = ref<number | null>(null);

// Load provinces from RajaOngkir API
const loadProvinces = async () => {
    loadingProvinces.value = true;
    try {
        const response = await axios.get('/api/shipping/provinces');
        provinces.value = response.data.data;
    } catch (error) {
        toast.error('Gagal memuat data provinsi');
        console.error('Error loading provinces:', error);
    } finally {
        loadingProvinces.value = false;
    }
};

// Load cities based on selected province
const loadCities = async (provinceId: string) => {
    if (!provinceId) return;

    loadingCities.value = true;
    cities.value = [];
    selectedCity.value = '';

    try {
        const response = await axios.get('/api/shipping/cities', {
            params: { province_id: provinceId }
        });
        cities.value = response.data.data;
    } catch (error) {
        toast.error('Gagal memuat data kota');
        console.error('Error loading cities:', error);
    } finally {
        loadingCities.value = false;
    }
};

// Watch for province selection changes
watch(selectedProvince, (newProvinceId) => {
    if (!newProvinceId) return;

    const province = provinces.value.find(p => p.id.toString() === newProvinceId);
    if (province) {
        formData.value.province_id = parseInt(newProvinceId);
        formData.value.province_label = province.name;
        loadCities(newProvinceId);
    }
});

// Watch for city selection changes
watch(selectedCity, (newCityId) => {
    if (!newCityId) return;

    const city = cities.value.find(c => c.id.toString() === newCityId);
    if (city) {
        formData.value.city_id = parseInt(newCityId);
        formData.value.city_label = city.name;
        // Note: RajaOngkir city response doesn't include postal_code in this format
        // You may need to fetch it separately or remove this line
    }
});

const openAddDialog = () => {
    isEdit.value = false;
    formData.value = {
        label: '',
        is_default: false,
        recipient_name: '',
        recipient_phone: '',
        address_line1: '',
        address_line2: '',
        province_label: '',
        province_id: 0,
        city_label: '',
        city_id: 0,
        postal_code: '',
        country: 'Indonesia',
        description: '',
    };
    selectedProvince.value = '';
    selectedCity.value = '';
    cities.value = [];
    loadProvinces();
    showDialog.value = true;
};

const openEditDialog = (address: Address) => {
    isEdit.value = true;
    selectedAddressId.value = address.id;
    formData.value = { ...address };

    // Load provinces first, then set the selected province and load cities
    loadProvinces().then(() => {
        if (address.province_id) {
            selectedProvince.value = address.province_id.toString();
            // Load cities for the selected province
            loadCities(address.province_id.toString()).then(() => {
                if (address.city_id) {
                    selectedCity.value = address.city_id.toString();
                }
            });
        }
    });

    showDialog.value = true;
};

const closeDialog = () => {
    showDialog.value = false;
    selectedAddressId.value = null;
};

const saveAddress = () => {
    // Validasi data wajib
    if (!formData.value.recipient_name || !formData.value.recipient_phone || !formData.value.address_line1) {
        toast.error('Mohon lengkapi nama penerima, telepon, dan alamat');
        return;
    }

    if (!formData.value.province_id || !formData.value.city_id) {
        toast.error('Mohon pilih provinsi dan kota/kabupaten');
        return;
    }

    processing.value = true;

    const url = isEdit.value && selectedAddressId.value
        ? `/client/profile/addresses/${selectedAddressId.value}`
        : '/client/profile/addresses';

    const method = isEdit.value ? 'put' : 'post';

    router[method](url, formData.value, {
        preserveScroll: true,
        onSuccess: () => {
            toast.success(`Alamat berhasil ${isEdit.value ? 'diperbarui' : 'ditambahkan'}`);
            closeDialog();
        },
        onError: (errors) => {
            console.error('Address save error:', errors);
            if (typeof errors === 'object' && errors !== null) {
                const firstError = Object.values(errors)[0];
                const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                toast.error(errorMessage || 'Gagal menyimpan alamat');
            } else {
                toast.error('Gagal menyimpan alamat. Silakan coba lagi.');
            }
        },
        onFinish: () => {
            processing.value = false;
        },
    });
};

const deleteAddress = (addressId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus alamat ini?')) {
        return;
    }

    isDeleting.value = true;

    router.delete(`/client/profile/addresses/${addressId}`, {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Alamat berhasil dihapus');
        },
        onError: (errors) => {
            console.error('Address delete error:', errors);
            if (typeof errors === 'object' && errors !== null) {
                const firstError = Object.values(errors)[0];
                const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                toast.error(errorMessage || 'Gagal menghapus alamat');
            } else {
                toast.error('Gagal menghapus alamat. Silakan coba lagi.');
            }
        },
        onFinish: () => {
            isDeleting.value = false;
        },
    });
};

const setDefaultAddress = (addressId: number) => {
    router.post(`/client/profile/addresses/${addressId}/set-default`, {}, {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Alamat utama berhasil diubah');
        },
        onError: (errors) => {
            console.error('Set default address error:', errors);
            if (typeof errors === 'object' && errors !== null) {
                const firstError = Object.values(errors)[0];
                const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                toast.error(errorMessage || 'Gagal mengubah alamat utama');
            } else {
                toast.error('Gagal mengubah alamat utama. Silakan coba lagi.');
            }
        },
    });
};

const getLabelIcon = (label: string | null) => {
    if (!label) return MapPin;
    if (label.toLowerCase().includes('rumah') || label.toLowerCase().includes('home')) return Home;
    if (label.toLowerCase().includes('kantor') || label.toLowerCase().includes('office')) return Building2;
    return MapPin;
};
</script>

<template>
    <Card>
        <CardHeader>
            <div class="flex items-center justify-between">
                <CardTitle class="flex items-center gap-2">
                    <MapPin class="w-5 h-5" />
                    Kelola Alamat
                </CardTitle>
                <Button size="sm" @click="openAddDialog">
                    <Plus class="w-4 h-4 mr-2" />
                    Tambah Alamat
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div v-if="addresses.length === 0" class="text-center py-12 text-muted-foreground">
                <MapPin class="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p class="mb-2">Belum ada alamat tersimpan</p>
                <p class="text-sm">Tambahkan alamat untuk mempermudah proses pengiriman</p>
            </div>

            <div v-else class="space-y-4">
                <div
                    v-for="address in addresses"
                    :key="address.id"
                    class="relative p-4 rounded-lg border transition-all"
                    :class="address.is_default ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'"
                >
                    <!-- Badge Default -->
                    <Badge v-if="address.is_default" variant="default" class="absolute top-2 right-2 text-xs">
                        Utama
                    </Badge>

                    <!-- Header -->
                    <div class="flex items-start gap-3 mb-3">
                        <component
                            :is="getLabelIcon(address.label)"
                            class="w-5 h-5 mt-1 flex-shrink-0"
                            :class="address.is_default ? 'text-primary' : 'text-muted-foreground'"
                        />
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                                <h4 class="font-semibold text-sm">
                                    {{ address.label || 'Alamat' }}
                                </h4>
                            </div>
                            <p class="text-sm font-medium">{{ address.recipient_name }}</p>
                            <p class="text-xs text-muted-foreground">{{ address.recipient_phone }}</p>
                        </div>
                    </div>

                    <!-- Address Details -->
                    <div class="space-y-1 mb-3">
                        <p class="text-sm">{{ address.address_line1 }}</p>
                        <p v-if="address.address_line2" class="text-sm text-muted-foreground">
                            {{ address.address_line2 }}
                        </p>
                        <p class="text-sm text-muted-foreground">
                            {{ address.city_label }}, {{ address.province_label }}
                            <span v-if="address.postal_code">{{ address.postal_code }}</span>
                        </p>
                        <p class="text-xs text-muted-foreground">{{ address.country }}</p>
                        <p v-if="address.description" class="text-xs text-muted-foreground italic mt-2">
                            {{ address.description }}
                        </p>
                    </div>

                    <!-- Actions -->
                    <Separator class="my-3" />
                    <div class="flex items-center gap-2">
                        <Button
                            v-if="!address.is_default"
                            variant="outline"
                            size="sm"
                            @click="setDefaultAddress(address.id)"
                        >
                            Jadikan Utama
                        </Button>
                        <Button variant="outline" size="sm" @click="openEditDialog(address)">
                            <Pencil class="w-3 h-3 mr-1" />
                            Edit
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            :disabled="isDeleting"
                            @click="deleteAddress(address.id)"
                        >
                            <Trash2 class="w-3 h-3 mr-1" />
                            Hapus
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>

    <!-- Add/Edit Dialog -->
    <Dialog :open="showDialog" @update:open="closeDialog">
        <DialogContent class="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{{ isEdit ? 'Edit Alamat' : 'Tambah Alamat Baru' }}</DialogTitle>
                <DialogDescription>
                    {{ isEdit ? 'Perbarui informasi alamat Anda' : 'Tambahkan alamat pengiriman baru' }}
                </DialogDescription>
            </DialogHeader>

            <div class="space-y-4 py-4">
                <!-- Label & Default -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="label">Label Alamat</Label>
                        <Input
                            id="label"
                            v-model="formData.label!"
                            placeholder="Rumah, Kantor, dll"
                        />
                    </div>
                    <div class="flex items-center space-x-2 pt-8">
                        <Switch
                            id="is_default"
                            v-model:checked="formData.is_default"
                        />
                        <Label for="is_default" class="cursor-pointer">Jadikan alamat utama</Label>
                    </div>
                </div>

                <!-- Recipient Info -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="recipient_name">Nama Penerima <span class="text-red-500">*</span></Label>
                        <Input
                            id="recipient_name"
                            v-model="formData.recipient_name"
                            placeholder="Nama lengkap penerima"
                            required
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="recipient_phone">No. Telepon Penerima <span class="text-red-500">*</span></Label>
                        <Input
                            id="recipient_phone"
                            v-model="formData.recipient_phone"
                            placeholder="08xxxxxxxxxx"
                            required
                        />
                    </div>
                </div>

                <!-- Address Lines -->
                <div class="space-y-2">
                    <Label for="address_line1">Alamat Lengkap <span class="text-red-500">*</span></Label>
                    <Textarea
                        id="address_line1"
                        v-model="formData.address_line1"
                        placeholder="Jalan, nomor rumah, RT/RW, blok"
                        rows="3"
                        required
                    />
                </div>

                <div class="space-y-2">
                    <Label for="address_line2">Detail Tambahan (Opsional)</Label>
                    <Input
                        id="address_line2"
                        v-model="formData.address_line2!"
                        placeholder="Patokan, gedung, unit, warna rumah, dll"
                    />
                </div>

                <!-- Location -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="province">Provinsi <span class="text-red-500">*</span></Label>
                        <Select v-model="selectedProvince" :disabled="loadingProvinces">
                            <SelectTrigger id="province">
                                <SelectValue
                                    :placeholder="loadingProvinces ? 'Memuat provinsi...' : 'Pilih provinsi'"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    v-for="province in provinces"
                                    :key="province.id"
                                    :value="province.id.toString()"
                                >
                                    {{ province.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="space-y-2">
                        <Label for="city">Kota/Kabupaten <span class="text-red-500">*</span></Label>
                        <Select
                            v-model="selectedCity"
                            :disabled="!selectedProvince || loadingCities"
                        >
                            <SelectTrigger id="city">
                                <SelectValue
                                    :placeholder="loadingCities ? 'Memuat kota...' : (selectedProvince ? 'Pilih kota/kabupaten' : 'Pilih provinsi terlebih dahulu')"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    v-for="city in cities"
                                    :key="city.id"
                                    :value="city.id.toString()"
                                >
                                    {{ city.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="postal_code">Kode Pos</Label>
                        <Input
                            id="postal_code"
                            v-model="formData.postal_code!"
                            placeholder="12345"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="country">Negara</Label>
                        <Input
                            id="country"
                            v-model="formData.country"
                            placeholder="Indonesia"
                        />
                    </div>
                </div>

                <!-- Description -->
                <div class="space-y-2">
                    <Label for="description">Catatan (Opsional)</Label>
                    <Textarea
                        id="description"
                        v-model="formData.description!"
                        placeholder="Catatan khusus untuk alamat ini"
                        rows="2"
                    />
                </div>
            </div>

            <DialogFooter>
                <Button variant="outline" @click="closeDialog" :disabled="processing">
                    Batal
                </Button>
                <Button @click="saveAddress" :disabled="processing">
                    {{ processing ? 'Menyimpan...' : (isEdit ? 'Perbarui' : 'Simpan') }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
