import axios from 'axios';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const api = axios.create({
    baseURL: `${STRAPI_API_URL}/api`,
    headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
});

export const fetchBlogPosts = async () => {
    try {
        const response = await api.get('/blogs', {
            params: {
                populate: '*',
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
};
