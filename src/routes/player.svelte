<script>
	import { page } from "$app/stores";
	import { createClient } from "@supabase/supabase-js";
	import LoadingAnimation from "../components/LoadingAnimation.svelte";
	import EditProfileModal from "../components/EditProfileModal.svelte";
	import AddRecordModal from "../components/AddRecordModal.svelte";
	import EditRecordModal from "../components/EditRecordModal.svelte";
	import { userdata } from "./stores";
	const id = $page.url.searchParams.get("id");
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
	var player;
	var list = 1;
	var flrec = [];
	var dlrec = [];
	var currentLevel;
	var user;
	user = {
		data: {
			data: {
				id: null,
				name: null,
				email: null,
				avatar: null,
				facebook: null,
				youtube: null,
				discord: null,
				totalFLpt: null,
				totalDLpt: null,
				flrank: null,
				dlrank: null,
				uid: null,
				isAdmin: false
			},
			records: []
		},
		metadata: {
			id: null
		}
	};
	userdata.subscribe((value) => {
		if(value.metadata) user = value;
	});
	var showEditProfileModal = false;
	var showAddRecordModal = false;
	var showEditRecordModal = false;
	fetch(`https://demon-listv2-api.vercel.app/players/${id}`)
		.then((response) => response.json())
		.then((data) => {
			player = data;
			for (const i in data.records) {
				if (data.records[i].flPt) flrec.push(data.records[i]);
				if (data.records[i].dlPt) dlrec.push(data.records[i]);
			}
			if (dlrec.length) list = 0;
		});
	function getDiscordTag() {
		const tag = player.data.discord;
		if (tag == null) {
			alert("Player's discord tag unavailable");
			return;
		}
		const el = document.createElement("textarea");
		el.value = tag;
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
		alert("Copied tag to clipboard");
	}
	async function removeLevel(item, index){
		if(list == 1){
			flrec.splice(index, 1);
			flrec = flrec
		}
		else if(list == 0){
			dlrec.splice(index, 1);
			dlrec = dlrec
		}
		var { data, error } = await supabase
			.from('records')
			.delete()
			.match({ id: item.id })
		if (error) {
			alert(error.message);
			return;
		}
		var { data, error} = await supabase.rpc('updateRank')
	}
</script>

