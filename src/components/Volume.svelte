<script lang="ts">
	import { VolumeSvelte } from '@/icons/index';
	import { highVolume, silence } from '@/libs/data-buttons';

  let { audio } = $props<{ audio: HTMLAudioElement }>();

	let inputRef: HTMLInputElement;
	let audioVolume = $state(0.15);
	let isAudible = $state(true);

	function handleChange(this: HTMLInputElement) {
		const audioValue = Number(this.value) / 100;
		audio.volume = audioValue;
		audioVolume = audioValue;
	}

	const changeVolume = () => {
		audio.volume = audio.volume ? 0 : audioVolume;
		inputRef.value = String(audio.volume * 100);
		isAudible = !isAudible;
	}
</script>

<div>
  <button on:click={changeVolume}>
    <VolumeSvelte svg={isAudible && audioVolume ? highVolume : silence} />
  </button>
  <input
    type="range"
    min="0"
    max="100"
    value={audioVolume * 100}
    bind:this={inputRef}
    on:input={handleChange}
  >
</div>

<style lang="postcss">
  div {
		@apply flex items-center w-full gap-1;
	}

	input {
		@apply w-[100px] h-1.5 bg-zinc-700;
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
