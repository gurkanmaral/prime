import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CTABanner = () =>  {

    return (
        <div className="relative isolate overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
                alt="Person working out in a modern gym"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent -z-10"></div>

            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
                <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Değişimi Başlat.
                        <br/>
                        Bugün Bize Katıl.
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Son teknoloji ekipmanlar, uzman eğitmenler ve sizi hedeflerinize taşıyacak motive edici bir
                        toplulukla tanışın.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <Button asChild size="lg" className="bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg">
                            <Link href="/pricing">Üyeliği Başlat</Link>
                        </Button>
                        <Button asChild variant="link" className="text-sm font-semibold leading-6 text-white">
                            <Link href="/about">Daha Fazla Bilgi →</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}