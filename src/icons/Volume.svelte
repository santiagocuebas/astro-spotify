<script lang="ts">  
	const { svg } = $props<{ svg: { [index: string]: string } }>();
</script>

<svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label={svg.label} viewBox="0 0 16 16">
  <path d={svg.pathOne}></path>
  <path d={svg.pathTwo}></path>
</svg>
