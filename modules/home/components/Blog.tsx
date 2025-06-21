import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const BlogPreview = () => (
    <div className="mt-12 mb-16 mx-4 max-w-6xl mx-auto">
        <div className="relative flex justify-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Fitness Tips & Blog</h1>
            <Button asChild className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 text-gray-100 hover:bg-gray-600">
                <Link href="/blog">More Articles</Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: "5 Tips for Better Workouts", excerpt: "Maximize your gym time with these expert tips.", image: "https://placehold.co/600x400?text=Blog+1" },
                { title: "Healthy Eating Guide", excerpt: "Learn how to fuel your body for fitness.", image: "https://placehold.co/600x400?text=Blog+2" },
                { title: "Yoga for Beginners", excerpt: "Start your yoga journey with these basics.", image: "https://placehold.co/600x400?text=Blog+3" },
            ].map((post, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-800">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <Button asChild className="bg-gray-700 text-gray-100 hover:bg-gray-600">
                            <Link href={`/blog/${index + 1}`}>Read More</Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);