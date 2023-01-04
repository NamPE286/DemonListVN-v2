<script lang="ts">
	import Title from "../widgets/Title.svelte";
	import Levels from "../widgets/Levels.svelte";
	import PlayersList from "../PlayersList.svelte";
	import AddLevelModal from "../modals/AddLevelModal.svelte";
	import { userdata } from "../../routes/stores";
    import { fly } from "svelte/transition";
	export var list: string
    export var title: string
    export var desc: string
	var listOption = 0;
	var levels = [];
	var showAddLevelModal = false;
    var legacyIndex:number
    if(list == 'dl') legacyIndex = -1
    else legacyIndex = 49
	function fetchData(count = 0){
		if(count == 2){
			fetch(`https://api.vnpower.tech/levels/${list}/page/1`)
				.then((response) => response.json())
				.then((data) => {
					levels = data;
				});
		}
		try{
			fetch(`https://api.vnpower.tech/levels/${list}/page/1/${$userdata.metadata.id}`)
				.then((response) => response.json())
				.then((data) => {
					levels = data;
				});
		}
		catch{
			setTimeout(() => fetchData(count + 1), 50)
		}
	}
	fetchData()
	function getPoint(){
		if(list == 'dl') return 'rating'
		return 'flPt'
 	}
</script>
<svelte:head>
	<title>{title} - Demon List VN</title>
	<meta name='description' content='Welcome to Demon List VN, this is where we keep track of the hardest demons created, verified and hardest demon beaten by Vietnamese!'>
</svelte:head>
<Title title={title} description={desc} />
<div class="pageContent">
	{#if listOption == 0}
		<div class="listSelector">
			{#if $userdata.data.isAdmin}
				<span class="clickable" id='noDec' on:click={() => showAddLevelModal = !showAddLevelModal}>
					<div class="AddLvBtn">
						<span>Add Level</span>
					</div>
				</span>
			{/if}
			{#if list == 'fl'}
				<span class="clickable" id='noDec' on:click={() => document.getElementById("legacyLabel").scrollIntoView({behavior: 'smooth'})}>
					<div class="AddLvBtn">
						<span>Jump to legacy list</span>
					</div>
				</span>
			{/if}
		</div>
        {#if !levels.length}
            {#each Array(4) as item, index}
                <Levels
                    top={NaN}
                    name={'Loading...'}
                    creator={'Loading...'}
                    point={NaN}
                    videoID={null}
                    levelID={NaN}
                    progress={NaN}
                />
            {/each}
        {:else}
            {#each levels as item, index}
                <Levels
                    top={item[`${list}Top`]}
                    name={item.name}
                    creator={item.creator}
                    point={item[getPoint()]}
                    videoID={item.videoID}
                    levelID={item.id}
                    progress={item.progress}
                />
                {#if index == legacyIndex}
                    <p id="legacyLabel"><span>Legacy List</span></p>
                {/if}
            {/each}
        {/if}
	{:else}
		<PlayersList list={list} />
	{/if}
	<div class="listSwitcherWrapper" in:fly={{y: 200, duration: 500, delay: 800}}>
		<div class="listSwitcher">
			<span
				class="listSwitcherItem clickable"
				id={listOption == 0 ? "highlight" : ""}
				on:click={() => {
					listOption = 0;
				}}
			>
				<span>Level listing</span>
			</span>
			<span
				class="listSwitcherItem clickable"
				id={listOption == 1 ? "highlight" : ""}
				on:click={() => {
					listOption = 1;
				}}
			>
				<span>Top players</span>
			</span>
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
		background-color: var(--color17);
		width: 300px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		margin-top: 10px;
		margin-bottom: 35px;
		color: var(--color6);
		svg{
			fill: var(--color6);
		}
	}
	#legacyLabel {
		grid-column: 1 / 3;
		margin-inline: auto;
		font-weight: 500;
		text-align: center;
		border-bottom: 1px solid var(--color9);
		line-height: 0.1em;
		margin: 10px 0 20px;
		span {
			background: var(--color24);
			padding: 0 10px;
			color: var(--color9);
		}
	}
	.pageContent {
		display: grid;
		gap: 30px;
		grid-template-areas:
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
			background-color: var(--color23);
			box-shadow: 0 0 15px rgba(7, 7, 7, 0.507);
			border-radius: 50px;
			a {
				color: var(--color6);
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
				background-color: var(--color16);
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
				color: var(--color6);
				transition: 0.3s;
			}
			a:hover {
				background-color: var(--color17);
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
		background-color: var(--color16);
	}
	#highlight1 {
		background-color: var(--color17);
	}
	@media screen and (max-width: 1450px) {

	}
	@media screen and (max-width: 1100px) {
		#legacyLabel {
			grid-column: 1;
		}
		.pageContent {
			width: 90%;
			grid-template-areas:
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
