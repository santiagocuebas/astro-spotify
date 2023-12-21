<script lang="ts">
	import { onMount } from 'svelte';
	import { PlaySvelte } from '@/icons/index';
	import { svgPath } from '@/libs/data-buttons';
	import {
		isPlaying,
		currentMusic,
		setIsPlaying,
    setCurrentSong
	} from '@/store/music-store';

	let { audio } = $props<{ audio: HTMLAudioElement }>();

	let currentTime = $state(0);
	let audioDuration = $state(0);

	function changeAudioTime(this: HTMLInputElement) {
		audio.currentTime = Math.trunc(Number(this.value));
	}

	const handleClick = () => {
		if ($currentMusic.src) setIsPlaying(!$isPlaying.value);
	};

	const handleTimeUpdate = () => currentTime = audio.currentTime;

	const handleAudioDuration = () => audioDuration = audio?.duration;

	const handleEndingAudio = () => {
		const { song, songs } = $currentMusic;

		const songIndex = songs.findIndex(seeSong => seeSong.id === song?.id);
		const newSong = songs[songIndex+1] ?? songs[0];

		setCurrentSong(newSong);
	};

	const formatTime = (currentTime: number) => {
		const minutes = String(Math.trunc(currentTime / 60)).padStart(2, '0');
		const seconds = String(Math.trunc(currentTime % 60)).padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	onMount(() => {
		audio.addEventListener('timeupdate', handleTimeUpdate);
		audio.addEventListener('durationchange', handleAudioDuration);
		audio.addEventListener('ended', handleEndingAudio);

		return () => {
			audio.removeEventListener('timeupdate', handleTimeUpdate);
			audio.removeEventListener('durationchange', handleAudioDuration);
			audio.removeEventListener('ended', handleEndingAudio);
		};
	});
</script>

<div>
	<button on:click={handleClick}>
		<PlaySvelte svgPath={$isPlaying.value ? svgPath.pause : svgPath.play} />
	</button>
</div>
<div>
	<span>
		{formatTime(currentTime)}
	</span>
	<input
		type="range"
		min="0"
		max={audioDuration}
		step="1"
		value={currentTime}
		on:input={changeAudioTime}
	>
	<span>
		{formatTime(audioDuration)}
	</span>
</div>

<style lang="postcss">
	div {
		@apply flex items-center justify-center gap-x-3;
	}
	
	button {
		@apply flex-none p-4 bg-white rounded-full text-black;
	}

	span {
		@apply w-12 text-center;
	}

	input {
		@apply w-[400px] h-1.5 bg-zinc-600;
	}

	input::-moz-range-thumb {
		border: 0;
		@apply invisible w-4 h-4 rounded-full bg-white cursor-pointer;
	}

	input::-moz-range-progress {
		@apply h-full bg-white;
	}

	div:hover > input::-moz-range-thumb {
		@apply visible;
	}

	div:hover > input::-moz-range-progress {
		@apply bg-green-500;
	}
</style>
