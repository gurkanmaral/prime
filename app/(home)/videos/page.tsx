import {VideoList} from "@/modules/videos/VideosList";

const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const videosPerPage = 6;

async function getInitialVideos(page: number = 1) {
  try {
    const response = await fetch(
        `${strapiApiUrl}/api/videos?populate=*&pagination[page]=${page}&pagination[pageSize]=${videosPerPage}`,
        { next: { revalidate: 300 } } // Cache for 5 minutes
    );
    if (!response.ok) throw new Error('Failed to fetch initial videos');
    return response.json();
  } catch (error) {
    console.error("Error fetching initial videos:", error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 6, pageCount: 1, total: 0 } } };
  }
}

export default async function VideosPage() {
  const page = 1;
  const initialData = await getInitialVideos(page);
  const initialVideos = initialData.data;
  const initialPagination = initialData.meta.pagination;

  return (
          <VideoList
              initialVideos={initialVideos}
              initialPagination={initialPagination}
              strapiUrl={strapiApiUrl}
          />
  );
}