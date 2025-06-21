import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY <= 30) setShowNavbar(true);
            else if (currentScrollY > lastScrollY) setShowNavbar(false);
            else setShowNavbar(true);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navItems = [
        { label: "Hakkımızda", id: "aboutUs" },
        { label: "İçeriklerimiz", id: "ourContent" },
        { label: "İletişim", id: "contactUs" },
    ];

    return (
        <motion.div
            animate={{ y: showNavbar ? '0%' : '-100%' }}
            transition={{ duration: 0.3 }}
            className="col-span-12 fixed top-0 left-0 right-0 z-50 bg-gray-100 shadow-md"
        >
            <div className="grid grid-cols-12 border-b border-gray-300">
                <div className="col-span-3 flex items-center pl-4">
                    <Avatar>
                        <AvatarImage src="/assets/loog.svg" alt="Gym Logo" className="" />
                    </Avatar>
                </div>
                <div className="col-span-6 pt-4 pb-4 flex gap-10 items-center justify-center max-md:hidden">
                    {navItems.map((item) => (
                        <span
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="font-bold text-lg text-gray-800 cursor-pointer relative group"
                        >
                            {item.label}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full" />
                        </span>
                    ))}
                </div>
                <div className="col-span-3 flex items-center justify-end pr-4 gap-2">
                    <Button variant="outline" className="border-gray-600 text-gray-600 hover:bg-gray-200">Login</Button>
                    <Button className="bg-gray-700 text-gray-100 hover:bg-gray-600">Sign Up</Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="md:hidden">
                                <Menu className="h-6 w-6 text-gray-600" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="bg-gray-100">
                            <div className="flex flex-col gap-4 mt-4">
                                {navItems.map((item) => (
                                    <span
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className="font-bold text-lg text-gray-800 cursor-pointer"
                                    >
                                        {item.label}
                                    </span>
                                ))}
                                <Button variant="outline" className="border-gray-600 text-gray-600 hover:bg-gray-200">Login</Button>
                                <Button className="bg-gray-700 text-gray-100 hover:bg-gray-600">Sign Up</Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;