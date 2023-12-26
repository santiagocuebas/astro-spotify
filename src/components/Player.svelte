<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
  import { CurrentSong, SongControl, Volume } from './index';
	import {
		isPlaying,
		currentMusic,
		setIsPlaying,
		setCurrentSong
	} from '@/store/music-store';

	let audioRef: HTMLAudioElement;
	let currentTime = 0;
	let audioDuration = 0;

	const handleTimeUpdate = () => currentTime = audioRef.currentTime;

	const handleAudioDuration = () => audioDuration = audioRef?.duration;

	const handleEndingAudio = () => {
		const { song, songs } = $currentMusic;

		const songIndex = songs.findIndex(seeSong => seeSong.id === song?.id);
		const newSong = songs[songIndex+1] ?? songs[0];

		setCurrentSong(newSong);
	};

	afterUpdate(() => {
		$isPlaying.value ? audioRef.play() : audioRef.pause();
	});

	afterUpdate(() => {
		const { src } = $currentMusic;

		if (!audioRef.src.includes(src) && src) {
			audioRef.src = src;
			setIsPlaying(true);
		}
	});

	onMount(() => {
		audioRef.volume = 0.15;
		audioRef.addEventListener('timeupdate', handleTimeUpdate);
		audioRef.addEventListener('durationchange', handleAudioDuration);
		audioRef.addEventListener('ended', handleEndingAudio);

		return () => {
			audioRef.removeEventListener('timeupdate', handleTimeUpdate);
			audioRef.removeEventListener('durationchange', handleAudioDuration);
			audioRef.removeEventListener('ended', handleEndingAudio);
		};
	});
</script>

<div id='player-container'>
	<div id="song">
		<CurrentSong />
	</div>
	<div id="player">
		<SongControl
			bind:audio={audioRef}
			bind:currentTime={currentTime}
			bind:audioDuration={audioDuration}
		/>
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
