import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import './globals.tailwind.css';
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/provider/SupabaseProvider';
import ModalProvider from '@/provider/ModalProvider';
import ToasterProvider from '@/provider/ToasterProvider';
import Player from '@/components/Player';
import getLikedSongs from '@/actions/getLikedSongs';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Spotify Clone',
    description: 'Listen to music!',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const likedSongs = await getLikedSongs();
    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <ModalProvider />
                    <Sidebar likedSongs={likedSongs}>{children}</Sidebar>
                    <Player />
                </SupabaseProvider>
            </body>
        </html>
    );
}
