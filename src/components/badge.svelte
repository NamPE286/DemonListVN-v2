<script lang="ts">
  import { onMount } from "svelte";

	export var player: any;
	export var size = 0;
	var expanded = false;
	function setTextSize() {
		if (size == 0) return "";
		return `font-size: ${size}px`;
	}
	function getTitle() {
		if (player.rating >= 4200)
			return {
				title: "LGM",
				fullTitle: "Legendary Grandmaster",
				color: "darkred"
			};
		if (player.rating >= 3900)
			return {
				title: "SGM",
				fullTitle: "Super Grandmaster",
				color: "red"
			};
		if (player.rating >= 3600)
			return {
				title: "GM",
				fullTitle: "Grandmaster",
				color: "red"
			};
		if (player.rating >= 3000)
			return {
				title: "M",
				fullTitle: "Master",
				color: "blue"
			};
		if (player.rating >= 2800)
			return {
				title: "CM",
				fullTitle: "Candidate Master",
				color: "darkorange"
			};
		if (player.rating >= 2500)
			return {
				title: "EX",
				fullTitle: "Expert",
				color: "purple"
			};
		if (player.rating >= 2350)
			return {
				title: "S+",
				fullTitle: "S+",
				color: "gold"
			};
		if (player.rating >= 2200)
			return {
				title: "S",
				fullTitle: "S",
				color: "gold"
			};
		if (player.rating >= 2000)
			return {
				title: "S-",
				fullTitle: "S-",
				color: "gold"
			};
		if (player.rating >= 1800)
			return {
				title: "A+",
				fullTitle: "A+",
				color: "green"
			};
		if (player.rating >= 1600)
			return {
				title: "A",
				fullTitle: "A",
				color: "green"
			};
		if (player.rating >= 1400)
			return {
				title: "A-",
				fullTitle: "A-",
				color: "green"
			};
		if (player.rating >= 1200)
			return {
				title: "B+",
				fullTitle: "B+",
				color: "#413cde"
			};
		if (player.rating >= 1000)
			return {
				title: "B",
				fullTitle: "B",
				color: "#413cde"
			};
		if (player.rating >= 800)
			return {
				title: "B-",
				fullTitle: "B-",
				color: "#413cde"
			};
		if (player.rating >= 600)
			return {
				title: "C+",
				fullTitle: "C+",
				color: "gray"
			};
		if (player.rating > 0)
			return {
				title: "C",
				fullTitle: "C",
				color: "gray"
			};
		return null;
	}
	function overral25() {
		try {
			if (!player.overallRank) return false;
			return player.overallRank <= 25;
		} catch {
			console.log("err");
			return false;
		}
	}
	function FL25() {
		try {
			if (!player.flrank) return false;
			return player.flrank <= 25;
		} catch {
			console.log("err");
			return false;
		}
	}
	const title = getTitle();
    onMount(() => {
        expanded = !JSON.parse(localStorage.getItem('badgeMinimized'))
    })
</script>

<div
	class="wrapper"
	on:click={() => {
		expanded = !expanded;
	}}
>
	{#if title}
		<div
			class="badge"
			title={title.fullTitle}
			style={`${setTextSize()}; background-color: ${title.color}`}
		>
			{title.title}
		</div>
	{/if}
	{#if expanded}
		{#if overral25()}
			<div
				class="badge"
				title={"Overall #25"}
				style={`
                ${setTextSize()};
                background-color: #4158D0;
                background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
            `}
			>
				#25
			</div>
		{/if}
		{#if FL25()}
			<div
				class="badge"
				title={"Feature List #25"}
				style={`
                ${setTextSize()};
                background-color: #0093E9;
                background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
            `}
			>
				FL25
			</div>
		{/if}
	{/if}
	<slot />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		align-items: center;
		color: white;
	}
	.badge {
		user-select: none;
		padding: 5px;
		border-radius: 6px;
		font-weight: 600;
		vertical-align: middle;
		margin-right: 5px;
		font-size: 10px;
	}
</style>
