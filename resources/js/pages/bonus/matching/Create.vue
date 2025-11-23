<script setup lang="ts">
import { index, create, store } from '@/actions/App/Http/Controllers/BonusComission/BonusMatchingController';
import HeadingSmall from '@/components/HeadingSmall.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/vue3';
import { ArrowLeft } from 'lucide-vue-next';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

interface Member {
    id: number;
    name: string;
    ewallet_id: string;
}

interface Props {
    members: Member[];
}

defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Bonus Matching',
        href: index.url(),
    },
    {
        title: 'Tambah Bonus',
        href: create.url(),
    },
];

const selectedMember = ref('');
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Tambah Bonus Matching" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center gap-4">
                <Link :href="index.url()">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Tambah Bonus Matching</h1>
                    <p class="text-muted-foreground">Distribusi bonus matching ke upline</p>
                </div>
            </div>

            <!-- Form -->
            <div class="mx-auto max-w-2xl">
                <Form
                    :action="store.url()"
                    method="post"
                    v-slot="{ errors, processing }"
                    class="space-y-6"
                    @success="
                        () =>
                            toast.success('Berhasil', {
                                description: 'Bonus matching berhasil didistribusikan',
                            })
                    "
                    @error="
                        () =>
                            toast.error('Gagal', {
                                description: 'Terjadi kesalahan saat mendistribusikan bonus',
                            })
                    "
                >
                    <div class="rounded-lg border bg-card p-6">
                        <HeadingSmall
                            title="Informasi Bonus Matching"
                            description="Bonus akan didistribusikan ke upline sesuai level"
                        />

                        <div class="mt-6 space-y-4">
                            <div class="grid gap-2">
                                <Label for="from_member_id">Dari Member (Sumber)</Label>
                                <select
                                    id="from_member_id"
                                    name="from_member_id"
                                    v-model="selectedMember"
                                    required
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                >
                                    <option value="">Pilih member...</option>
                                    <option
                                        v-for="member in members"
                                        :key="member.id"
                                        :value="member.id"
                                    >
                                        {{ member.name }} ({{ member.ewallet_id }})
                                    </option>
                                </select>
                                <p class="text-sm text-muted-foreground">
                                    Member yang memicu bonus matching
                                </p>
                                <InputError :message="errors.from_member_id" />
                            </div>

                            <div class="grid gap-2">
                                <Label for="amount">Total Amount</Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    required
                                    placeholder="0"
                                />
                                <p class="text-sm text-muted-foreground">
                                    Total amount yang akan didistribusikan
                                </p>
                                <InputError :message="errors.amount" />
                            </div>

                            <div class="grid gap-2">
                                <Label for="max_level">Maksimal Level</Label>
                                <Input
                                    id="max_level"
                                    name="max_level"
                                    type="number"
                                    min="1"
                                    max="5"
                                    value="5"
                                    required
                                />
                                <p class="text-sm text-muted-foreground">
                                    Jumlah level upline yang akan menerima bonus (1-5)
                                </p>
                                <InputError :message="errors.max_level" />
                            </div>

                            <div class="rounded-lg border bg-muted/50 p-4">
                                <h3 class="font-semibold mb-3">Persentase Per Level</h3>
                                <div class="grid gap-3">
                                    <div class="flex items-center gap-4">
                                        <Label for="level_1" class="w-20">Level 1</Label>
                                        <Input
                                            id="level_1"
                                            name="level_percentages[1]"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="100"
                                            value="40"
                                            class="flex-1"
                                        />
                                        <span class="text-sm text-muted-foreground w-8">%</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <Label for="level_2" class="w-20">Level 2</Label>
                                        <Input
                                            id="level_2"
                                            name="level_percentages[2]"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="100"
                                            value="25"
                                            class="flex-1"
                                        />
                                        <span class="text-sm text-muted-foreground w-8">%</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <Label for="level_3" class="w-20">Level 3</Label>
                                        <Input
                                            id="level_3"
                                            name="level_percentages[3]"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="100"
                                            value="15"
                                            class="flex-1"
                                        />
                                        <span class="text-sm text-muted-foreground w-8">%</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <Label for="level_4" class="w-20">Level 4</Label>
                                        <Input
                                            id="level_4"
                                            name="level_percentages[4]"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="100"
                                            value="10"
                                            class="flex-1"
                                        />
                                        <span class="text-sm text-muted-foreground w-8">%</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <Label for="level_5" class="w-20">Level 5</Label>
                                        <Input
                                            id="level_5"
                                            name="level_percentages[5]"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="100"
                                            value="10"
                                            class="flex-1"
                                        />
                                        <span class="text-sm text-muted-foreground w-8">%</span>
                                    </div>
                                </div>
                                <InputError :message="errors['level_percentages']" />
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <Button type="submit" :disabled="processing || !selectedMember">
                            {{ processing ? 'Mendistribusikan...' : 'Distribusikan Bonus' }}
                        </Button>
                        <Link :href="index.url()">
                            <Button type="button" variant="outline">Batal</Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    </AppLayout>
</template>
