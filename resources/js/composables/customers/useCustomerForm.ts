import { useForm } from '@inertiajs/vue3';

export type CustomerFormMode = 'create' | 'edit';
export type CustomerGenderOption = '' | 'laki-laki' | 'perempuan';
export type CustomerMarriageOption = '0' | '1';
export type CustomerStatusOption = '1' | '2' | '3';

export interface CustomerNpwpFormState {
    nama: string;
    npwp: string;
    jk: CustomerGenderOption;
    npwp_date: string;
    alamat: string;
    menikah: CustomerMarriageOption;
    anak: number;
    kerja: string;
    office: string;
}

export interface CustomerFormState {
    name: string;
    username: string;
    nik: string;
    gender: CustomerGenderOption;
    email: string;
    phone: string;
    description: string;
    address: string;
    alamat: string;
    province_id: number | null;
    city_id: number | null;
    bank_name: string;
    bank_account: string;
    npwp: CustomerNpwpFormState;
    password: string;
    password_confirmation: string;
    sponsor_id: number | null;
    status: CustomerStatusOption;
    package_id: string;
    level: string;
}

export interface CustomerNpwpInitialValues {
    nama?: string | null;
    npwp?: string | null;
    jk?: string | null;
    npwp_date?: string | null;
    alamat?: string | null;
    menikah?: string | number | null;
    anak?: string | number | null;
    kerja?: string | null;
    office?: string | null;
}

export interface CustomerFormInitialValues {
    name?: string | null;
    username?: string | null;
    nik?: string | null;
    gender?: string | null;
    email?: string | null;
    phone?: string | null;
    description?: string | null;
    address?: string | null;
    alamat?: string | null;
    province_id?: number | string | null;
    city_id?: number | string | null;
    bank_name?: string | null;
    bank_account?: string | null;
    npwp?: CustomerNpwpInitialValues | null;
    password?: string | null;
    password_confirmation?: string | null;
    sponsor_id?: number | string | null;
    status?: string | number | null;
    package_id?: number | string | null;
    level?: string | null;
}

export interface CustomerNpwpPayload {
    nama: string;
    npwp: string;
    jk: CustomerGenderOption;
    npwp_date: string;
    alamat: string;
    menikah: number;
    anak: number;
    kerja: string;
    office: string;
}

export interface CustomerSubmitPayload {
    name: string;
    username: string;
    nik: string;
    gender: CustomerGenderOption;
    email: string;
    phone: string;
    description: string;
    address: string;
    alamat: string;
    province_id: number | null;
    city_id: number | null;
    bank_name: string;
    bank_account: string;
    npwp: CustomerNpwpPayload;
    password: string | null;
    password_confirmation: string | null;
    sponsor_id?: number | null;
    status?: number;
    package_id?: number | null;
    level?: string | null;
}

const normalizeString = (value: unknown): string => {
    if (typeof value !== 'string') {
        return '';
    }

    return value.trim();
};

const normalizeStringValue = (value: unknown): string => {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return String(value);
    }

    return normalizeString(value);
};

const normalizeNumber = (value: unknown): number | null => {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === 'string' && value.trim() !== '') {
        const parsed = Number.parseInt(value, 10);
        return Number.isNaN(parsed) ? null : parsed;
    }

    return null;
};

const normalizeStatus = (value: unknown): CustomerStatusOption => {
    const normalized = normalizeStringValue(value);

    if (normalized === '1' || normalized === '2' || normalized === '3') {
        return normalized;
    }

    return '1';
};

const normalizeGender = (value?: string | null): CustomerGenderOption => {
    if (!value) {
        return '';
    }

    const normalized = value.toLowerCase().trim();

    if (['l', 'male', 'laki-laki'].includes(normalized)) {
        return 'laki-laki';
    }

    if (['p', 'female', 'perempuan'].includes(normalized)) {
        return 'perempuan';
    }

    return '';
};

const normalizeMarriageStatus = (value: unknown): CustomerMarriageOption => {
    const normalized = String(value ?? '')
        .toLowerCase()
        .trim();

    if (['1', 'y', 'yes', 'true', 'menikah'].includes(normalized)) {
        return '1';
    }

    return '0';
};

const normalizeChildrenCount = (value: unknown): number => {
    const parsed = normalizeNumber(value);
    if (parsed === null) {
        return 0;
    }

    if (parsed < 0) {
        return 0;
    }

    if (parsed > 3) {
        return 3;
    }

    return parsed;
};

