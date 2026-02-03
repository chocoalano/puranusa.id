export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export interface ZennerFilters {
    search: string | null;
    status: string | null;
    sort_by: string;
    sort_order: string;
    per_page: number;
    [key: string]: string | number | null | undefined;
}

export interface WelcomeVideo {
    id: number;
    title: string;
    video_url: string;
    description: string | null;
    thumbnail: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface JoinMedsos {
    id: number;
    platform: string;
    url: string;
    icon: string | null;
    description: string | null;
    followers_count: number;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface MarketingKit {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    file_type: string;
    thumbnail: string | null;
    category: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Copywriting {
    id: number;
    title: string;
    content: string;
    category: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Gallery {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    file_type: string;
    thumbnail: string | null;
    category: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface ProcureProduct {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    price: number;
    points: number;
    category: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Testimonial {
    id: number;
    customer_name: string;
    content: string;
    image: string | null;
    rating: number;
    product_name: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Course {
    id: number;
    title: string;
    description: string | null;
    thumbnail: string | null;
    level: string;
    is_active: boolean;
    sort_order: number;
    lessons_count?: number;
    lessons?: Lesson[];
    created_at: string;
    updated_at: string;
}

export interface Lesson {
    id: number;
    course_id: number;
    title: string;
    content: string | null;
    video_url: string | null;
    duration_minutes: number;
    is_active: boolean;
    sort_order: number;
    course?: { id: number; title: string };
    created_at: string;
    updated_at: string;
}

export interface IncentiveRule {
    id: number;
    title: string;
    description: string | null;
    type: string;
    conditions: Record<string, unknown> | null;
    rewards: Record<string, unknown> | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface ProductKnowledge {
    id: number;
    title: string;
    content: string;
    image: string | null;
    category: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface SellingGuide {
    id: number;
    title: string;
    content: string;
    image: string | null;
    category: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface AdsGuide {
    id: number;
    title: string;
    content: string;
    image: string | null;
    platform: string | null;
    budget_range: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Webinar {
    id: number;
    title: string;
    description: string | null;
    speaker: string | null;
    scheduled_at: string;
    duration_minutes: number;
    meeting_url: string | null;
    status: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface LeaderboardConfig {
    id: number;
    title: string;
    type: string;
    period: string;
    calculation_field: string;
    is_active: boolean;
    entries_count?: number;
    entries?: LeaderboardEntry[];
    created_at: string;
    updated_at: string;
}

export interface LeaderboardEntry {
    id: number;
    config_id: number;
    customer_id: number;
    customer_name: string;
    score: number;
    rank: number;
    period_label: string | null;
    config?: LeaderboardConfig;
    created_at: string;
    updated_at: string;
}

export interface Certificate {
    id: number;
    title: string;
    description: string | null;
    template_image: string | null;
    type: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface MonthlyChallenge {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    start_date: string;
    end_date: string;
    reward: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface TopAffiliate {
    id: number;
    customer_id: number;
    customer_name: string;
    period: string;
    rank: number;
    score: number;
    created_at: string;
    updated_at: string;
}

export interface HallOfFame {
    id: number;
    customer_name: string;
    title: string;
    description: string | null;
    image: string | null;
    achievement: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}
