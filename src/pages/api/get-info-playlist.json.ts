import type { APIRoute } from 'astro';
import { allPlaylists, songs as allSongs } from '@/libs/data';

export const GET: APIRoute = ({ request }) => {
	const { url } = request;
	const urlObject = new URL(url);
	const id = urlObject.searchParams.get('id');

	const playlist = allPlaylists.find(playlist => playlist.id === id);
	const songs = allSongs.filter(song => song.albumId === playlist?.albumId);

	return new Response(
		JSON.stringify({ id, songs })
	);
}
