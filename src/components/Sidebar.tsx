'use client';

import { usePathname } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';

import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';
import { Song } from '@/types';

interface SidebarPros {
    songs: Song[];
    children: React.ReactNode;
}

const Sidebar = ({ songs, children }: SidebarPros) => {
    const pathname = usePathname();

    const routes = [
        {
            label: 'Home',
            icon: HiHome,
            active: pathname === '/',
            href: '/',
        },
        {
            label: 'Search',
            icon: BiSearch,
            active: pathname === '/search',
            href: '/search',
        },
    ];

    return (
        <div className="flex h-full">
            <div className="hidden md:flex flex-col p-2 gap-y-2 w-[300px] ">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((item) => (
                            <SidebarItem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>
                <Box className="h-full">
                    <Library songs={songs} />
                </Box>
            </div>
            <main className="w-full md:py-2 md:pr-2">{children}</main>
        </div>
    );
};

export default Sidebar;
