<script lang="ts">
	import Title from "../widgets/Title.svelte";
	import Levels from "../widgets/Levels.svelte";
	import PlayersList from "../PlayersList.svelte";
	import AddLevelModal from "../modals/AddLevelModal.svelte";
	import { userdata } from "../../routes/stores";
	import { fly, slide } from "svelte/transition";
	export var list: string;
	export var title: string;
	export var desc: string;
	var listOption = 0;
	var levels = [];
	var levelsFetched = false;
	var showAddLevelModal = false;
	var showFilterBox = false;
	var legacyIndex: number;
	var isFilered = false;
	if (list == "dl") legacyIndex = -1;
	else legacyIndex = 74;
	var filter = {
		minTop: 0,
		maxTop: 1000,
		minPt: 0,
		maxPt: 10000,
		hideBeatenLevels: false
	};
	function resetFilter() {
		filter = {
			minTop: 0,
			maxTop: 1000,
			minPt: 0,
			maxPt: 10000,
			hideBeatenLevels: false
		};
	}
	function getFilter() {
		if (isFilered) return encodeURI(JSON.stringify(filter));
		return "";
	}
	function fetchData(count = 0) {
		if (count == 0) {
			levels = [];
			levelsFetched = false;
		}
		if (count == 2) {
			fetch(`${import.meta.env.VITE_BACKEND_API_URL}/levels/${list}/page/1/0/${getFilter()}`)
				.then((response) => response.json())
				.then((data) => {
					levels = data;
					levelsFetched = true;
				});
		}
		try {
			fetch(
				`${import.meta.env.VITE_BACKEND_API_URL}/levels/${list}/page/1/${
					$userdata.metadata.id
				}/${getFilter()}`
			)
				.then((response) => response.json())
				.then((data) => {
					levels = data;
					levelsFetched = true;
				});
		} catch {
			setTimeout(() => fetchData(count + 1), 50);
		}
	}
	fetchData();
	function getPoint() {
		if (list == "dl") return "rating";
		return "flPt";
	}
</script>

<svelte:head>
	<title>{title} - Demon List VN</title>
	<meta
		name="description"
		content="Welcome to Demon List VN, this is where we keep track of the hardest demons created, verified and hardest demon beaten by Vietnamese!"
	/>
</svelte:head>
<Title {title} description={desc} />
<div class="pageContent">
	{#if listOption == 0}
		<div class="listSelector">
			{#if $userdata.data.isAdmin}
				<span
					class="clickable"
					id="noDec"
					on:click={() => (showAddLevelModal = !showAddLevelModal)}
				>
					<div class="AddLvBtn">
						<span>Add Level</span>
					</div>
				</span>
			{/if}
			{#if list == "fl"}
				<span
					class="clickable"
					id="noDec"
					on:click={() =>
						document.getElementById("legacyLabel").scrollIntoView({ behavior: "smooth" })}
				>
					<div class="AddLvBtn">
						<span>Jump to legacy list</span>
					</div>
				</span>
			{/if}
		</div>
		{#if !levelsFetched}
			{#each Array(4) as item, index}
				<Levels
					top={NaN}
					name={"Loading..."}
					creator={"Loading..."}
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
	{/if}
	{#if listOption == 1}
		<PlayersList {list} />
	{/if}
	{#if showFilterBox}
		<div class="filterWrapper" transition:fly={{ y: 50, duration: 300 }}>
			<div class="filter">
				<div>
					Top range: <input type="text" bind:value={filter.minTop} /> -
					<input type="text" bind:value={filter.maxTop} />
				</div>
				<div>
					Rating range: <input type="text" bind:value={filter.minPt} /> -
					<input type="text" bind:value={filter.maxPt} />
				</div>
				{#if $userdata.isLoggedIn}
					<div>
						Hide beaten levels: <input type="checkbox" bind:value={filter.hideBeatenLevels} />
					</div>
				{/if}
				<div class="filterControl">
					<svg
						class="clickable"
						on:click={() => {
							isFilered = true;
							fetchData();
						}}
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						width="24"
						><path d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z" /></svg
					>
					<svg
						class="clickable"
						on:click={() => {
							resetFilter();
						}}
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						width="24"
						><path
							d="M12 20q-3.35 0-5.675-2.325Q4 15.35 4 12q0-3.35 2.325-5.675Q8.65 4 12 4q1.725 0 3.3.713 1.575.712 2.7 2.037V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2Q13.625 6 12 6 9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325Q14.75 20 12 20Z"
						/></svg
					>
					<svg
						class="clickable"
						on:click={() => {
							showFilterBox = false;
						}}
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						width="24"
						><path
							d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"
						/></svg
					>
				</div>
			</div>
		</div>
	{/if}
	<div class="listSwitcherWrapper" in:fly={{ y: 200, duration: 500, delay: 800 }}>
		<div class="listSwitcher">
			{#if list == "fl"}
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
			{/if}
			{#if listOption == 0}
				<span
					class="listSwitcherItem clickable"
					id={showFilterBox ? "highlight" : ""}
					on:click={() => {
						showFilterBox = !showFilterBox;
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
						><path
							d="M11 20q-.425 0-.712-.288Q10 19.425 10 19v-6L4.2 5.6q-.375-.5-.112-1.05Q4.35 4 5 4h14q.65 0 .913.55.262.55-.113 1.05L14 13v6q0 .425-.287.712Q13.425 20 13 20Zm1-7.7L16.95 6h-9.9Zm0 0Z"
						/></svg
					>
				</span>
			{/if}
		</div>
	</div>
</div>
{#if $userdata.data.isAdmin}
	<AddLevelModal bind:ifShow={showAddLevelModal} />
{/if}

<style lang="scss">
	.filterWrapper {
		width: 100%;
		left: 0;
		right: 0;
		z-index: 1;
		position: fixed;
		bottom: 0;
		margin-bottom: 75px;
		display: flex;
		justify-content: center;
		input[type="text"] {
			width: 50px;
		}
		.filter {
			background-color: var(--color23);
			box-shadow: 0 0 15px rgba(7, 7, 7, 0.507);
			border-radius: 35px;
			padding: 20px;
			width: fit-content;
			text-align: center;
			div {
				padding: 5px;
				display: inline-block;
				vertical-align: middle;
			}
		}
	}
	#noDec {
		text-decoration: none;
	}
	.AddLvBtn {
		background-color: var(--color17);
		width: 300px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		margin-top: 10px;
		margin-bottom: 35px;
		color: var(--textColor);
		svg {
			fill: var(--textColor);
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
		svg {
			fill: var(--textColor);
		}
		display: grid;
		gap: 30px;
		grid-template-areas:
			"sel sel"
			"line line"
			"widget widget";
		grid-auto-columns: 1fr;
	}
	.listSwitcherWrapper {
		transition: all 1s ease-in-out;
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
				color: var(--textColor);
				text-decoration: none;
			}
			display: flex;
			align-items: center;
			justify-content: center;
			padding-inline: 5px;
			.listSwitcherItem {
				margin-inline: 2px;
				padding-inline: 15px;
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
				color: var(--textColor);
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
