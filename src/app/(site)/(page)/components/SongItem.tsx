'use client';

import Image from 'next/image';

import type { Song } from '@/types';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import PlayButton from '@/components/PlayButton';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface SongItemProps {
    song: Song;
    onPlay: (activeSong: Song, activeUrl: string) => void;
}

const SongItem = ({ song, onPlay }: SongItemProps) => {
    const supabaseClient = useSupabaseClient();
    const songUrl = useLoadSongUrl(song.song_path);
    const posterUrl =
        song.youtube_poster ||
        supabaseClient.storage.from('posters').getPublicUrl(song.poster_path)
            .data.publicUrl;

    return (
        <div className="group relative flex flex-col justify-center rounded-md bg-neutral-400/5 hover:bg-neutral-400/10 cursor-pointer transtiion p-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
                <Image
                    priority
                    src={posterUrl!}
                    fill
                    className={
                        posterUrl?.includes('img.youtube.com')
                            ? 'object-cover'
                            : undefined
                    }
                    alt="Poster"
                    sizes="auto"
                />
            </div>
            <div className="pt-4 gap-y-5">
                <p className="font-semibold truncate">{song.title}</p>
                <p className="text-neutral-400 text-sm pt-1 pb-4">
                    By {song.author}
                </p>
            </div>
            <div className="absolute bottom-24 right-5">
                <PlayButton handleClick={() => onPlay(song, songUrl!)} />
            </div>
        </div>
    );
};

export default SongItem;