{#if player}
	<title>{player.data.name}'s Info</title>
	<div class="pageContent">
		<div class="playerInfoWidgetWrapper">
			<div class="playerInfoWidget">
				<div class="avatar">
					<img src={player.data.avatar} alt="" />
				</div>
				<span class="playerName">{player.data.name}</span>
				<div class="social">
					<a
						href={player.data.youtube ? player.data.youtube : "#!"}
						target="_blank"
						class="iconWrapper"
					>
						<svg
							id="youtube"
							xmlns="http://www.w3.org/2000/svg"
							width="36.126"
							height="25.385"
							viewBox="0 0 36.126 25.385"
						>
							<path
								id="youtube-2"
								data-name="youtube"
								d="M37.108,13.2a13.949,13.949,0,0,0-1.493-6.777,4.792,4.792,0,0,0-2.823-1.641,128.6,128.6,0,0,0-13.735-.509A128.732,128.732,0,0,0,5.371,4.77a4.71,4.71,0,0,0-2.4,1.214C1.5,7.346,1.334,9.676,1.17,11.646a79.243,79.243,0,0,0,0,10.634,15.672,15.672,0,0,0,.492,3.282,5.153,5.153,0,0,0,1.165,2.232,4.693,4.693,0,0,0,2.445,1.28,74.141,74.141,0,0,0,10.667.542c5.744.082,10.782,0,16.739-.459a4.726,4.726,0,0,0,2.511-1.28,4.086,4.086,0,0,0,1-1.641,17.362,17.362,0,0,0,.853-5.58C37.108,19.736,37.108,14.189,37.108,13.2ZM15.348,21.64V11.482l9.715,5.1C22.339,18.1,18.745,19.8,15.348,21.64Z"
								transform="translate(-0.991 -4.258)"
								fill="#fff"
							/>
						</svg>
					</a>
					<a
						href={player.data.facebook ? player.data.facebook : "#!"}
						target="_blank"
						class="iconWrapper"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="39.398"
							height="39.398"
							viewBox="0 0 39.398 39.398"
						>
							<g id="Group_1" data-name="Group 1" transform="translate(-266 -618.672)">
								<path
									id="Path_2"
									data-name="Path 2"
									d="M39.4,19.7A19.7,19.7,0,1,0,16.621,39.158V25.393h-5V19.7h5v-4.34c0-4.937,2.941-7.664,7.441-7.664a30.292,30.292,0,0,1,4.41.385v4.848H25.987c-2.447,0-3.21,1.518-3.21,3.076v3.7H28.24l-.873,5.694h-4.59V39.158A19.7,19.7,0,0,0,39.4,19.7Z"
									transform="translate(266 618.672)"
									fill="#fff"
								/>
								<path
									id="Path_3"
									data-name="Path 3"
									d="M317.748,217.7l.873-5.694h-5.463v-3.7c0-1.558.763-3.076,3.21-3.076h2.484v-4.848a30.294,30.294,0,0,0-4.41-.385c-4.5,0-7.441,2.727-7.441,7.664V212h-5V217.7h5v13.765a19.907,19.907,0,0,0,6.156,0V217.7Z"
									transform="translate(-24.381 426.367)"
								/>
							</g>
						</svg>
					</a>
					<a href="#!" class="iconWrapper" on:click={getDiscordTag}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="33.004"
							height="24.429"
							viewBox="0 0 33.004 24.429"
						>
							<path
								id="discord"
								d="M11.745,5.177c-1.118,0-4.489,1.367-5.093,1.64A5.805,5.805,0,0,0,4.613,9.352c-.762,1.408-1.374,3.053-2.368,5.474S1.02,21.914,1.053,23.339s.2,2.536,1.656,3.379a32.463,32.463,0,0,0,4.108,2.253c1.358.53,2.285.911,2.915.381a4.735,4.735,0,0,0,1.044-1.457s.6-.828-.53-1.325-1.689-.845-1.64-1.359.132-.795.414-.728a7.034,7.034,0,0,0,3.5,1.805,23.518,23.518,0,0,0,5.038.464,23.518,23.518,0,0,0,5.038-.464,7.034,7.034,0,0,0,3.5-1.805c.282-.066.364.215.414.728s-.513.862-1.64,1.359-.53,1.325-.53,1.325a4.735,4.735,0,0,0,1.044,1.457c.629.53,1.557.149,2.915-.381A32.46,32.46,0,0,0,32.4,26.717c1.459-.843,1.623-1.954,1.656-3.379s-.2-6.092-1.192-8.513-1.606-4.066-2.368-5.474a5.805,5.805,0,0,0-2.038-2.534c-.6-.273-3.975-1.64-5.093-1.64a1.505,1.505,0,0,0-1.449.779l-.389.862a29.91,29.91,0,0,0-3.952-.5,30.458,30.458,0,0,0-3.987.5l-.389-.862a1.505,1.505,0,0,0-1.449-.779Zm.122,10.336h.041A3.075,3.075,0,0,1,14.859,18.7a3.075,3.075,0,0,1-2.951,3.186A3.075,3.075,0,0,1,8.956,18.7a3.079,3.079,0,0,1,2.91-3.186Zm11.331,0h.041a3.079,3.079,0,0,1,2.91,3.186A3.075,3.075,0,0,1,23.2,21.884,3.075,3.075,0,0,1,20.246,18.7,3.075,3.075,0,0,1,23.2,15.513Z"
								transform="translate(-1.05 -5.177)"
								fill="#fff"
							/>
						</svg>
					</a>
				</div>
			</div>
			{#if id == user.metadata.id}
				<a
					href="#!"
					class="editProfile"
					on:click={() => {
						showEditProfileModal = !showEditProfileModal;
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
						><path
							d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"
						/></svg
					>
					<span>Edit profile</span>
				</a>
			{/if}
		</div>
		<div class="fltop">
			<p class="topTitle">Featured List Rank</p>
			<p class="top">#{player.data.flrank ? player.data.flrank : "N/a"}</p>
		</div>
		<div class="dltop">
			<p class="topTitle">Demon List Rank</p>
			<p class="top">#{player.data.dlrank ? player.data.dlrank : "N/a"}</p>
		</div>
		<div class="listSelect">
			<div class="showRecordFrom">
				<span>Show records from</span>
			</div>
			<select bind:value={list}>
				{#if dlrec.length}
					<option value={0} selected={true}>Demon List</option>
				{/if}
				{#if flrec.length}
					<option value={1}>Featured List</option>
				{/if}
			</select>
		</div>
		{#if list == 0}
			<div class="playersListWrapper">
				<div class="playersList">
					<div class="playerName">
						<p>Level name</p>
						{#if user.data.data.isAdmin}
							<a href="#!" on:click={() => (showAddRecordModal = !showAddRecordModal)}
								><svg id="forAdmin" xmlns="http://www.w3.org/2000/svg" height="24" width="24"
									><path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" /></svg
								></a
							>
						{/if}
					</div>
					<div class="playerPt">
						<p>Point</p>
					</div>
				</div>
				{#each dlrec as item, index}
					<div class="playersList" id={index % 2 ? "" : "highlight2"}>
						<div class="playerName">
							<a href={`/level?id=${item.levelid}`}>{item.levels.name} ({item.refreshRate}fps)</a><a
								href={item.videoLink}
								target="_blank"
								id="videoLink">(Video Link)</a
							>
						</div>
						<div class="playerPt">
							<p>{item.dlPt} <br id="abcs" />({item.progress}%)</p>
							{#if user.data.data.isAdmin}
								<a
									href="#!"
									on:click={() => {
										showEditRecordModal = !showEditProfileModal;
										currentLevel = item;
									}}
									><svg id="forAdmin" xmlns="http://www.w3.org/2000/svg" height="24" width="24"
										><path
											d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"
										/></svg
									></a
								>
								<a href="#!" on:click={() => removeLevel(item, index)}
									><svg id="forAdmin" xmlns="http://www.w3.org/2000/svg" height="24" width="24"
										><path
											d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"
										/></svg
									></a
								>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
		{#if list == 1}
			<div class="playersListWrapper">
				<div class="playersList">
					<div class="playerName">
						<p>Level name</p>
						{#if user.data.data.isAdmin}
							<a href="#!" on:click={() => (showAddRecordModal = !showAddRecordModal)}
								><svg id="forAdmin" xmlns="http://www.w3.org/2000/svg" height="24" width="24"
									><path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" /></svg
								></a
							>
						{/if}
					</div>
					<div class="playerPt">
						<p>Point</p>
					</div>
				</div>
				{#each flrec as item, index}
					<div class="playersList" id={index % 2 ? "" : "highlight2"}>
						<div class="playerName">
							<a href={`/level?id=${item.levelid}`}>{item.levels.name} ({item.refreshRate}fps)</a><a
								href={item.videoLink}
								target="_blank"
								id="videoLink">(Video Link)</a
							>
						</div>
						<div class="playerPt">
							<p>{item.flPt}</p>
							{#if user.data.data.isAdmin}
								<a
									href="#!"
									on:click={() => {
										showEditRecordModal = !showEditProfileModal;
										currentLevel = item;
									}}
									><svg id="forAdmin" xmlns="http://www.w3.org/2000/svg" height="24" width="24"
										><path
											d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"
										/></svg
									></a
								>
								<a href="#!" on:click={() => removeLevel(item, index)}
									><svg id="forAdmin" xmlns="http://www.w3.org/2000/svg" height="24" width="24"
										><path
											d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"
										/></svg
									></a
								>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	{#if id == user.metadata.id}
		<EditProfileModal bind:ifShow={showEditProfileModal} />
	{/if}
	{#if user.data.data.isAdmin}
		<AddRecordModal bind:ifShow={showAddRecordModal} bind:player />
		{#if currentLevel}
			<EditRecordModal bind:ifShow={showEditRecordModal} bind:player level={currentLevel} />
		{/if}
	{/if}
{:else}
	<LoadingAnimation />
{/if}

<style lang="scss">
	#abcs {
		display: none;
	}
	#videoLink {
		margin-left: 3px;
	}
	.pageContent {
		display: grid;
		width: 70%;
		margin-inline: auto;
		margin-bottom: 100px;
		gap: 30px;
		grid-template-areas:
			"info dltop fltop"
			"info sel sel"
			"info record record";
		grid-template-columns: 28% 33.25% 33.25%;
	}
	.avatar {
		background-color: black;
		margin-bottom: 30px;
		width: 12.5vw;
		height: 12.5vw;
		margin-inline: auto;
		border-radius: 50%;
		border-color: white;
		border-style: solid;
		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
			border-radius: 50%;
		}
	}
	.playerName {
		font-size: 30px;
		font-weight: 500;
		margin-bottom: 30px;
		svg {
			filter: invert(1);
			margin-left: -30px;
		}
	}
	.playerInfoWidget {
		height: fit-content;
		width: 100%;
		border-radius: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 40px;
		padding-bottom: 40px;
		background-color: #202020;
	}
	.playerInfoWidgetWrapper {
		grid-area: info;
		height: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.fltop {
		grid-area: fltop;
		height: 200px;
		border-radius: 50px;
		background-color: #202020;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-inline: 50px;
		.topTitle {
			font-size: 28px;
			margin-top: 0;
			margin-bottom: 0;
		}
		.top {
			font-size: 75px;
			margin-top: 0;
			margin-bottom: 0;
			color: #6b6b6b;
			font-weight: 300;
		}
	}
	.dltop {
		grid-area: dltop;
		height: 200px;
		border-radius: 50px;
		background-color: #202020;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-inline: 50px;
		.topTitle {
			font-size: 28px;
			margin-top: 0;
			margin-bottom: 0;
		}
		.top {
			font-size: 75px;
			margin-top: 0;
			margin-bottom: 0;
			color: #6b6b6b;
			font-weight: 300;
		}
	}
	.social {
		display: flex;
		align-items: center;
		.iconWrapper {
			background-color: #3b3b3b;
			width: 60px;
			height: 60px;
			margin-inline: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 15px;
			svg {
				transform: scale(0.8);
			}
		}
	}
	.listSelect {
		grid-area: sel;
		height: 50px;
		width: 100%;
		border-radius: 50px;
		display: flex;
		align-items: center;
		.showRecordFrom {
			height: 100%;
			width: 175px;
			background-color: #202020;
			border-radius: 50px 0 0 50px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		select {
			width: calc(100% - 175px);
			height: 100%;
			border-radius: 0 50px 50px 0;
			background-color: #2b2b2b;
			border-color: #2b2b2b;
			color: #8e8e8e;
			padding-inline: 10px;
		}
	}
	#highlight2 {
		background-color: #202020;
	}
	.playersListWrapper {
		grid-area: record;
		display: flex;
		flex-direction: column;
	}
	.playersList {
		height: 50px;
		display: flex;
		border-radius: 50px;
		a {
			color: white;
			text-decoration: none;
		}
		.playerName {
			display: flex;
			align-items: center;
			font-size: 16px;
			width: 80%;
			height: 100%;
			p {
				margin-left: 40px;
			}
			a {
				margin-left: 40px;
			}
		}
		.playerPt {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 20%;
			height: 100%;
			svg {
				filter: invert(1);
				margin-left: 15px;
			}
		}
	}
	.editProfile {
		background-color: #202020;
		height: 80px;
		width: 100%;
		border-radius: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30px;
		color: white;
		text-decoration: none;
		svg {
			filter: invert(1);
			margin-right: 10px;
		}
	}
	@media screen and (max-width: 1450px) {
		.pageContent {
			width: 80%;
			.avatar {
				margin-top: 35px;
				width: 14vw;
				height: 14vw;
			}
		}
		.playerInfoWidget {
			padding-top: 0px;
			padding-bottom: 30px;
			.avatar {
				margin-bottom: 30px;
			}
			.playerName {
				font-size: 26px;
			}
		}
	}
	@media screen and (max-width: 1100px) {
		#abcs {
			display: block;
		}
		.pageContent {
			width: 90%;
			grid-template-areas:
				"info"
				"fltop"
				"dltop"
				"sel"
				"record";
			grid-template-columns: 100%;
			.avatar {
				margin-top: 35px;
				width: 50vw;
				height: 50vw;
			}
		}
		.playerPt {
			margin-right: 20px;
		}
		.playersList {
			height: 80px;
		}
	}
</style>
