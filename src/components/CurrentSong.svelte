<script lang="ts">
	import { currentMusic } from '../store/music-store';
</script>

<div>
	<picture>
		<img
			src={$currentMusic.song?.image}
			alt={$currentMusic.song?.title}
		>
	</picture>
	<span>
		<h3>
			{$currentMusic.song?.title ?? ''}
		</h3>
		<p>{$currentMusic.song?.artists[0] ?? ''}</p>
	</span>
</div>

<style lang="postcss">
	div {
		@apply flex relative items-center overflow-hidden gap-4;
	}

	picture {
		@apply flex-none w-14 h-14 bg-zinc-800 shadow-lg rounded-md overflow-hidden;
	}

	img {
		@apply w-full h-full rounded-md;
	}

	span {
		@apply flex flex-col overflow-hidden;
	}

	h3 {
		@apply block w-full text-sm font-bold truncate;
	}

	p {
    color: #b9b9b9;
		@apply w-full overflow-hidden text-ellipsis text-xs;
	}
</style>
