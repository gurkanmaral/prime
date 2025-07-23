import {BlogList} from "@/modules/blogs/BlogsView";

const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const postsPerPage = 6;

async function getInitialPosts() {
    try {
        const response = await fetch(
            `${strapiApiUrl}/api/blogs?populate[author][populate]=avatar&populate=cover_image&pagination[page]=1&pagination[pageSize]=${postsPerPage}&sort=publishedAt:desc`,
            {
                next: { revalidate: 300 }
            }
        );
        if (!response.ok) throw new Error('Failed to fetch initial posts');
        return response.json();
    } catch (error) {
        console.error("Error fetching initial posts:", error);
        return { data: [], meta: { pagination: { page: 1, pageSize: 6, pageCount: 1, total: 0 } } };
    }
}

export default async function BlogPage() {
    const initialData = await getInitialPosts();
    const initialPosts = initialData.data;
    const initialPagination = initialData.meta.pagination;

    return (
                <BlogList
                    initialPosts={initialPosts}
                    initialPagination={initialPagination}
                    strapiUrl={strapiApiUrl}
                />

    );
}