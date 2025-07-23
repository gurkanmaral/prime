import BlogDetailView from "@/modules/blogs/BlogDetailView";

export default function Page({ params }: { params: { id: string } }) {

      return (
          <BlogDetailView id={params.id} />
      )
}