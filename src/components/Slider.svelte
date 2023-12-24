<script lang="ts">
	import { Slider as SliderPrimitive } from "bits-ui";
	import { cn } from "@/libs/utils";

	type $$Props = SliderPrimitive.Props;

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"] = [0];
	export { className as class };
</script>

<SliderPrimitive.Root
	bind:value
	class={cn(
		"group relative flex touch-none select-none items-center",
		className
	)}
	{...$$restProps}
>
	<span
		class="relative h-1.5 w-full grow overflow-hidden bg-zinc-700/20"
	>
		<SliderPrimitive.Range class="absolute h-full bg-white group-hover:bg-green-500" />
	</span>
	<SliderPrimitive.Thumb
		class="hidden h-4 w-4 rounded-full border-primary/50 bg-white shadow transition-colors group-hover:block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
	/>
</SliderPrimitive.Root>
