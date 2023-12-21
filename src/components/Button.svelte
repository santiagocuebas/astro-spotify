<script lang="ts">
	import type { ISong, ResponseData } from '@/types/types';
	import { PlaySvelte } from '@/icons';
	import { svgPath } from '@/libs/data-buttons';
	import {
		isPlaying,
		currentMusic,
		setIsPlaying,
		setCurrentMusic
	} from '@/store/music-store';

	interface PropsButton {
		id: string,
		size?: number,
		songs: ISong[]
	};

	let { id, size = 16, songs = [] } = $props<PropsButton>();

	let isPlayingCurrentPlaylist = $derived($isPlaying.value &&
		$currentMusic.id === id);

	const handleClick = async () => {
		if ($currentMusic.id === id && $currentMusic.src) {
			setIsPlaying(!$isPlaying.value);
		}

		if ($currentMusic.id !== id) {
			const data: ResponseData | undefined = await fetch('api/get-info-playlist.json?id=' + id)
				.then(res => res.json())
				.catch(() => {
					console.error('An error occurred while trying to load the .mp3 file.');
					return;
				});

			console.log(data)

			if (data !== undefined) {
				if (data.songs.length) {
					setCurrentMusic(data.id, data.songs, data.songs[0]);
				}
			}
		}
	};

	const handleSongs = () => {
		if ($currentMusic.id === id && $currentMusic.src) {
			setIsPlaying(!$isPlaying.value);
		}

		if ($currentMusic.id !== id && songs.length) {
			setCurrentMusic(id, songs, songs[0]);
		}
	};
</script>

<button
	class:large={songs.length}
	on:click={songs instanceof Array ? handleSongs : handleClick}
>
	<PlaySvelte
		size={size}
		svgPath={isPlayingCurrentPlaylist ? svgPath.pause : svgPath.play}
	/>
</button>

<style lang="postcss">
	button {
		transition-property: background;
		@apply p-4 bg-green-700 rounded-full hover:bg-[#15903c] hover:scale-105;
	}

	.large {
		@apply p-5;
	}
</style>
