import BlogDetailView from "@/modules/blogs/BlogDetailView";

const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL!;
type Params = Promise<{ id: string }>
export default async function Page({ params }: { params: Params } ) {
      const { id } = await params;
      const res = await fetch(
          `${strapiApiUrl}/api/blogs?populate[author][populate]=avatar&populate=cover_image&filters[slug][$eq]=${id}`,
          { next: { revalidate: 300 } }
      );
      const data = await res.json();
      const post = data.data?.[0];

      return <BlogDetailView post={post} />;
}
