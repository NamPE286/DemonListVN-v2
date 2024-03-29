<script>
	import { page } from "$app/stores";
	import { userdata } from "./stores";
	import { createClient } from "@supabase/supabase-js";
	import LoadingAnimation from "../components/animations/LoadingAnimation.svelte";
	import EditRecordModal from "../components/modals/EditRecordModal.svelte";
	import Badge from "../components/badge.svelte";
	import EditLevelModal from "../components/modals/EditLevelModal.svelte";
	import { fly } from "svelte/transition";
	var id = $page.url.searchParams.get("id");
	var level = null;
	var title = "";
	var records = [];
	var currentRecord;
	var player;
	var showEditProfileModal = false;
	var showEditRecordModal = false;
	var showEditLevelModal = false;
	var downloading = 0;
	const supabase = createClient(
		import.meta.env.VITE_DATABASE_API_URL,
		import.meta.env.VITE_DATABASE_API_KEY
	);
	$: fetch(`${import.meta.env.VITE_BACKEND_API_URL}/level/${$page.url.searchParams.get("id")}`)
		.then((response) => response.json())
		.then((data) => {
			level = data.data;
			title = data.data.name;
			if (data.records) records = data.records;
		});
	function getPoint() {
		if (level.flPt && level.rating) return `${level.rating}pt (#${level.flTop} ${level.flPt}pt)`;
		if (level.flPt == 0) return "0pt";
		return `${level.flPt ? level.flPt : level.rating}pt`;
	}
	async function removeRecord(item, index) {
		fetch(`${import.meta.env.VITE_BACKEND_API_URL}/record/${item.userid}/${item.levelid}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				token: supabase.auth.session().access_token
			})
		});
		records.splice(index, 1);
		records = records;
	}

	async function downloadSong(id) {
		downloading = 1;
		const url = supabase.storage.from("songs").getPublicUrl(`${id}.mp3`).publicURL;

		fetch(url)
			.then((res) => res.blob())
			.then((blob) => {
				const blobUrl = URL.createObjectURL(blob);
				const link = document.createElement("a");

				link.href = blobUrl;
				link.download = `${id}.mp3`;

				document.body.appendChild(link);

				link.dispatchEvent(
					new MouseEvent("click", {
						bubbles: true,
						cancelable: true,
						view: window
					})
				);

				document.body.removeChild(link);
				downloading = 2;
			});
	}

	function ifMobile(item) {
		if (item.mobile) return "Mobile ";
		return "";
	}
</script>

<svelte:head>
	{#if title}
		<title>{title}'s Info - Demon List VN</title>
		<meta name="description" content={`${title}'s Info`} />
		<meta name="keywords" content={title} />
	{/if}
</svelte:head>

{#if level}
	<div class="pageContent" in:fly={{ y: 50, duration: 500, delay: 300 }}>
		<div class="thumbnailWidget">
			<img src={`https://img.youtube.com/vi/${level.videoID}/mqdefault.jpg`} alt="" />
			<div class="levelInfo">
				<p class="top">#{level.dlTop ? level.dlTop : level.flTop}</p>
				<div class="info">
					<p class="levelName">{level.name}</p>
					<p class="creator">
						by {level.creator} - {getPoint()}
						{level.unrated ? "(Unrated)" : ""}
					</p>
				</div>
				{#if $userdata.data.isAdmin}
					<span
						on:click={() => {
							showEditLevelModal = !showEditLevelModal;
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
							><path
								d="M9 39h2.2l22.15-22.15-2.2-2.2L9 36.8Zm30.7-24.3-6.4-6.4 2.1-2.1q.85-.85 2.1-.85t2.1.85l2.2 2.2q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Zm-5.35-1.05-1.1-1.1 2.2 2.2Z"
							/></svg
						>
					</span>
				{/if}
			</div>
		</div>
		<iframe
			width="560"
			height="315"
			src={`https://www.youtube.com/embed/${level.videoID}`}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
		<div class="levelInfo1">
			<p>
				<b>Description:</b><br />
				<span class="desc">
					{level.description}
				</span>
			</p>
			<p><b>Minimum Progress: </b><span class="desc">{level.minProgress}%</span></p>
			<p><b>Difficulty: </b><span class="desc">{level.difficulty}</span></p>
			<p><b>ID: </b><span class="desc">{id}</span></p>
			<p>
				<b>Song: </b><span class="desc">
					{#if level.songID == null}
						Available on Newgrounds
					{/if}
					{#if level.songID != null}
						{#if downloading == 0}
							<span id="download" on:click={() => downloadSong(level.songID)}>Download</span>
						{/if}
						{#if downloading == 1}
							<span>Retrieving file...</span>
						{/if}
						{#if downloading == 2}
							<span>Downloaded</span>
						{/if}
					{/if}
				</span>
			</p>
		</div>
		<div class="additionalInfo">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="26.901"
				height="27.215"
				viewBox="0 0 26.901 27.215"
			>
				<path
					id="download_FILL0_wght300_GRAD0_opsz48"
					d="M11.6,35.865a2.6,2.6,0,0,1-2.6-2.6v-5.56h2.018v5.56a.615.615,0,0,0,.583.583H33.3a.615.615,0,0,0,.583-.583v-5.56H35.9v5.56a2.6,2.6,0,0,1-2.6,2.6Zm10.85-6.725L15.008,21.7l1.48-1.435,4.932,4.932V8.65h2.062V25.194l4.932-4.932,1.48,1.435Z"
					transform="translate(-9 -8.65)"
					fill="var(--textColor)"
				/>
			</svg>
			<span>{level.downloads}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="31.453"
				height="29.303"
				viewBox="0 0 31.453 29.303"
			>
				<path
					id="thumb_up_FILL0_wght300_GRAD0_opsz48"
					d="M28.857,33.1H12.2V14.434L22.6,3.8l.985.788a1.2,1.2,0,0,1,.354.512,2.007,2.007,0,0,1,.118.709v.315l-1.694,8.31H34.1a2.19,2.19,0,0,1,1.6.689,2.148,2.148,0,0,1,.689,1.556v2.6q0,.276.02.551a.97.97,0,0,1-.1.512L31.654,31.213a3.265,3.265,0,0,1-1.142,1.339A2.84,2.84,0,0,1,28.857,33.1ZM13.969,31.331H29.251a.693.693,0,0,0,.335-.1.567.567,0,0,0,.256-.3l4.726-11.186V16.679a.471.471,0,0,0-.473-.473H20.153l1.969-9.453-8.153,8.429Zm0-16.148v0ZM12.2,14.434v1.772H6.762V31.331H12.2V33.1H4.95V14.434Z"
					transform="translate(-4.95 -3.8)"
					fill="var(--textColor)"
				/>
			</svg>
			<span>{level.likes}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="27.838"
				height="27.838"
				viewBox="0 0 27.838 27.838"
			>
				<path
					id="stars_FILL0_wght300_GRAD0_opsz48"
					d="M13.425,27.161l5.494-4.176,5.494,4.176-2.161-6.776,5.494-3.846h-6.7l-2.124-7-2.161,7H10.091l5.458,3.846Zm5.494,5.678a13.487,13.487,0,0,1-5.4-1.1A13.956,13.956,0,0,1,6.1,24.322a13.921,13.921,0,0,1,0-10.842A13.884,13.884,0,0,1,9.084,9.066,14.263,14.263,0,0,1,13.516,6.1a13.921,13.921,0,0,1,10.842,0,13.823,13.823,0,0,1,7.381,7.381,13.921,13.921,0,0,1,0,10.842,14.263,14.263,0,0,1-2.967,4.432,13.884,13.884,0,0,1-4.414,2.985A13.577,13.577,0,0,1,18.919,32.838Zm0-1.648a11.808,11.808,0,0,0,8.7-3.59,11.857,11.857,0,0,0,3.571-8.681,11.839,11.839,0,0,0-3.571-8.7,11.839,11.839,0,0,0-8.7-3.571,11.857,11.857,0,0,0-8.681,3.571,11.808,11.808,0,0,0-3.59,8.7,11.826,11.826,0,0,0,3.59,8.681A11.826,11.826,0,0,0,18.919,31.19ZM18.919,18.919Z"
					transform="translate(-5 -5)"
					fill="var(--textColor)"
				/>
			</svg>
			<span>{level.coins} {level.coins && !level.verifiedCoins ? "(N/v)" : ""}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="29.78"
				height="27.215"
				viewBox="0 0 29.78 27.215"
			>
				<path
					id="alarm_FILL0_wght300_GRAD0_opsz48"
					d="M18.521,32.965a12.041,12.041,0,0,1-4.817-.971,12.67,12.67,0,0,1-3.938-2.637A12.489,12.489,0,0,1,7.093,25.42,12.068,12.068,0,0,1,6.1,20.548a11.849,11.849,0,0,1,.989-4.817,13,13,0,0,1,2.674-3.956A12.361,12.361,0,0,1,13.7,9.1a12.041,12.041,0,0,1,4.817-.971,12.172,12.172,0,0,1,4.835.971,12.307,12.307,0,0,1,3.956,2.674,12.734,12.734,0,0,1,2.656,3.956,12.414,12.414,0,0,1-2.656,13.626,12.612,12.612,0,0,1-3.956,2.637,12.172,12.172,0,0,1-4.835.971ZM18.521,20.621Zm4.615,5.714,1.172-1.172-4.872-4.872V13.259H17.789v7.729ZM9.144,5.75l1.172,1.172L4.822,12.27,3.65,11.1Zm18.791,0L33.43,11.1,32.257,12.27,26.763,6.922ZM18.521,31.317A10.694,10.694,0,0,0,29.29,20.548a10.409,10.409,0,0,0-3.132-7.619,10.361,10.361,0,0,0-7.637-3.15,10.379,10.379,0,0,0-7.619,3.15,10.379,10.379,0,0,0-3.15,7.619,10.361,10.361,0,0,0,3.15,7.637,10.409,10.409,0,0,0,7.619,3.132Z"
					transform="translate(-3.65 -5.75)"
					fill="var(--textColor)"
				/>
			</svg>
			<span>{level.length}</span>
		</div>
		{#if !records.length}
			<div class="centerText">No one has beaten this level yet</div>
		{/if}
		{#if records.length}
			<div class="centerText">Total record: {records.length}</div>
			<div class="playersListWrapper">
				<div class="playersList">
					<div class="playerName">
						<p>Player name</p>
					</div>
					<div class="playerPt">
						<p>Progress</p>
					</div>
				</div>
				{#each records as item, index}
					<div class="playersList" id={index % 2 ? "" : "highlight2"}>
						<div class="playerName">
							<Badge player={item.players}
								><a href={`/player?id=${item.userid}`}>{item.players.name}</a></Badge
							>
						</div>
						<div class="playerPt">
							<a href={item.videoLink} id="center" target="_blank"
								>{item.progress}% ({ifMobile(item)}{item.refreshRate}fps)</a
							>
							{#if $userdata.data.isAdmin}
								<span
									on:click={() => {
										showEditRecordModal = !showEditProfileModal;
										currentRecord = item;
										player = {
											data: {
												uid: item.userid
											}
										};
									}}
									><svg id="forAdmin" xmlns="http://www.w3.org/2000/svg" height="24" width="24"
										><path
											d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"
										/></svg
									></span
								>
								<span on:click={() => removeRecord(item, index)}
									><svg id="forAdmin" xmlns="http://www.w3.org/2000/svg" height="24" width="24"
										><path
											d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"
										/></svg
									></span
								>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	{#if $userdata.data.isAdmin}
		{#if player}
			{#if currentRecord}
				<EditRecordModal
					bind:ifShow={showEditRecordModal}
					player={player.data}
					record={currentRecord}
				/>
			{/if}
		{/if}
		<EditLevelModal bind:ifShow={showEditLevelModal} {level} />
	{/if}
{:else}
	<LoadingAnimation />
{/if}

<style lang="scss">
	#download {
		cursor: pointer;
		color: #8ab4f8;
	}
	.centerText {
		grid-area: record;
		display: flex;
		flex-direction: column;
		text-align: center;
		height: 100px;
	}
	#center {
		text-align: center;
	}
	#highlight2 {
		background-color: var(--color23);
	}
	#abcs {
		display: none;
	}
	#videoLink {
		margin-left: 3px;
	}
	iframe {
		grid-area: widget1;
		border-radius: 50px;
	}
	svg {
		transform: scale(0.7);
	}
	.pageContent {
		display: grid;
		gap: 30px;
		grid-template-areas:
			"header header"
			"widget1 widget"
			"widget1 widget"
			"widget1 widget2"
			"record record";
		grid-auto-columns: 1fr;
	}
	.thumbnailWidget {
		grid-area: header;
		width: 100%;
		height: 500px;
		background-color: var(--color23);
		border-radius: 50px;
		display: flex;
		margin-bottom: -10px;
		flex-direction: column;
		img {
			height: 70%;
			width: 100%;
			object-fit: cover;
			border-radius: 50px 50px 0 0;
		}
	}
	.levelInfo {
		display: flex;
		margin-top: auto;
		margin-bottom: auto;
		svg {
			fill: var(--textColor);
		}
		p {
			margin: 0;
		}
		.top {
			font-size: 50px;
			font-weight: 500;
			margin-left: 80px;
			margin-right: 15px;
		}
		.info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			.levelName {
				font-weight: 500;
				font-size: 30px;
			}
			.creator {
				font-size: 16px;
				font-weight: 200;
				color: var(--color7);
			}
		}
	}
	.levelInfo1 {
		grid-area: widget;
		background-color: var(--color23);
		border-radius: 50px;
		padding: 15px;
		padding-inline: 35px;
		overflow: auto;
	}
	.additionalInfo {
		grid-area: widget2;
		background-color: var(--color23);
		border-radius: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		span {
			margin-inline: 6px;
		}
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.desc {
		color: var(--color7);
	}
	.playersListWrapper {
		grid-area: record;
		display: flex;
		flex-direction: column;
	}
	.playerName {
		font-size: 30px;
		font-weight: 500;
		margin-bottom: 30px;
		svg {
			fill: var(--textColor);
			margin-left: -30px;
		}
	}
	.playersList {
		height: 50px;
		display: flex;
		border-radius: 50px;
		a {
			color: var(--textColor);
			text-decoration: none;
		}
		.playerName {
			display: flex;
			align-items: center;
			font-size: 16px;
			height: 100%;
			box-sizing: border-box;
			padding-inline: 40px;
		}
		.playerPt {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: auto;
			width: 180px;
			height: 100%;
			svg {
				fill: var(--textColor);
				margin-left: 15px;
			}
		}
	}
	.editProfile {
		background-color: var(--color23);
		height: 80px;
		width: 100%;
		border-radius: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30px;
		color: var(--textColor);
		text-decoration: none;
		svg {
			fill: var(--textColor);
			margin-right: 10px;
		}
	}

	@media screen and (max-width: 1450px) {
	}
	@media screen and (max-width: 1100px) {
		.pageContent {
			width: 90%;
			grid-template-areas:
				"header"
				"widget1"
				"widget"
				"widget2"
				"record";
		}
		iframe {
			width: 100%;
		}
		.levelInfo {
			.top {
				margin-left: 35px;
			}
		}
		.thumbnailWidget {
			height: 350px;
		}
	}
</style>
