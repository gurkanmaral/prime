export interface StrapiMedia {
    data: {
        id: number;
        attributes: {
            url: string;
            alternativeText?: string;
            caption?: string;
        };
    } | null;
}

export interface Video {
    id: number;
    attributes: {
        title: string;
        description?: string;
        video_url: string;
        thumbnail?: StrapiMedia;
        category?: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface Blog {
    id: number;
    attributes: {
        title: string;
        content: string;
        slug: string;
        featured_image?: StrapiMedia;
        author?: string;
        published_at: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface StrapiResponse<T> {
    data: T[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}