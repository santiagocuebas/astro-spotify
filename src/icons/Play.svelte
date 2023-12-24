<script lang="ts">
	export let svgPath: string;
	export let size: number = 16;
</script>

<svg role="img" width={size} height={size} aria-hidden="true" viewBox="0 0 16 16">
	<path fill="currentColor" d={svgPath}></path>
</svg>
