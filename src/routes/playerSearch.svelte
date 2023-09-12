<script>
	import Badge from "../components/badge.svelte";
	import LoadingAnimation from "../components/animations/LoadingAnimation.svelte";
	import { onMount } from "svelte";

	var provinces;
	var sortedProvinces = [];
	var province = "";
	var city = "";
	var players = [];
	var state = 0;

	function search() {
		state = 1;
		var url = `${import.meta.env.VITE_BACKEND_API_URL_V2}/playerSearch/${province}`;

		if (city) {
			url += "/" + city;
		}

		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				players = res;
				state = 2;
			});
	}

	onMount(() => {
		fetch(`${import.meta.env.VITE_BACKEND_API_URL}/provinces`)
			.then((res) => res.json())
			.then((res) => {
				provinces = res;
				sortedProvinces = Object.values(res);
				sortedProvinces.sort((a, b) => (a.name < b.name ? -1 : 1));
			});
	});
</script>

<div class="pageContent">
	<h1>Player search</h1>
	<div class="searchWrapper">
		<div class="search">
			<select class="sel" bind:value={province}>
				<option value={""} selected>Provinces</option>
				{#each sortedProvinces as item, index}
					<option value={item.name}>{item.name}</option>
				{/each}
			</select>
			<select class="sel" bind:value={city}>
				<option value={""} selected>City</option>
				{#if province}
					{#each provinces[province].cities as item, index}
						<option value={item}>{item}</option>
					{/each}
				{/if}
			</select>
		</div>
		<button class="s_blue s_button2" on:click={search}>Search</button>
	</div>
	{#if state == 1}
		<LoadingAnimation />
	{/if}
	{#if state == 2}
		<h4>Total player: {players.length}</h4>
		{#each players as item, index}
			<div class="player" style={index % 2 == 1 ? "" : "background-color: var(--color23);"}>
				<span>#{index + 1} ({item.overallRank})</span>
				<div class="avatar">
					<img
						src={`https://qdwpenfblwdmhywwszzj.supabase.co/storage/v1/object/public/avatars/${item.uid}.jpg`}
						alt="avatar"
					/>
				</div>
				<a href={`/player?id=${item.uid}`}>
					{item.name} ({item.rating})
				</a>
				<Badge player={item} />
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.searchWrapper {
		background-color: var(--color23);
		height: fit-content;
		border-radius: 50px;
		padding: 30px;
		box-sizing: border-box;
	}

	.player {
		height: 50px;
		border-radius: 20px;
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		padding-inline: 30px;

		a {
			color: var(--textColor);
			margin-right: 5px;
		}

		.avatar {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background-color: gray;
			margin-inline: 10px;

			img {
				height: 100%;
				width: 100%;
				border-radius: 50%;
				object-fit: cover;
			}
		}
	}

	.search {
		display: flex;
		gap: 30px;
		margin-bottom: 20px;
		select {
			width: 50%;
			height: 40px;
			border-radius: 15px;
			border: none;
			background-color: var(--color19);
			color: var(--textColor);
			padding-inline: 10px;
		}
	}

	button {
		cursor: pointer;
	}

	.s_blue {
		background-color: var(--color5);
		transition: 0.3s;
	}
	.s_blue:active:hover {
		background-color: var(--color4);
		transition: 0.15s;
	}

	.s_button2 {
		height: 36px;
		width: 96px;
		border-radius: 24px;
		color: var(--textColor);
		font-weight: 350;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 400;
		border: none;
		margin-left: auto;
	}
</style>
