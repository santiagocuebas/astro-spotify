<script lang="ts">
	const currentTime = new Date();
	const currentHour = currentTime.getHours();
	let gretting = getGreeting(currentHour);

	function getGreeting(hour: number) {
		if (hour >= 6 && hour < 14) return 'Good Morning';
		if (hour >= 14 && hour < 22) return 'Good Afternoon';
		return 'Good Night';
	};

	setInterval(() => {
		const currentTime = new Date();
		const currentHour = currentTime.getHours();
		gretting = getGreeting(currentHour);
	}, 5 * 60 * 1000);
</script>

<h2>{gretting}</h2>

<style lang="postcss">
	h2 {
		@apply w-full mb-7 text-5xl font-bold leading-tight;
	}
</style>
