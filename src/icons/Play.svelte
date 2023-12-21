<script lang="ts">
	const { svgPath, size = 16 } = $props<{ svgPath: string, size?: number }>();
</script>

<svg role="img" width={size} height={size} aria-hidden="true" viewBox="0 0 16 16">
	<path fill="currentColor" d={svgPath}></path>
</svg>
