<script lang="ts">
	import Title from "../components/Title.svelte";
	import Levels from "../components/Levels.svelte";
	import PlayersList from "../components/PlayersList.svelte";
	import AddLevelModal from "../components/AddLevelModal.svelte";
	import { userdata } from "../routes/stores";
	var list = 1
	var listOption = 0;
	var dlLevels = [];
	var dlLegacy = [];
	var showAddLevelModal = false;
	fetch("https://seademonlist-api.vercel.app/levels/dl/page/1")
		.then((response) => response.json())
		.then((data) => {
			dlLevels = data;
			dlLegacy = dlLevels.slice(150, dlLevels.length);
			dlLevels = dlLevels.slice(0, 150);
		});;

</script>
<svelte:head>
	<title>Demon List VN</title>
	<meta name='description' content='Welcome to Demon List VN, this is where we keep track of the hardest demons created, verified and hardest demon beaten by Vietnamese!'>
</svelte:head>
<div class="pageContent">
	<Title title="Demon List" description="Hardest levels beaten by Vietnamese" />
	<div class="listSelector">
		{#if $userdata.data.isAdmin}
			<a href='#!' id='noDec' on:click={() => showAddLevelModal = !showAddLevelModal}>
				<div class="AddLvBtn">
					<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M18.625 31.667V21.375H8.333v-2.75h10.292V8.333h2.75v10.292h10.292v2.75H21.375v10.292Z"/></svg>
					<span>Add Level</span>
				</div>
			</a>
		{/if}
	</div>
	{#if listOption == 0}
		{#each dlLevels as item, index}
			<Levels
				top={item.dlTop}
				name={item.name}
				creator={item.creator}
				point={item.dlPt}
				videoID={item.videoID}
				levelID={item.id}
			/>
		{/each}
		<p id="legacyLabel"><span>Legacy List</span></p>
		{#each dlLegacy as item, index}
			<Levels
				top={item.dlTop}
				name={item.name}
				creator={item.creator}
				point={item.dlPt}
				videoID={item.videoID}
				levelID={item.id}
			/>
		{/each}
	{/if}
	<PlayersList bind:list bind:listOption />
	<div class="listSwitcherWrapper">
		<div class="listSwitcher">
			<a
				class="listSwitcherItem"
				id={listOption == 0 ? "highlight" : ""}
				on:click={() => {
					listOption = 0;
				}}
				href="#!"
			>
				<a href="#!">Level listing</a>
			</a>
			<a
				class="listSwitcherItem"
				id={listOption == 1 ? "highlight" : ""}
				on:click={() => {
					listOption = 1;
				}}
				href="#!"
			>
				<a href="#!">Top players</a>
			</a>
		</div>
	</div>
</div>
{#if $userdata.data.isAdmin}
	<AddLevelModal bind:ifShow={showAddLevelModal} />
{/if}
<style lang="scss">
	#noDec{
		text-decoration: none;
	}
	.AddLvBtn{
		background-color: #353535;
		width: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		margin-top: 10px;
		margin-bottom: 35px;
		color: white;
		svg{
			filter: invert(1);
		}
	}
	#legacyLabel {
		grid-column: 1 / 3;
		margin-inline: auto;
		font-weight: 500;
		text-align: center;
		border-bottom: 1px solid #888888;
		line-height: 0.1em;
		margin: 10px 0 20px;
		span {
			background: #141414;
			padding: 0 10px;
			color: #888888;
		}
	}
	.pageContent {
		display: grid;
		width: 60%;
		margin-inline: auto;
		margin-bottom: 100px;
		gap: 30px;
		grid-template-areas:
			"header header"
			"sel sel"
			"line line"
			"widget widget";
		grid-auto-columns: 1fr;
	}
	.listSwitcherWrapper {
		width: 100%;
		left: 0;
		right: 0;
		z-index: 1;
		position: fixed;
		bottom: 0;
		margin-bottom: 15px;
		pointer-events: none;
		.listSwitcher {
			pointer-events: auto;
			height: 50px;
			width: fit-content;
			margin-inline: auto;
			background-color: #202020;
			box-shadow: 0 0 30px rgb(7, 7, 7);
			border-radius: 50px;
			a {
				color: white;
				text-decoration: none;
			}
			display: flex;
			align-items: center;
			justify-content: center;
			.listSwitcherItem {
				margin-inline: 8px;
				padding-left: 15px;
				padding-right: 15px;
				height: calc(100% - 15px);
				border-radius: 50px;
				display: flex;
				align-items: center;
				transition: background-color 0.3s;
			}
			.listSwitcherItem:hover {
				transition: background-color 0.3s;
				background-color: #3b3b3b;
			}
		}
	}
	.listSelector {
		grid-area: sel;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: -50px;
		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
			overflow: hidden;
		}
		li {
			float: left;
			list-style-type: none;
			margin-left: 5px;
			margin-right: 5px;
			a {
				display: block;
				padding-left: 30px;
				padding-right: 30px;
				padding-top: 10px;
				padding-bottom: 10px;
				border-radius: 50px;
				text-decoration: none;
				color: white;
				transition: 0.3s;
			}
			a:hover {
				background-color: #353535;
				transition: 0.3s;
			}
		}
	}
	hr {
		grid-area: line;
		width: 100%;
		height: 0;
		margin: 0;
		border-color: rgb(71, 71, 71);
		margin-top: 20px;
	}
	#highlight {
		background-color: #3b3b3b;
	}
	#highlight1 {
		background-color: #353535;
	}
	@media screen and (max-width: 1450px) {
		.pageContent {
			width: 80%;
		}
	}
	@media screen and (max-width: 1100px) {
		#legacyLabel {
			grid-column: 1;
		}
		.pageContent {
			width: 90%;
			grid-template-areas:
				"header"
				"sel"
				"line"
				"widget";
		}
		.listSelector {
			a {
				margin-inline: 10px;
				padding-inline: 10px;
			}
			margin-bottom: -40px;
		}
	}
</style>
