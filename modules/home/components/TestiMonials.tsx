import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from 'lucide-react';

// Dummy testimonials data for the example
const testimonials = [
    {
        name: "Ayşe Yılmaz",
        handle: "Yazılım Geliştirici",
        imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
        quote: "Salonun atmosferi harika! Hem ekipman kalitesi hem de eğitmenlerin ilgisi sayesinde hedeflerime beklediğimden çok daha hızlı ulaştım."
    },
    {
        name: "Mehmet Kaya",
        handle: "Grafik Tasarımcı",
        imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
        quote: "Grup dersleri inanılmaz eğlenceli ve motive edici. Özellikle spinning dersleri favorim. Herkese tavsiye ederim!"
    },
    {
        name: "Elif Demir",
        handle: "Öğrenci",
        imageUrl: "https://randomuser.me/api/portraits/women/33.jpg",
        quote: "Temizliği ve ferahlığı ile öne çıkan bir salon. Personelin güler yüzlü olması da insanı her zaman pozitif etkiliyor. Üyelik yenilemeyi dört gözle bekliyorum."
    }
];

export const Testimonials = () =>  {
    return (
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-400">Üyelerimiz Ne
                        Diyor?</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Topluluğumuzun Başarı Hikayeleri
                    </p>
                </div>
                <div
                    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name}
                              className="relative overflow-hidden rounded-2xl bg-gray-800/50 shadow-lg ring-1 ring-white/10">
                            <CardHeader>
                                <div className="flex items-center gap-x-4">
                                    <img src={testimonial.imageUrl} alt={testimonial.name}
                                         className="h-12 w-12 flex-none rounded-full object-cover"/>
                                    <div>
                                        <CardTitle className="text-white">{testimonial.name}</CardTitle>
                                        <CardDescription
                                            className="text-gray-400">{testimonial.handle}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 before:content-['“'] after:content-['”'] before:font-serif before:text-4xl before:font-bold before:text-indigo-400 before:mr-1 after:font-serif after:text-4xl after:font-bold after:text-indigo-400 after:ml-1">
                                    {testimonial.quote}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
    )
}