const createDefaultFormState = (): CustomerFormState => ({
    name: '',
    username: '',
    nik: '',
    gender: '',
    email: '',
    phone: '',
    description: '',
    address: '',
    alamat: '',
    province_id: null,
    city_id: null,
    bank_name: '',
    bank_account: '',
    npwp: {
        nama: '',
        npwp: '',
        jk: '',
        npwp_date: '',
        alamat: '',
        menikah: '0',
        anak: 0,
        kerja: 'Karyawan',
        office: '',
    },
    password: '',
    password_confirmation: '',
    sponsor_id: null,
    status: '1',
    package_id: '',
    level: '',
});

export function useCustomerForm(
    mode: CustomerFormMode,
    initialValues: CustomerFormInitialValues = {},
) {
    const defaults = createDefaultFormState();
    const npwpDefaults = defaults.npwp;
    const npwpInitialValues = initialValues.npwp ?? {};

    const form = useForm<CustomerFormState>({
        name: normalizeString(initialValues.name) || defaults.name,
        username: normalizeString(initialValues.username) || defaults.username,
        nik: normalizeString(initialValues.nik) || defaults.nik,
        gender: normalizeGender(initialValues.gender),
        email: normalizeString(initialValues.email) || defaults.email,
        phone: normalizeString(initialValues.phone) || defaults.phone,
        description:
            normalizeString(initialValues.description) || defaults.description,
        address: normalizeString(initialValues.address) || defaults.address,
        alamat: normalizeString(initialValues.alamat) || defaults.alamat,
        province_id: normalizeNumber(initialValues.province_id),
        city_id: normalizeNumber(initialValues.city_id),
        bank_name:
            normalizeString(initialValues.bank_name) || defaults.bank_name,
        bank_account:
            normalizeString(initialValues.bank_account) ||
            defaults.bank_account,
        npwp: {
            nama: normalizeString(npwpInitialValues.nama) || npwpDefaults.nama,
            npwp: normalizeString(npwpInitialValues.npwp) || npwpDefaults.npwp,
            jk: normalizeGender(npwpInitialValues.jk),
            npwp_date:
                normalizeString(npwpInitialValues.npwp_date) ||
                npwpDefaults.npwp_date,
            alamat:
                normalizeString(npwpInitialValues.alamat) ||
                npwpDefaults.alamat,
            menikah: normalizeMarriageStatus(npwpInitialValues.menikah),
            anak: normalizeChildrenCount(npwpInitialValues.anak),
            kerja:
                normalizeString(npwpInitialValues.kerja) || npwpDefaults.kerja,
            office:
                normalizeString(npwpInitialValues.office) ||
                npwpDefaults.office,
        },
        password: normalizeString(initialValues.password) || defaults.password,
        password_confirmation:
            normalizeString(initialValues.password_confirmation) ||
            defaults.password_confirmation,
        sponsor_id: normalizeNumber(initialValues.sponsor_id),
        status: normalizeStatus(initialValues.status),
        package_id:
            normalizeStringValue(initialValues.package_id) ||
            defaults.package_id,
        level: normalizeString(initialValues.level),
    });

    const toPayload = (data: CustomerFormState): CustomerSubmitPayload => {
        const password = normalizeString(data.password);
        const passwordConfirmation = normalizeString(
            data.password_confirmation,
        );
        const anakCount = normalizeChildrenCount(data.npwp.anak);

        const payload: CustomerSubmitPayload = {
            name: normalizeString(data.name),
            username: normalizeString(data.username),
            nik: normalizeString(data.nik).replace(/\D+/g, ''),
            gender: data.gender,
            email: normalizeString(data.email),
            phone: normalizeString(data.phone),
            description: normalizeString(data.description),
            address: normalizeString(data.address),
            alamat: normalizeString(data.alamat),
            province_id: normalizeNumber(data.province_id),
            city_id: normalizeNumber(data.city_id),
            bank_name: normalizeString(data.bank_name),
            bank_account: normalizeString(data.bank_account),
            npwp: {
                nama: normalizeString(data.npwp.nama),
                npwp: normalizeString(data.npwp.npwp).replace(/\D+/g, ''),
                jk: data.npwp.jk,
                npwp_date: normalizeString(data.npwp.npwp_date),
                alamat: normalizeString(data.npwp.alamat),
                menikah:
                    normalizeMarriageStatus(data.npwp.menikah) === '1' ? 1 : 0,
                anak: anakCount,
                kerja: normalizeString(data.npwp.kerja),
                office: normalizeString(data.npwp.office),
            },
            password: mode === 'edit' && password === '' ? null : password,
            password_confirmation:
                mode === 'edit' && passwordConfirmation === ''
                    ? null
                    : passwordConfirmation,
            sponsor_id: normalizeNumber(data.sponsor_id),
            package_id: normalizeNumber(data.package_id),
            level: normalizeString(data.level) || null,
        };

        if (mode === 'create') {
            payload.status = Number.parseInt(data.status, 10) || 1;
        }

        return payload;
    };

    return {
        form,
        toPayload,
    };
}
