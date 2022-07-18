<script>
	import LevelCard from "./LevelCard.svelte";

	let levels = [
		{
			top: 1,
			title: "The Moon Below",
			creator: "Onvil",
			points: 1000
		},
		{
			top: 2,
			title: "Springtime",
			creator: "IDK",
			points: 1000
		},
		{
			top: 3,
			title: "Wintertime",
			creator: "IDK",
			points: 1000
		},
		{
			top: 4,
			title: "phantasmagoria",
			creator: "whit",
			points: 1000
		},
		{
			top: 5,
			title: "sound journey",
			creator: "TheFakeLogik",
			points: 1000
		}
	];
</script>

<div>
	{#each levels as level}
		<LevelCard {...level} />
	{/each}
</div>

<style>
	div {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-flow: row wrap;
		column-gap: 4%;
		row-gap: 20px;

		padding: 30px 0;
	}
</style>
