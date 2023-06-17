<script>
	import { onMount } from "svelte";
	import { userdata } from "./stores";
	import MySubmissionsModal from "../components/modals/MySubmissionsModal.svelte";
	import Badge from "../components/badge.svelte";
	var player;
	$: player = $userdata.data;
	var d = new Date();
	$: time = d.toLocaleTimeString();
	var showMySubmissonsModal = false;
	var greetings = ["Hi", "Hello", "Welcome", "Hola", "Bonjour", "Xin chào"];
	var greeting = "";
	var isShowDiscord = false;
	var discordCssID = "";
	$: discordCssID = player.uid ? "disSmall" : "disLarge";
	onMount(() => {
		greeting = greetings[Math.floor(Math.random() * greetings.length)];
		if (localStorage.getItem("showDiscordWidget") == null) {
			localStorage.setItem("showDiscordWidget", "true");
		}
		isShowDiscord = JSON.parse(localStorage.getItem("showDiscordWidget"));
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
		<div class="warn1">
			<p>Check out the new <a href='https://challengelistvn.pages.dev/'>Challenge List VN</a>! Made by the creator of Demon List VN.</p>
		</div>
		{#if player.uid}
			{#if player.isHidden}
				<div class="warn">
					{#if player.uid == $userdata.metadata.id}
						<p>
							You are unranked because your profile are hidden. To make your profile visible, go to
							Edit profile > Make my profile visible.
						</p>
					{:else}
						<p>This profile is unranked because it's hidden.</p>
					{/if}
				</div>
			{/if}
			<div class="topWrapper">
				<div class="topWidget">
					<div class="topWidget1">
						<div class="avatar">
							<img
								src={`https://qdwpenfblwdmhywwszzj.supabase.co/storage/v1/object/public/avatars/${player.uid}.jpg`}
								alt=""
							/>
						</div>
						<div class="playerNameWrapper">
							<Badge player={player} size={15}>
								<span class="playerName">{player.name}</span>
							</Badge>
							<span>Rating: {player.rating} (#{player.overallRank})</span><br />
							<span>Demon List: {player.totalDLpt} (#{player.dlrank})</span><br />
							<span>Featured List: {player.totalFLpt} (#{player.flrank})</span><br />
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
				</div>
			</div>
		{/if}
		{#if isShowDiscord}
			<div class="widgetBot" id={discordCssID}>
				<widgetbot id="test" server="877546680801697813" channel="877546680801697816" />
			</div>
			<script src="https://cdn.jsdelivr.net/npm/@widgetbot/html-embed"></script>
		{/if}
	</div>
	<div class="sec2" />
</div>
{#if player.uid}
	<MySubmissionsModal bind:ifShow={showMySubmissonsModal} bind:uid={player.uid} />
{/if}

<style lang="scss">
	.playerNameWrapper {
		margin-left: 15px;
		.playerName {
			font-weight: bold;
			display: flex;
			font-size: 20px;
			color: var(--textColor);
		}
		span {
			color: var(--color7);
		}
	}
	.avatar {
		background-color: black;
		width: 120px;
		height: 120px;
		min-width: 120px;
		min-height: 120px;
		border-radius: 50%;
		border-color: var(--textColor);
		border-style: solid;
		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
			border-radius: 50%;
		}
	}
	.widgetBot {
		border-radius: 50px;
		width: 100%;
		height: 45%;
		border-color: transparent;
		background-color: var(--color23);
		overflow: hidden;
	}
	#test {
		width: 100%;
		height: 100%;
	}
	.pageContent {
		display: grid;
		width: 80%;
		height: 80vh;
		margin-inline: auto;
		grid-template-areas: "sec1 sec2";
		grid-template-columns: 50% 50%;
		gap: 50px;
		margin-bottom: 0;
	}
	.warn {
		width: 100%;
		background-color: rgb(119, 111, 0);
		height: fit-content;
		box-sizing: border-box;
		padding-inline: 18px;
		padding-top: 1px;
		padding-bottom: 1px;
		border-radius: 20px;
		margin-inline: auto;
		margin-bottom: 25px;
		color: yellow;
	}
	.warn1 {
		width: 100%;
		background-color: rgb(0, 119, 113);
		height: fit-content;
		box-sizing: border-box;
		padding-inline: 18px;
		padding-top: 1px;
		padding-bottom: 1px;
		border-radius: 20px;
		margin-inline: auto;
		margin-bottom: 25px;
		color: cyan;
	}
	#disLarge {
		height: 400px;
	}
	#disSmall {
		height: 250px;
	}
	.sec1 {
		grid-area: sec1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
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
		width: 100%;
		margin-bottom: -30px;
	}
	.fltop {
		grid-area: fltop;
	}
	.dltop {
		grid-area: dltop;
	}
	.topWidget {
		height: fit-content;
		border-radius: 50px;
		background-color: var(--color23);
		display: flex;
		align-items: center;
		padding: 20px;
		margin-bottom: 60px;
	}
	.topWidget1 {
		display: flex;
		align-items: center;
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
		background-color: var(--color19);
		height: 70px;
		width: fit-content;
		border-radius: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--textColor);
		text-decoration: none;
		padding-inline: 20px;
		margin-left: auto;
		svg {
			fill: var(--textColor);
			margin-right: 10px;
		}
	}
	@media screen and (max-width: 1350px) {
		.topWidget {
			flex-direction: column;
			align-items: flex-start;
			.editProfile {
				margin-top: 20px;
				width: 100%;
				margin-inline: auto;
				padding: 0;
			}
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
			height: 70vh;
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
