import { routes } from "@/config/routes";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { getSourceId } from "@/lib/source-id";
import { redis } from "@/lib/redis-store";
import { Favourites } from "@/config/types";
import { navLinks } from "@/config/constants";




export const PublicHeader = async () => {
    const sourceId = await getSourceId();
    const favourites = await redis.get<Favourites>(sourceId ?? "");
    return (
        <header className="flex items-center border-b border-muted justify-between h-16 px-4 bg-transparent gap-x-6">
            <div className="flex items-center flex-1">
                <Link href={routes.home} className="flex items-center gap-2">
                    <Image
                        width={150}
                        height={150}
                        className="relative"
                        src="/logo.png" alt={""} />
                </Link>
            </div>
            <nav className="hidden md:block">
                {navLinks.map((link) => (
                    <Link
                        className="group font-heading rounded px-3 py-2 text-base text-foreground hover:text-primary duration-300 transition-all ease-in-out font-semibold uppercase"
                        href={link.href}
                        key={link.id}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
            <Button
                asChild
                variant="ghost"
                size="icon"
                className="relative inline-block group hover:bg-black"
            >
                <Link href={routes.favourites}>
                    <div className="flex hover:bg-gray-700 transition-colors ease-in-out items-center justify-center w-10 h-10 bg-muted rounded-full border-2 border-transparent hover:border-gray-700">
                        <HeartIcon className="w-6 h-6 text-primary group-hover:text-primary group-hover:fill-primary group-hover:border-0 group-hover:border-primary" />
                    </div>
                    <div className="absolute -top-1 5 -right-1.5 flex items-center justify-center w-5 h-5 text-white bg-pink-500 rounded-full group-hover:bg-primary">
                        <span className="text-xs">
                            {favourites ? favourites.ids.length : 0}
                        </span>
                    </div>
                </Link>
            </Button>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="link" size="icon" className="md:hidden border-none">
                        <MenuIcon className="w-6 text-primary" />
                        <SheetTitle className="sr-only">Toggle nav menu</SheetTitle>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs p-4 bg-black">
                    <nav className="grid gap-3">
                        {navLinks.map((link) => (
                            <Link
                                className="flex items-center gap-2 py-2 text-sm font-medium text-white hover:text-primary border-b border-b-gray-700"
                                href={link.href}
                                key={link.id}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>


        </header>
    );
};
