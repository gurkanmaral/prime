// app/videos/page.tsx
import axios from 'axios';
import { StrapiResponse, Video } from '@/modules/types/strapi';

// Define props interface
interface VideosPageProps {
    videos: Video[];
}

// Fetch data directly in the Server Component
async function fetchVideos(): Promise<Video[]> {
    try {
        const response = await axios.get<StrapiResponse<Video>>(
            `${process.env.STRAPI_API_URL}/api/videos?populate=*`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
            }
        );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
}

// Server Component
export default async function VideosPage() {
    const videos: Video[] = await fetchVideos();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Gym Videos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {videos.map((video) => (
                    <div key={video.id} className="border rounded-lg p-4">
                        <h2 className="text-xl font-semibold">{video.attributes.title}</h2>
                        {video.attributes.thumbnail?.data && (
                            <img
                                src={`${process.env.STRAPI_API_URL}${video.attributes.thumbnail.data.attributes.url}`}
                                alt={video.attributes.title}
                                className="w-full h-48 object-cover rounded"
                            />
                        )}
                        <p className="text-gray-600">{video.attributes.description}</p>
                        <a
                            href={video.attributes.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Watch Video
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Enable Incremental Static Regeneration (ISR)
export const revalidate = 60; // Revalidate every 60 seconds