<script lang="ts">
	import { onMount } from 'svelte';
  import { CurrentSong, SongControl, Volume } from './index';
	import { isPlaying, currentMusic, setIsPlaying } from '@/store/music-store';

	let audioRef: HTMLAudioElement;

	$effect(() => {
		$isPlaying.value ? audioRef.play() : audioRef.pause();
	});

	$effect(() => {
		const { src } = $currentMusic;

		if (!audioRef.src.includes(src) && src) {
			audioRef.src = src;
			setIsPlaying(true);
		}
	});

	onMount(() => audioRef.volume = 0.15);
</script>

<div id='player-container'>
	<div id="song">
		<CurrentSong />
	</div>
	<div id="player">
		<SongControl bind:audio={audioRef} />
	</div>
	<div id="volume">
		<Volume bind:audio={audioRef} />
	</div>
	<audio bind:this={audioRef}></audio>
</div>

<style lang="postcss">
	#player-container {
		width: calc(100% - 16px);
		@apply flex flex-row justify-between py-3 z-50;
	}

	#song {
		@apply grid items-center w-[200px];
	}

	#player {
		@apply grid place-content-center flex-1 gap-1;
	}

	#volume {
		@apply grid content-center justify-end w-[200px];
	}
</style>
