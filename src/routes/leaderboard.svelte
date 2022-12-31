<script lang="ts">
	import Title from "../components/widgets/Title.svelte";
	import PlayersList from "../components/PlayersList.svelte";
</script>
<svelte:head>
	<title>Leaderboard - Demon List VN</title>
	<meta name='description' content='Welcome to Demon List VN, this is where we keep track of the hardest demons created, verified and hardest demon beaten by Vietnamese!'>
</svelte:head>
<Title title={'Leaderboard'} description={''} />
<div class="pageContent">
	<PlayersList list={'rating'} />
</div>
<style lang="scss">
	.pageContent {
		display: grid;
		gap: 30px;
		grid-template-areas:
			"sel sel"
			"line line"
			"widget widget";
		grid-auto-columns: 1fr;
	}
	@media screen and (max-width: 1100px) {
		.pageContent {
			width: 90%;
			grid-template-areas:
				"sel"
				"line"
				"widget";
		}
	}
</style>
