<script lang="ts">
	import { highVolume, silence } from '../libs/data-buttons';
	import Slider from "./Slider.svelte";
	import VolumeSvelte from '../icons/Volume.svelte';

	export let audio: HTMLAudioElement;

	let audioVolume = 0.15;

	$: volumeRef = audioVolume * 100;

	const changeVolume = () => {
		audio.volume = audio.volume ? 0 : audioVolume;
		volumeRef = audio.volume * 100;
	}
</script>

<div>
	<button on:click={changeVolume}>
		<VolumeSvelte svg={volumeRef ? highVolume : silence} />
	</button>
	<Slider
		value={[volumeRef]}
		min={0}
		max={100}
		step={1}
		class="w-[100px] bg-zinc-700"
		onValueChange={(value) => {
			const [newVolume] = value;

			const audioValue = newVolume / 100;
			audio.volume = audioValue;
			audioVolume = audioValue;
		}}
	/>
</div>

<style lang="postcss">
	div {
		@apply flex items-center w-[100px] gap-1;
	}
</style>
