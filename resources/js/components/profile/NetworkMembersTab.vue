<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, UserPlus } from 'lucide-vue-next';

interface NetworkMember {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    position: string | null;
    level: number | null;
    has_placement: boolean;
    has_purchase: boolean;
    joined_at: string;
}

defineProps<{
    activeMembers: NetworkMember[];
    passiveMembers: NetworkMember[];
    prospectMembers: NetworkMember[];
}>();

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const getPositionBadge = (position: string | null): {
    variant: 'default' | 'secondary' | 'outline';
    text: string;
} => {
    if (!position) return { variant: 'outline', text: 'Belum Ditempatkan' };
    return {
        variant: position === 'left' ? 'default' : 'secondary',
        text: position === 'left' ? 'Kiri' : 'Kanan',
    };
};
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Jaringan Member</CardTitle>
            <CardDescription>Kelola dan lihat member dalam jaringan Anda</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs default-value="active" class="w-full">
                <TabsList class="grid w-full grid-cols-3">
                    <TabsTrigger value="active">
                        <CheckCircle class="w-4 h-4 mr-2" />
                        Aktif ({{ activeMembers.length }})
                    </TabsTrigger>
                    <TabsTrigger value="passive">
                        <Clock class="w-4 h-4 mr-2" />
                        Pasif ({{ passiveMembers.length }})
                    </TabsTrigger>
                    <TabsTrigger value="prospect">
                        <UserPlus class="w-4 h-4 mr-2" />
                        Prospek ({{ prospectMembers.length }})
                    </TabsTrigger>
                </TabsList>

                <!-- Active Members -->
                <TabsContent value="active" class="space-y-4">
                    <div
                        v-if="activeMembers.length === 0"
                        class="text-center py-12 text-muted-foreground"
                    >
                        <CheckCircle class="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>Belum ada member aktif</p>
                        <p class="text-sm mt-2">Member aktif adalah member yang sudah ditempatkan di binary tree</p>
                    </div>
                    <Card
                        v-for="member in activeMembers"
                        :key="member.id"
                        class="hover:shadow-md transition-shadow"
                    >
                        <CardContent class="p-4">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <h4 class="font-semibold text-lg">{{ member.name }}</h4>
                                        <Badge :variant="getPositionBadge(member.position).variant">
                                            {{ getPositionBadge(member.position).text }}
                                        </Badge>
                                        <Badge variant="outline" v-if="member.level">
                                            Level {{ member.level }}
                                        </Badge>
                                    </div>
                                    <div class="space-y-1 text-sm text-muted-foreground">
                                        <p>{{ member.email }}</p>
                                        <p v-if="member.phone">{{ member.phone }}</p>
                                        <p class="text-xs">Bergabung: {{ formatDate(member.joined_at) }}</p>
                                    </div>
                                </div>
                                <div class="flex flex-col items-end gap-2">
                                    <Badge variant="default">
                                        <CheckCircle class="w-3 h-3 mr-1" />
                                        Aktif
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <!-- Passive Members -->
                <TabsContent value="passive" class="space-y-4">
                    <div
                        v-if="passiveMembers.length === 0"
                        class="text-center py-12 text-muted-foreground"
                    >
                        <Clock class="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>Belum ada member pasif</p>
                        <p class="text-sm mt-2">Member pasif adalah member yang sudah melakukan pembelian tapi belum masuk binary tree</p>
                    </div>
                    <Card
                        v-for="member in passiveMembers"
                        :key="member.id"
                        class="hover:shadow-md transition-shadow"
                    >
                        <CardContent class="p-4">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <h4 class="font-semibold text-lg">{{ member.name }}</h4>
                                        <Badge variant="secondary">Belum Ditempatkan</Badge>
                                    </div>
                                    <div class="space-y-1 text-sm text-muted-foreground">
                                        <p>{{ member.email }}</p>
                                        <p v-if="member.phone">{{ member.phone }}</p>
                                        <p class="text-xs">Bergabung: {{ formatDate(member.joined_at) }}</p>
                                    </div>
                                </div>
                                <div class="flex flex-col items-end gap-2">
                                    <Badge variant="outline">
                                        <Clock class="w-3 h-3 mr-1" />
                                        Pasif
                                    </Badge>
                                    <Badge variant="default" v-if="member.has_purchase">
                                        Ada Pembelian
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <!-- Prospect Members -->
                <TabsContent value="prospect" class="space-y-4">
                    <div
                        v-if="prospectMembers.length === 0"
                        class="text-center py-12 text-muted-foreground"
                    >
                        <UserPlus class="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>Belum ada member prospek</p>
                        <p class="text-sm mt-2">Member prospek adalah member yang baru mendaftar dan sudah melakukan pembelian</p>
                    </div>
                    <Card
                        v-for="member in prospectMembers"
                        :key="member.id"
                        class="hover:shadow-md transition-shadow"
                    >
                        <CardContent class="p-4">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <h4 class="font-semibold text-lg">{{ member.name }}</h4>
                                        <Badge variant="outline">Baru Bergabung</Badge>
                                    </div>
                                    <div class="space-y-1 text-sm text-muted-foreground">
                                        <p>{{ member.email }}</p>
                                        <p v-if="member.phone">{{ member.phone }}</p>
                                        <p class="text-xs">Bergabung: {{ formatDate(member.joined_at) }}</p>
                                    </div>
                                </div>
                                <div class="flex flex-col items-end gap-2">
                                    <Badge variant="secondary">
                                        <UserPlus class="w-3 h-3 mr-1" />
                                        Prospek
                                    </Badge>
                                    <Badge variant="default" v-if="member.has_purchase">
                                        Ada Pembelian
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
</template>
