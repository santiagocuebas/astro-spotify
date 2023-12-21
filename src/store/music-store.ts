import type { IPlaylist, IMusic, ISong } from '@/types/types';
import { atom } from 'nanostores';

export const isPlaying = atom<{ value: boolean }>({ value: false });

export const playlists = atom<{ value: IPlaylist[] }>({ value: [] });

export const currentMusic = atom<IMusic>({
	id: '',
	src: '',
	song: null,
	songs: []
});

export function setIsPlaying(value: boolean) {
	isPlaying.set({ value });
}

export function setPlaylists(value: IPlaylist[]) {
	playlists.set({ value });
}

export function setCurrentMusic(id: string, songs: ISong[], song: ISong) {
	currentMusic.set({
		id,
		song: song,
		src: song ? `/music/${song.albumId}/0${song.id}.mp3` : '',
		songs
	});
}

export function setCurrentSong(song: ISong | null) {	
	currentMusic.set({
		...currentMusic.get(),
		src: song !== null ? `/music/${song.albumId}/0${song.id}.mp3` : '',
		song
	});
}
