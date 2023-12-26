<script lang="ts">
	import type { ISong } from "../types/types";
	import { PlaySvelte, TimeIcon } from '../icons/index';
	import { svgPath } from '../libs/data-buttons';
  import {
		currentMusic,
		isPlaying,
		setCurrentMusic,
		setCurrentSong,
    setIsPlaying
	} from "../store/music-store";

	export let id: string | undefined;
	export let songs: ISong[];

	const handleSong = (song: ISong) => {
		if ($currentMusic.id !== id) setCurrentMusic(id ?? '', songs, song);
		else if ($currentMusic.song?.id !== song.id) setCurrentSong(song);
		else setIsPlaying(!$isPlaying.value);
	};
</script>

<div id="songs-container">
	<div id="title-container">
		<div>
			<span class="index">#</span>
		</div>
		<div>
			<span>Title</span>
		</div>
		<div>
			<span>Album</span>
		</div>
		<div class="time">
			<span><TimeIcon /></span>
		</div>
	</div>
	{#each songs as song}
		<div class="song-container">
			<div>
				<span
					class="index"
					class:not-visible={$currentMusic.id === id &&
						$currentMusic.song?.id === song.id}
				>{song.id}</span>
				<span
					class="icon"
					class:is-visible={$currentMusic.id === id &&
						$currentMusic.song?.id === song.id}
					role="none"
					on:click={() => handleSong(song)}
				>
					<PlaySvelte
						size={12}
						svgPath={
							$currentMusic.id === id && $currentMusic.song?.id === song.id && $isPlaying.value
								? svgPath.pause
								: svgPath.play
						}
					/>
				</span>
			</div>
			<div>
				<picture>
					<img src={song.image} alt={song.title} />
				</picture>
				<h4>{song.title}</h4>
				<p class="resalt">{song.artists.join(", ")}</p>
			</div>
			<div>
				<span class="resalt">{song.album}</span>
			</div>
			<div class="time">
				<span>{song.duration}</span>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	#songs-container {
		@apply flex justify-start flex-col h-full px-6;
	}

	#title-container, .song-container {
		grid-template-columns: 20px 1fr 1fr 50px;
		border-bottom: 1px solid #b9b9b9;
		@apply grid items-center h-9 mb-2 px-4 gap-x-4;
	}

	.song-container {
		@apply h-14 mb-0 border-none rounded-md hover:bg-white/10;
	}

	.song-container div:nth-child(4n + 2) {
		grid-template-columns: min-content 1fr;
		grid-auto-rows: min-content;
		@apply grid content-center gap-x-4;
	}

	picture {
		grid-row: 1 / span 2;
		@apply flex-none w-10 h-10;
	}

	img {
		@apply w-full h-full object-cover rounded-md;
	}

	h4 {
		@apply text-base leading-snug font-medium truncate;
	}

	span, p {
		@apply w-full overflow-hidden text-ellipsis text-sm leading-[1.429] text-[#b9b9b9];
	}

	.index {
		@apply block w-full text-base leading-snug text-center;
	}

	.icon {
		@apply hidden justify-center w-full text-base leading-snug text-center text-white;
	}

	.not-visible {
		@apply hidden;
	}

	.is-visible {
		@apply flex;
	}

	.time {
		@apply ml-auto mr-2;
	}

	.song-container:hover .resalt {
		@apply text-white;
	}

	.song-container:hover .index {
		@apply hidden;
	}

	.song-container:hover .icon {
		@apply flex;
	}
</style>
