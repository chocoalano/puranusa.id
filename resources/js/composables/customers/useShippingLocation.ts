import { ref } from 'vue';

export interface ShippingLocationOption {
    id: number;
    name: string;
}

interface ShippingApiResponse {
    success?: boolean;
    data?: Array<{
        id: number | string;
        name: string;
    }>;
}

const normalizeLocationOptions = (
    items: ShippingApiResponse['data'],
): ShippingLocationOption[] => {
    if (!items) {
        return [];
    }

    return items
        .map((item) => {
            const id =
                typeof item.id === 'string'
                    ? Number.parseInt(item.id, 10)
                    : item.id;

            if (!Number.isFinite(id) || typeof item.name !== 'string') {
                return null;
            }

            return {
                id,
                name: item.name,
            } satisfies ShippingLocationOption;
        })
        .filter((item): item is ShippingLocationOption => item !== null);
};

export function useShippingLocation() {
    const provinces = ref<ShippingLocationOption[]>([]);
    const cities = ref<ShippingLocationOption[]>([]);

    const loadingProvinces = ref(false);
    const loadingCities = ref(false);

    const citiesCache = new Map<number, ShippingLocationOption[]>();

    const fetchProvinces = async () => {
        loadingProvinces.value = true;

        try {
            const response = await fetch('/api/shipping/provinces', {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
            });

            if (!response.ok) {
                throw new Error('Gagal memuat data provinsi.');
            }

            const payload = (await response.json()) as ShippingApiResponse;
            provinces.value = normalizeLocationOptions(payload.data);
        } finally {
            loadingProvinces.value = false;
        }
    };

    const fetchCities = async (provinceId: number | null) => {
        if (!provinceId) {
            cities.value = [];
            return;
        }

        const cached = citiesCache.get(provinceId);
        if (cached) {
            cities.value = cached;
            return;
        }

        loadingCities.value = true;

        try {
            const params = new URLSearchParams({
                province_id: String(provinceId),
            });
            const response = await fetch(
                `/api/shipping/cities?${params.toString()}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'same-origin',
                },
            );

            if (!response.ok) {
                throw new Error('Gagal memuat data kota/kabupaten.');
            }

            const payload = (await response.json()) as ShippingApiResponse;
            const normalizedCities = normalizeLocationOptions(payload.data);

            citiesCache.set(provinceId, normalizedCities);
            cities.value = normalizedCities;
        } finally {
            loadingCities.value = false;
        }
    };

    const resetCities = () => {
        cities.value = [];
    };

    return {
        provinces,
        cities,
        loadingProvinces,
        loadingCities,
        fetchProvinces,
        fetchCities,
        resetCities,
    };
}
