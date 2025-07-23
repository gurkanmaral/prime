import { Button } from "@/components/ui/button";
import Link from "next/link";

const blogPosts = [
    {
        id: 1,
        title: "Doğru Squat Nasıl Yapılır? 5 Yaygın Hata",
        href: "/blog/dogru-squat-nasil-yapilir",
        description: "Squat hareketini yaparken sıkça yapılan hataları öğrenin ve formunuzu mükemmelleştirerek sakatlık riskini en aza indirin.",
        imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop",
        category: { title: "Teknik", href: "/blog/category/teknik" },
    },
    {
        id: 2,
        title: "Antrenman Sonrası Beslenme: Kas Gelişimi İçin 7 İpucu",
        href: "/blog/antrenman-sonrasi-beslenme",
        description: "Yoğun bir antrenmanın ardından kaslarınızın onarılması ve büyümesi için ne yemeniz gerektiğini keşfedin.",
        imageUrl: "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1965&auto=format&fit=crop",
        category: { title: "Beslenme", href: "/blog/category/beslenme" },
    },
    {
        id: 3,
        title: "Motivasyonunuzu Yüksek Tutmanın Yolları",
        href: "/blog/motivasyon",
        description: "Spor salonuna gitmek için motivasyon bulmakta zorlanıyor musunuz? İşte sizi harekete geçirecek bilimsel yöntemler.",
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
        category: { title: "Motivasyon", href: "/blog/category/motivasyon" },
    }
];

export const BlogPreview = () => (
    <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-base font-semibold leading-7 text-indigo-400">Fitness İpuçları & Blog</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Bilgiyle Güçlenin
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                    Sağlıklı yaşam, beslenme ve antrenman üzerine en güncel makalelerimizle hedeflerinize daha bilinçli adımlarla ilerleyin.
                </p>
            </div>
            <div
                className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {blogPosts.map((post) => (
                    <article
                        key={post.id}
                        className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 transition-all duration-300 hover:scale-105"
                    >
                        <img src={post.imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/60" />
                        <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                        <div
                            className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                            <div className="flex items-center gap-x-4">
                                <span
                                    className="inline-flex items-center rounded-md bg-gray-50/10 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
                                    {post.category.title}
                                </span>
                            </div>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                            <Link href={post.href}>
                                <span className="absolute inset-0" />
                                {post.title}
                            </Link>
                        </h3>
                    </article>
                ))}
            </div>

            {/* --- ADDED THIS SECTION --- */}
            <div className="mt-16 text-center">
                <Button asChild size="lg" className="bg-indigo-500 text-white hover:bg-indigo-400">
                    <Link href="/blog">
                        Tüm Blog Yazılarını Gör
                    </Link>
                </Button>
            </div>
            {/* --- END OF ADDED SECTION --- */}

        </div>
    </div>
);