'use client';

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import Navbar from "@/modules/common/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { HeroSection } from "@/modules/home/components/HeroSection";
import { BlogPreview } from "@/modules/home/components/Blog";
import { Testimonials } from "@/modules/home/components/TestiMonials";
import TopSellers from "@/modules/home/components/TopSellers";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Building, Mail, Phone, PlayCircle } from "lucide-react";

interface Video {
    id: number;
    title: string;
    description: string;
    thumbnail: {
        url: string;
    };
    video_file: {
        url: string;
    };
}

export default function Home() {
    const [carouselVideos, setCarouselVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const strapiApiUrl = 'http://localhost:1337';

    useEffect(() => {
        const fetchCarouselVideos = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${strapiApiUrl}/api/videos?populate=*&pagination[page]=1&pagination[pageSize]=6`
                );
                if (!response.ok) throw new Error('Failed to fetch videos');
                const result = await response.json();
                setCarouselVideos(result.data);
            } catch (error) {
                console.error("Error fetching carousel videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCarouselVideos();
    }, []);

    return (
        <div
            className="w-screen min-h-screen bg-[radial-gradient(circle_farthest-corner_at_10%_20%,_#232526_0%,_#414345_90%)]">
            <div className="grid grid-cols-12">
                <Navbar />
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mx-4">
                <HeroSection />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                id="aboutUs"
                className="py-16 sm:py-24"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="relative lg:pr-4">
                            <div className="relative h-[30rem] w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop"
                                    alt="Modern gym interior"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
                            </div>
                        </div>

                        <div className="lg:pl-4">
                            <div className="text-base leading-7 text-gray-400">
                                <p className="text-base font-semibold leading-7 text-indigo-400">10 Yılı Aşkın
                                    Tecrübe</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Hedeflerinize Ulaşmanız İçin Buradayız
                                </h1>
                                <div className="mt-6 max-w-xl space-y-6">
                                    <p>
                                        2010 yılından bu yana, sağlıklı yaşam ve spor kültürünü topluluğumuza yayma
                                        misyonuyla hizmet veriyoruz. Amacımız, sadece fiziksel olarak değil, zihinsel
                                        olarak da güçlü ve sağlıklı bireyler yetiştirmeye yardımcı olmaktır.
                                    </p>
                                    <p>
                                        Modern ekipmanlarımız, uzman eğitmen kadromuz ve motive edici atmosferimizle,
                                        fitness hedeflerinizi bir sonraki seviyeye taşımanız için yanınızdayız.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-white/10 pt-10 sm:grid-cols-2">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z"/>
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-base font-semibold text-white">Kişiye Özel Programlar</h3>
                                        <p className="mt-1 text-sm text-gray-400">Uzman antrenörlerimizle hedeflerinize
                                            özel hazırlanan programlar.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.228a4.5 4.5 0 00-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 001.13-1.897M16.5 7.5l-1.5-1.5m0 0l-1.5 1.5m1.5-1.5V5.25m0 2.25v1.5m0 0l1.5 1.5m-1.5-1.5l1.5-1.5M12 9.75l-1.5-1.5m0 0l-1.5 1.5m1.5-1.5V7.5m0 2.25v1.5m0 0l1.5 1.5m-1.5-1.5l1.5-1.5"/>
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-base font-semibold text-white">Dinamik Grup Dersleri</h3>
                                        <p className="mt-1 text-sm text-gray-400">Yoga, Pilates, HIIT ve daha fazlasıyla
                                            enerjinizi yükseltin.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-10 mx-4">
                <TopSellers />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                id="ourContent"
                className="py-16 sm:py-24"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-400">Antrenmanlar & İpuçları</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Videolarımız</p>
                        <p className="mt-6 text-lg leading-8 text-gray-300">Uzman eğitmenlerimiz tarafından hazırlanan özel antrenman videoları ile formunuzu koruyun ve yeni teknikler öğrenin.</p>
                    </div>

                    <div className="relative mt-16 min-h-[300px]">
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <Loader2 className="h-12 w-12 animate-spin text-indigo-400" />
                            </div>
                        ) : (
                            <Carousel
                                opts={{ align: "start", loop: carouselVideos.length >= 4 }}
                                className="w-full"
                            >
                                <CarouselContent>
                                    {carouselVideos.map((video) => (
                                        <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                                            <div className="group relative overflow-hidden rounded-2xl">
                                                <video
                                                    poster={`${strapiApiUrl}${video.thumbnail.url}`}
                                                    className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                                    playsInline
                                                    muted
                                                    loop
                                                    onMouseOver={event => (event.target as HTMLVideoElement).play()}
                                                    onMouseOut={event => (event.target as HTMLVideoElement).pause()}
                                                >
                                                    <source src={`${strapiApiUrl}${video.video_file.url}`} type="video/mp4" />
                                                </video>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                                <div className="absolute inset-0 flex flex-col justify-end p-6">
                                                    <h3 className="text-xl font-bold text-white">{video.title}</h3>
                                                    <p className="mt-1 text-sm text-gray-300">{video.description.substring(0,100)}</p>
                                                    <Link href="/videos" className="mt-4 flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                                                        Videoyu İzle
                                                        <PlayCircle className="ml-2 h-5 w-5" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                {carouselVideos.length >= 4 && (
                                    <>
                                        <CarouselPrevious className="left-[-1rem] sm:left-[-2rem] bg-gray-800/50 text-white border-white/20 hover:bg-gray-700" />
                                        <CarouselNext className="right-[-1rem] sm:right-[-2rem] bg-gray-800/50 text-white border-white/20 hover:bg-gray-700" />
                                    </>
                                )}
                            </Carousel>
                        )}
                    </div>
                    <div className="mt-16 text-center">
                        <Button asChild size="lg" className="bg-indigo-500 text-white hover:bg-indigo-400">
                            <Link href="/videos">Tüm Videoları Gör</Link>
                        </Button>
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                id="testimonials"
                className="mt-12 mb-16 mx-4"
            >
                <Testimonials />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                id="blog"
                className="mt-12 mb-16 mx-4"
            >
                <BlogPreview />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                id="contactUs"
                className="isolate py-16 sm:py-24"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Bizimle İletişime Geçin
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-300">
                            Sorularınız, üyelik talepleriniz veya herhangi bir konuda bilgi almak için bize yazmaktan
                            çekinmeyin.
                        </p>
                    </div>

                    <div
                        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:max-w-none lg:grid-cols-2">

                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-semibold leading-10 text-white">Bize Ulaşın</h3>
                            <p className="mt-2 text-base leading-7 text-gray-400">
                                Aşağıdaki bilgilerden veya yandaki formu kullanarak bize ulaşabilirsiniz. En kısa sürede
                                size geri dönüş yapacağız.
                            </p>
                            <dl className="mt-10 space-y-6 text-base leading-7 text-gray-300">
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Adres</span>
                                        <Building className="h-7 w-6 text-gray-400" aria-hidden="true"/>
                                    </dt>
                                    <dd className="text-white">
                                        Örnek Mah. Spor Cad. No:123, <br/>
                                        GymTower, İstanbul
                                    </dd>
                                </div>
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Telefon</span>
                                        <Phone className="h-7 w-6 text-gray-400" aria-hidden="true"/>
                                    </dt>
                                    <dd>
                                        <a className="hover:text-white" href="tel:+90 (555) 123-4567">
                                            +90 (555) 123-4567
                                        </a>
                                    </dd>
                                </div>
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">E-posta</span>
                                        <Mail className="h-7 w-6 text-gray-400" aria-hidden="true"/>
                                    </dt>
                                    <dd>
                                        <a className="hover:text-white" href="mailto:info@gympro.com">
                                            info@gympro.com
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <form className="space-y-8">
                            <div>
                                <Label htmlFor="name" className="block text-base font-semibold leading-6 text-white">Ad
                                    Soyad</Label>
                                <div className="mt-2.5">
                                    <Input
                                        type="text"
                                        id="name"
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="email"
                                       className="block text-base font-semibold leading-6 text-white">E-posta</Label>
                                <div className="mt-2.5">
                                    <Input
                                        type="email"
                                        id="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="message"
                                       className="block text-base font-semibold leading-6 text-white">Mesajınız</Label>
                                <div className="mt-2.5">
                                    <Textarea
                                        id="message"
                                        rows={4}
                                        className="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit"
                                        className="w-full bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Mesajı Gönder
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}