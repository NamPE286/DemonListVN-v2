<script>
	import { onMount } from "svelte";
	import { userdata } from "./stores";
	import MySubmissionsModal from "../components/modals/MySubmissionsModal.svelte";
	var player;
	$: player = $userdata.data;
	var d = new Date();
	$: time = d.toLocaleTimeString();
	var showMySubmissonsModal = false;
	var greetings = ["Hi", "Hello", "Welcome", "Hola", "Bonjour", "Xin chào"];
	var greeting = "";
	onMount(() => {
		greeting = greetings[Math.floor(Math.random() * greetings.length)];
		const interval = setInterval(() => {
			d = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>Demon List VN</title>
	<meta
		name="description"
		content="Welcome to Demon List VN, this is where we keep track of the hardest demons created, verified and hardest demon beaten by Vietnamese!"
	/>
</svelte:head>
<div class="pageContent">
	<div class="sec1">
		<div class="titleWrapper">
			<p class="greeting">{greeting}!</p>
			<p class="time">{time}</p>
		</div>
		{#if player.uid}
			<div class="topWrapper">
				<div class="fltop topWidget">
					<p class="topTitle">Featured List Rank</p>
					<p class="top">#{player.flrank ? player.flrank : "N/a"}</p>
				</div>
				<div class="dltop topWidget">
					<p class="topTitle">Demon List Rank</p>
					<p class="top">#{player.dlrank ? player.dlrank : "N/a"}</p>
				</div>
			</div>
			<span
				class="editProfile clickable"
				on:click={() => {
					showMySubmissonsModal = !showMySubmissonsModal;
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
					><path
						d="M4 21q-.825 0-1.412-.587Q2 19.825 2 19V5q0-.825.588-1.413Q3.175 3 4 3h16q.825 0 1.413.587Q22 4.175 22 5v14q0 .825-.587 1.413Q20.825 21 20 21Zm0-2h16V5H4v14Zm1-2h5v-2H5Zm9.55-2 4.95-4.95-1.425-1.425-3.525 3.55-1.425-1.425-1.4 1.425ZM5 13h5v-2H5Zm0-4h5V7H5ZM4 19V5v14Z"
					/></svg
				>
				<span>My submissions</span>
			</span>
			<iframe
				src="https://e.widgetbot.io/channels/877546680801697813/877546680801697816"
				title="Discord"
			/>
		{:else}
			<iframe
				src="https://e.widgetbot.io/channels/877546680801697813/877546680801697816"
				title="Discord"
				id="disLarge"
			/>
		{/if}
	</div>
	<div class="sec2" />
</div>
{#if player.uid}
	<MySubmissionsModal bind:ifShow={showMySubmissonsModal} bind:uid={player.uid} />
{/if}

<style lang="scss">
	.pageContent {
		display: grid;
		width: 80%;
		margin-inline: auto;
		margin-bottom: 100px;
		box-sizing: border-box;
		padding-top: 100px;
		grid-template-areas: "sec1 sec2";
		grid-template-columns: 50% 50%;
		gap: 50px;
	}
	iframe {
		border-radius: 50px;
		width: 100%;
		height: 45%;
		border-color: transparent;
		background-color: var(--color23);
	}
	#disLarge {
		height: 400px;
	}
	.sec1 {
		grid-area: sec1;
	}
	.sec2 {
		grid-area: sec2;
	}
	.greeting {
		font-size: 60px;
		font-weight: 500;
		text-shadow: black;
	}
	.time {
		margin-top: -50px;
		font-size: 20px;
	}
	.topWrapper {
		display: grid;
		grid-template-areas: "dltop fltop";
		width: 100%;
		gap: 20px;
		margin-bottom: -30px;
	}
	.fltop {
		grid-area: fltop;
	}
	.dltop {
		grid-area: dltop;
	}
	.topWidget{
		height: 160px;
		border-radius: 50px;
		background-color: var(--color23);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-inline: 35px;
		margin-bottom: 20px;
	}
	.topTitle {
		font-size: 24px;
		margin-top: 0;
		margin-bottom: 0;
	}
	.top {
		font-size: 65px;
		margin-top: 0;
		margin-bottom: 0;
		color: var(--color13);
		font-weight: 300;
	}
	.editProfile {
		background-color: var(--color23);
		height: 70px;
		width: 100%;
		border-radius: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30px;
		color: var(--color6);
		text-decoration: none;
		margin-bottom: 20px;
		svg {
			fill: var(--color6);
			margin-right: 10px;
		}
	}
	@media screen and (max-width: 1100px) {
		.pageContent {
			display: grid;
			width: 90%;
			margin-inline: auto;
			margin-bottom: 100px;
			box-sizing: border-box;
			padding-top: 100px;
			grid-template-areas: "sec1 sec2";
			grid-template-columns: 100% 0%;
			gap: 50px;
		}
		iframe {
			height: 400px;
		}
		.titleWrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
	@media screen and (max-width: 800px) {
		.topWrapper {
			grid-template-areas:
				"dltop"
				"fltop";
			gap: 0px;
		}
	}
</style>
