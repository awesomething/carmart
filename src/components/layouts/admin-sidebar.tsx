"use client";
import { AnimatePresence, Variants } from "framer-motion";
import { useCallback, useState } from "react";
import { motion } from "framer-motion"
import Link from "next/link";
import { routes } from "@/config/routes";
import Image from "next/image";
import { CarFrontIcon, LayoutDashboardIcon, SettingsIcon, UserIcon } from "lucide-react";

const navigation = [
    {
        name: 'Dashboard',
        href: routes.admin.dashboard,
        icon:LayoutDashboardIcon,

    },
    {
        name: 'Classifieds',
        href: routes.admin.classifieds,
        icon: CarFrontIcon,

    },
    {
        name: 'Customers',
        href: routes.admin.customers,
        icon:UserIcon,

    },
    {
        name: 'Settings',
        href: routes.admin.settings,
        icon:SettingsIcon,

    },
]

export const AdminSidebar = () => {

    const [isSidebarExtended, setIsSidebarExpanded] = useState(false)
    const handleSidebarHover = useCallback((expanded: boolean) => {
        setIsSidebarExpanded(expanded);
    }, []);

    const sidebarVariants: Variants = {
        expanded: { width: 256 },
        collapsed: { width: 60 }
    }

    const menuTextVariants: Variants = {
        expanded: {
            opacity: 1,
            width: "auto",
            marginLeft: 10,
        },
        collapsed: { opacity: 0, width: 0 }
    }

    const logoVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    }

    return <motion.div className="bg-black/20 h-screen overflow-hidden flex flex-col" animate={isSidebarExtended ? "expanded" : "collapsed"} variants={sidebarVariants}
        initial="collapsed"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => handleSidebarHover(true)}
        onMouseLeave={() => handleSidebarHover(false)}
    >
        <div className="flex flex-col grow px-4">
            <Link href={routes.home}>
            
            <div className="relative h-[60px] w-full">
                <AnimatePresence initial={false} mode="wait" >
                    {isSidebarExtended ? (
                        <motion.div key="collapsed-logo" className="absolute inset-0" variants={logoVariants} initial='initial' animate='animate' exit='exit' transition={{ duration: 0.4 }}>
                            <Image alt="EazyDev Dealership logo" src="/logo-1.png"

                                fill={true}
                                className="object-contain object-left mt-0 pt-0 "
                            />
                        </motion.div>
                    ) : (
                        <motion.div key="expanded-logo" className="absolute inset-0" variants={logoVariants} initial='initial' animate='animate' exit='exit' transition={{ duration: 0.1 }}>
                            <Image alt="EazyDev Dealership Mobile logo" src="/logo-mob2.png"
                                fill={true}
                                className="object-contain object-left "
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            </Link>
            <nav className="flex flex-col gap-2">
                    {navigation.map((item) => {
                        return(
                            <Link href={item.href} key={item.name} className="flex items-center gap-2 text-white hover:bg-primary-900/50 rounded-md p-2 transition-colors duration-200 ease-in-out">
                            {item.name}
                            </Link>
                        )
                    })}
            </nav>
        </div>
    </motion.div>
}