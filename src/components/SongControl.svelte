<script lang="ts">
	import { svgPath } from '../libs/data-buttons';
	import { isPlaying, currentMusic, setIsPlaying } from '../store/music-store';
	import Slider from './Slider.svelte';
	import PlaySvelte from '../icons/Play.svelte';

	export let audio: HTMLAudioElement;
	export let currentTime: number;
	export let audioDuration: number;

	const handleClick = () => {
		if ($currentMusic.src) setIsPlaying(!$isPlaying.value);
	};

	const formatTime = (currentTime: number) => {
		const minutes = String(Math.trunc(currentTime / 60)).padStart(2, '0');
		const seconds = String(Math.trunc(currentTime % 60)).padStart(2, '0');
		return `${minutes}:${seconds}`;
	};
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
	<Slider
		value={[currentTime]}
		min={0}
		max={audioDuration ?? 0}
		step={1}
		class="w-[400px] bg-zinc-600"
		onValueChange={(value) => {
			const [newCurrentTime] = value;

			if (Math.round(audio.currentTime) !== newCurrentTime &&
				newCurrentTime !== Math.trunc(audio.duration)) {
				audio.currentTime = newCurrentTime;
			}
		}}
	/>
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
</style>
