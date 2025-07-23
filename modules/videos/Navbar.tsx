import React from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Navbar = () => {
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const navItems = [
        { label: "Anasayfa", id: "aboutUs",link:"/" },
    ];

    return (
        <div className="col-span-12 z-50">
            <div className="grid grid-cols-12 ">
                <div className="col-span-3 flex items-center pl-4">
                    <Avatar>
                        <AvatarImage src="/assets/loog.svg" alt="Gym Logo" className="" />
                    </Avatar>
                </div>
                <div className="col-span-6 pt-4 pb-4 flex gap-10 items-center justify-center max-md:hidden">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.link}
                            className="font-bold text-lg text-gray-100 cursor-pointer relative group"
                        >
                            {item.label}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-300 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>
                <div className="col-span-3 flex items-center justify-end pr-4 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6 text-gray-100" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="bg-[radial-gradient(circle_farthest-corner_at_10%_20%,_#232526_0%,_#414345_90%)] border-l border-gray-600">
                            <div className="flex flex-col gap-4 mt-8">
                                {navItems.map((item) => (
                                    <span
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className="font-bold text-lg text-gray-100 cursor-pointer"
                                    >
                                        {item.label}
                                    </span>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
};

export default Navbar;