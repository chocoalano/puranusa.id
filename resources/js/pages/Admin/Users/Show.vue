<script setup lang="ts">
import UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, CheckCircle, Mail, User as UserIcon, XCircle } from 'lucide-vue-next';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    user: User;
}

const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: UserController.index.url(),
    },
    {
        title: props.user.name,
        href: UserController.show.url(props.user.id),
    },
];

const formatDate = (date: string) => {
    return new Date(date).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head :title="user.name" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center gap-4">
                <Link :href="UserController.index.url()">
                    <Button
                        variant="outline"
                        size="icon"
                    >
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div class="flex-1">
                    <h1 class="text-3xl font-bold tracking-tight">{{ user.name }}</h1>
                    <p class="text-muted-foreground">User details and information</p>
                </div>
                <Link :href="UserController.edit.url(user.id)">
                    <Button>Edit User</Button>
                </Link>
            </div>

            <!-- User Details -->
            <div class="mx-auto max-w-2xl space-y-6">
                <div class="rounded-lg border bg-card p-6">
                    <h2 class="mb-4 text-lg font-semibold">User Information</h2>
                    <div class="space-y-4">
                        <div class="flex items-start gap-3">
                            <UserIcon class="mt-1 h-5 w-5 text-muted-foreground" />
                            <div class="flex-1">
                                <p class="text-sm font-medium text-muted-foreground">Name</p>
                                <p class="text-base font-medium">{{ user.name }}</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <Mail class="mt-1 h-5 w-5 text-muted-foreground" />
                            <div class="flex-1">
                                <p class="text-sm font-medium text-muted-foreground">Email</p>
                                <p class="text-base font-medium">{{ user.email }}</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <CheckCircle class="mt-1 h-5 w-5 text-muted-foreground" />
                            <div class="flex-1">
                                <p class="text-sm font-medium text-muted-foreground">
                                    Verification Status
                                </p>
                                <div class="mt-1">
                                    <Badge
                                        v-if="user.email_verified_at"
                                        variant="default"
                                        class="gap-1"
                                    >
                                        <CheckCircle class="h-3 w-3" />
                                        Verified
                                    </Badge>
                                    <Badge
                                        v-else
                                        variant="secondary"
                                        class="gap-1"
                                    >
                                        <XCircle class="h-3 w-3" />
                                        Unverified
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="rounded-lg border bg-card p-6">
                    <h2 class="mb-4 text-lg font-semibold">Timestamps</h2>
                    <div class="space-y-3">
                        <div>
                            <p class="text-sm font-medium text-muted-foreground">Created At</p>
                            <p class="text-base">{{ formatDate(user.created_at) }}</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-muted-foreground">Updated At</p>
                            <p class="text-base">{{ formatDate(user.updated_at) }}</p>
                        </div>
                        <div v-if="user.email_verified_at">
                            <p class="text-sm font-medium text-muted-foreground">
                                Email Verified At
                            </p>
                            <p class="text-base">{{ formatDate(user.email_verified_at) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
