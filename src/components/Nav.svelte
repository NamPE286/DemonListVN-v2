<script lang="ts">
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";
	import { userdata } from "../routes/stores";
	import Modal from "./modals/Modal.svelte";
	import NameModal from "./modals/NameModal.svelte";
	async function addUser(user1) {
		var { data, error } = await supabase.from("players").select("uid, name").eq("uid", user1.id);
		if (data.length == 0) {
			var { data, error } = await supabase.from("players").insert({
				uid: user.id,
				name: "/defaultplayers/",
				email: user1.email
			});
			ifShowNameInput = true;
		} else if (data[0].name == "/defaultplayers/") {
			ifShowNameInput = true;
		}
	}
	const supabase = createClient(
		import.meta.env.VITE_DATABASE_API_URL,
		import.meta.env.VITE_DATABASE_API_KEY
	);
	var user;
	var uid;
	supabase.auth.onAuthStateChange((_, session) => {
		user = session.user;
		uid = user.id;
		addUser(session.user);
	});
	var menuExpanded: boolean = false;
	var ifOntop: boolean = true;
	var ifShowNameInput: boolean = false;
	var forceSignIn = false;
	onMount(() => {
		window.addEventListener("scroll", () => {
			ifOntop = window.scrollY == 0;
		});
	});
	function toggleMenu() {
		menuExpanded = !menuExpanded;
	}
	var submitClicked: boolean = false;
	function openModal() {
		submitClicked = !submitClicked;
	}
	async function signIn() {
		const { user, session, error } = await supabase.auth.signIn({
			provider: "google"
		});
	}
	async function signOut() {
		window.location.reload();
		const { error } = await supabase.auth.signOut();
	}

	var searchValue = "";
	var tOut = [];
	var searchRes = [];
	var searchPlayerRes = [];
	var isTyping = false;
	function typingAction() {
		isTyping = true;
		for (var i = 0; i < tOut.length; i++) {
			clearTimeout(tOut[i]);
		}
		tOut = [];
		tOut.push(
			setTimeout(() => {
				if (searchValue.length)
					fetch(`${import.meta.env.VITE_BACKEND_API_URL}/search/${searchValue}`)
						.then((response) => response.json())
						.then((data) => {
							searchRes = data[0];
							searchPlayerRes = data[1];
							isTyping = false;
						});
			}, 400)
		);
	}
</script>

<div class={ifOntop ? "topBar" : "topBar1"}>
	<span class="menuIconWrapper clickable" on:click={toggleMenu}>
		{#if !menuExpanded}
			<svg id="menuIcon" xmlns="http://www.w3.org/2000/svg" height="24" width="24"
				><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z" /></svg
			>
		{:else}
			<svg id="menuIcon" xmlns="http://www.w3.org/2000/svg" height="24" width="24"
				><path
					d="M3 18v-2h13v2Zm16.6-1-5-5 5-5L21 8.4 17.4 12l3.6 3.6ZM3 13v-2h10v2Zm0-5V6h13v2Z"
				/></svg
			>
		{/if}
	</span>
	{#if uid && !forceSignIn}
		<a class="notificationIcon" href="/notifications">
			<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"
				><path
					d="M160 856v-80h80V496q0-83 50-147.5T420 264v-28q0-25 17.5-42.5T480 176q25 0 42.5 17.5T540 236v28q80 20 130 84.5T720 496v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400 896h160q0 33-23.5 56.5T480 976ZM320 776h320V496q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"
				/></svg
			>
			{#if $userdata.notifications.length}
				<div class="notiCount">{$userdata.notifications.length}</div>
			{/if}
		</a>
	{/if}
	<a id="title" href="/">Demon List VN</a>
	<div class="searchBox">
		<input
			autocomplete="false"
			placeholder="Search"
			class="searchInput"
			id="hideRes"
			bind:value={searchValue}
			on:input={typingAction}
		/>
		{#if (searchRes.length && searchValue.length && !isTyping) || (searchPlayerRes.length && searchValue.length && !isTyping)}
			<div class="searchRes">
				{#each searchRes as item, index}
					<a href={`/level?id=${item.id}`} on:click={() => (searchValue = "")}
						><br /><b>{item.name}</b> by {item.creator}</a
					><br />
				{/each}
				{#each searchPlayerRes as item, index}
					<a href={`/player?id=${item.id}`} on:click={() => (searchValue = "")}
						><br /><b>{item.name}</b></a
					><br />
				{/each}
				<br />
			</div>
		{/if}
		{#if !searchRes.length && !searchPlayerRes.length && searchValue.length && !isTyping}
			<div class="searchRes">
				<span on:click={() => (searchValue = "")}><br /><b>No result</b></span><br />
				<br />
			</div>
		{/if}
	</div>

	{#if uid && !forceSignIn}
		<span class="submitBtn clickable" on:click={openModal}>
			<p>Submit</p>
		</span>
	{/if}
	{#if !uid || forceSignIn}
		<span class="submitBtn clickable" id="signIn" on:click={signIn}>
			<p>Sign In</p>
		</span>
	{/if}
</div>
<div class="topSpacer" />
{#if menuExpanded}
	<div
		class="dimBg"
		on:click={() => {
			menuExpanded = false;
		}}
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 200 }}
	/>
{/if}
<div class={menuExpanded ? "sidebar1" : "sidebar"} id="sidebarDiv">
	<a href="/" class="sidebarIconWrapper" on:click={() => (menuExpanded = false)}>
		<div class="hide" id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
					><path
						d="M13 9V3h8v6ZM3 13V3h8v10Zm10 8V11h8v10ZM3 21v-6h8v6Zm2-10h4V5H5Zm10 8h4v-6h-4Zm0-12h4V5h-4ZM5 19h4v-2H5Zm4-8Zm6-4Zm0 6Zm-6 4Z"
					/></svg
				>
			</div>
			<p id="title1">Dashboard</p>
		</div>
		<p class="hideText" id="iconTitle">Dashboard</p>
	</a>
	<a href="/DL" class="sidebarIconWrapper" on:click={() => (menuExpanded = false)}>
		<div class="hide" id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
					><path
						d="M8 17q.425 0 .713-.288Q9 16.425 9 16t-.287-.713Q8.425 15 8 15t-.713.287Q7 15.575 7 16t.287.712Q7.575 17 8 17Zm0-4q.425 0 .713-.288Q9 12.425 9 12t-.287-.713Q8.425 11 8 11t-.713.287Q7 11.575 7 12t.287.712Q7.575 13 8 13Zm0-4q.425 0 .713-.288Q9 8.425 9 8t-.287-.713Q8.425 7 8 7t-.713.287Q7 7.575 7 8t.287.712Q7.575 9 8 9Zm3 8h6v-2h-6Zm0-4h6v-2h-6Zm0-4h6V7h-6ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14ZM5 5v14V5Z"
					/></svg
				>
			</div>
			<p id="title1">Demon List</p>
		</div>
		<p class="hideText" id="iconTitle">Demon List</p>
	</a>
	<a href="/FL" class="sidebarIconWrapper" on:click={() => (menuExpanded = false)}>
		<div class="hide" id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
					><path
						d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z"
					/></svg
				>
			</div>
			<p id="title1">Featured List</p>
		</div>
		<p class="hideText" id="iconTitle">FT List</p>
	</a>
	<a href="/leaderboard" class="sidebarIconWrapper" on:click={() => (menuExpanded = false)}>
		<div class="hide" id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
					><path d="M4 19h4v-8H4Zm6 0h4V5h-4Zm6 0h4v-6h-4ZM2 21V9h6V3h8v8h6v10Z" /></svg
				>
			</div>
			<p id="title1">Leaderboard</p>
		</div>
		<p class="hideText" id="iconTitle">Leaderboard</p>
	</a>
	<a href="/playerSearch" class="sidebarIconWrapper" on:click={() => (menuExpanded = false)}>
		<div class="hide" id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"
					><path
						d="M20.002-248.462v-43.897q0-37.736 40.41-62.047t105.352-24.311q10.521 0 21.494.692 10.973.693 22.101 2.461-8.461 17.026-12.756 34.583-4.294 17.558-4.294 35.981v56.538H20.001Zm239.999 0v-54.999q0-28.091 15.77-51.353 15.769-23.262 45.461-40.57 29.692-17.307 70.153-25.961 40.461-8.654 88.461-8.654 48.923 0 89.384 8.654t70.154 25.961q29.692 17.308 45.153 40.57 15.462 23.262 15.462 51.353v54.999H260.001Zm507.69 0v-56.423q0-19.502-3.858-37-3.859-17.499-12.244-33.629 11.769-1.818 22.409-2.511 10.64-.692 20.873-.692 65.025 0 105.076 23.909 40.052 23.91 40.052 62.449v43.897H767.691Zm-456.666-50.255H649.18v-7.206q-1.282-32.487-48.513-53.154Q553.436-379.744 480-379.744q-73.18 0-120.539 20.667-47.359 20.667-48.436 53.565v6.795ZM165.123-412.691q-26.096 0-44.647-18.665t-18.551-44.924q0-26.308 18.664-44.756 18.665-18.448 44.925-18.448 26.307 0 44.948 18.448 18.64 18.448 18.64 45.159 0 25.699-18.429 44.442-18.43 18.744-45.55 18.744Zm629.46 0q-25.814 0-44.557-18.785-18.744-18.785-18.744-44.689 0-26.423 18.785-44.871 18.785-18.448 44.879-18.448 26.617 0 45.065 18.448 18.449 18.448 18.449 45.044 0 26.054-18.4 44.678-18.401 18.623-45.477 18.623Zm-314.447-47.308q-43.212 0-73.597-30.288-30.384-30.288-30.384-73.557 0-44.134 30.288-73.989 30.288-29.855 73.557-29.855 44.134 0 73.99 29.816 29.855 29.816 29.855 73.893 0 43.212-29.816 73.596-29.817 30.384-73.893 30.384Zm.29-50.254q22.574 0 37.869-15.593 15.295-15.593 15.295-38.424 0-22.574-15.346-37.869-15.347-15.295-38.01-15.295-22.439 0-38.132 15.347-15.692 15.346-15.692 38.01 0 22.439 15.593 38.131 15.593 15.693 38.423 15.693Zm-.221 211.536ZM480-563.844Z"
					/></svg
				>
			</div>
			<p id="title1">Player search</p>
		</div>
		<p class="hideText" id="iconTitle">Player search</p>
	</a>
	<hr />
	{#if uid}
		<a
			href={`/player?id=${uid}`}
			class="sidebarIconWrapper"
			on:click={() => (menuExpanded = false)}
		>
			<div class="hide" id="sidebarIcon">
				<div class="sidebarIcon">
					<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
						><path
							d="M5.85 17.1q1.275-.975 2.85-1.538Q10.275 15 12 15q1.725 0 3.3.562 1.575.563 2.85 1.538.875-1.025 1.363-2.325Q20 13.475 20 12q0-3.325-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12q0 1.475.488 2.775.487 1.3 1.362 2.325ZM12 13q-1.475 0-2.488-1.012Q8.5 10.975 8.5 9.5t1.012-2.488Q10.525 6 12 6t2.488 1.012Q15.5 8.025 15.5 9.5t-1.012 2.488Q13.475 13 12 13Zm0 9q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q1.325 0 2.5-.387 1.175-.388 2.15-1.113-.975-.725-2.15-1.113Q13.325 17 12 17t-2.5.387q-1.175.388-2.15 1.113.975.725 2.15 1.113Q10.675 20 12 20Zm0-9q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075Q12.65 8 12 8q-.65 0-1.075.425Q10.5 8.85 10.5 9.5q0 .65.425 1.075Q11.35 11 12 11Zm0-1.5Zm0 9Z"
						/></svg
					>
				</div>
				<p id="title1">Profile</p>
			</div>
			<p class="hideText" id="iconTitle">Profile</p>
		</a>
	{/if}
	<a href="/settings" class="sidebarIconWrapper" on:click={() => (menuExpanded = false)}>
		<div class="hide" id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
					><path
						d="m9.25 22-.4-3.2q-.325-.125-.612-.3-.288-.175-.563-.375L4.7 19.375l-2.75-4.75 2.575-1.95Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337L1.95 9.375l2.75-4.75 2.975 1.25q.275-.2.575-.375.3-.175.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3.287.175.562.375l2.975-1.25 2.75 4.75-2.575 1.95q.025.175.025.337v.675q0 .163-.05.338l2.575 1.95-2.75 4.75-2.95-1.25q-.275.2-.575.375-.3.175-.6.3l-.4 3.2Zm2.8-6.5q1.45 0 2.475-1.025Q15.55 13.45 15.55 12q0-1.45-1.025-2.475Q13.5 8.5 12.05 8.5q-1.475 0-2.488 1.025Q8.55 10.55 8.55 12q0 1.45 1.012 2.475Q10.575 15.5 12.05 15.5Zm0-2q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588.662-.387 1.212-.937l2.475 1.025.975-1.7-2.15-1.625q.125-.35.175-.738.05-.387.05-.787t-.05-.788q-.05-.387-.175-.737l2.15-1.625-.975-1.7-2.475 1.05q-.55-.575-1.212-.963-.663-.387-1.438-.587L13 4h-1.975l-.35 2.65q-.775.2-1.437.587-.663.388-1.213.938L5.55 7.15l-.975 1.7 2.15 1.6q-.125.375-.175.75-.05.375-.05.8 0 .4.05.775t.175.75l-2.15 1.625.975 1.7 2.475-1.05q.55.575 1.213.962.662.388 1.437.588Z"
					/></svg
				>
			</div>
			<p id="title1">Settings</p>
		</div>
		<p class="hideText" id="iconTitle">Settings</p>
	</a>
	<a href="/rules" class="sidebarIconWrapper" on:click={() => (menuExpanded = false)}>
		<div class="hide" id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
					><path
						d="M2 17v-2h9v2Zm0-8V7h9v2Zm12.4 11L13 18.6l2.6-2.6-2.6-2.6 1.4-1.4 2.6 2.6 2.6-2.6 1.4 1.4-2.6 2.6 2.6 2.6-1.4 1.4-2.6-2.6Zm2.15-9L13 7.45l1.4-1.4 2.125 2.125 4.25-4.25 1.4 1.425Z"
					/></svg
				>
			</div>
			<p id="title1">Rules</p>
		</div>
		<p class="hideText" id="iconTitle">Rules</p>
	</a>
	<a href="/about" class="sidebarIconWrapper" on:click={() => (menuExpanded = false)}>
		<div class="hide" id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
					><path
						d="M11 17h2v-6h-2Zm1-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"
					/></svg
				>
			</div>
			<p id="title1">About</p>
		</div>
		<p class="hideText" id="iconTitle">About</p>
	</a>
	<div class="bottomPad" />
</div>
<Modal bind:ifShow={submitClicked} />
{#if user}
	<NameModal bind:ifShow={ifShowNameInput} uid={user.id} />
{/if}

<style lang="scss">
	.notiCount {
		position: absolute;
		bottom: 0;
		background-color: red;
		color: white;
		padding-inline: 3px;
		border-radius: 20px;
		margin-left: 13px;
		margin-bottom: 12px;
		font-size: 12px;
	}
	.notificationIcon {
		margin-left: 15px;
		margin-top: 2px;
	}
	#signIn {
		margin-left: auto;
	}
	.dimBg {
		position: fixed;
		margin-top: -135px;
		height: 120%;
		width: 100%;
		background-color: black;
		z-index: 2;
		opacity: 0.5;
		transition: all 0.3s;
		display: none;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	a {
		text-decoration: none;
	}
	svg {
		fill: var(--textColor);
	}
	.topSpacer {
		width: 100%;
		height: 130px;
	}
	.sidebar {
		border-radius: 16px;
		position: fixed;
		display: flex;
		bottom: 8px;
		flex-direction: column;
		width: 65px;
		height: calc(100% - 73px);
		box-sizing: border-box;
		padding-top: 8px;
		z-index: 1;
		transition: all 0.3s;
		box-sizing: border-box;
		.sidebarIconWrapper {
			color: var(--textColor);
			text-decoration: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 65px;
		}
		hr {
			margin-top: auto;
			width: 90%;
			border-color: var(--color12);
			margin-bottom: 24px;
			opacity: 0;
		}
		#title1 {
			display: none;
		}
		p {
			font-size: 12px;
			margin-top: 8px;
			margin-bottom: 8px;
		}
	}
	.sidebarIcon {
		display: flex;
		margin-bottom: 2.5px;
	}
	.sidebar1 {
		overflow-x: hidden;
		background-color: var(--color23);
		border-radius: 16px;
		position: fixed;
		display: flex;
		bottom: 8px;
		flex-direction: column;
		width: 300px;
		height: calc(100% - 73px);
		box-sizing: border-box;
		padding-inline: 14px;
		padding-top: 8px;
		z-index: 2;
		transition: all 0.3s;
		overflow-x: hidden;
		#iconTitle {
			font-size: 10px;
			margin-top: 0;
			margin-bottom: 0;
			visibility: hidden;
		}
		#title1 {
			white-space: nowrap;
			width: 100%;
			overflow: hidden;
			text-overflow: clip;
		}
		#sidebarIcon {
			padding-inline: 16px;
			border-radius: 16px;
			display: flex;
			align-items: center;
			text-decoration: none;
			color: var(--textColor);
			transition: background-color 0.3s;
			p {
				margin-left: 12px;
				font-size: 14px;
				margin-top: 14px;
				margin-bottom: 14px;
			}
		}
		#sidebarIcon:hover {
			background-color: var(--color20);
			transition: background-color 0.3s;
		}
		hr {
			margin-top: auto;
			width: calc(100% - 10px);
			border: 1px solid rgb(56, 56, 56);
			margin-bottom: 24px;
		}
		.bottomPad {
			width: 100%;
			height: 8px;
		}
	}
	.menuIconWrapper {
		margin-left: 20px;
		padding: 4px;
		padding-inline: 8px;
		border-radius: 50%;
		transition: 0.15s;
	}
	.menuIconWrapper:hover {
		background-color: var(--color15);
	}
	.menuIconWrapper:active:hover {
		background-color: var(--color10);
	}
	.sidebarIconWrapper:hover {
		#sidebarIcon {
			background-color: var(--color20);
		}
		#iconTitle {
			opacity: 1;
		}
	}
	.hide {
		background-color: transparent;
		padding-inline: 10px;
		padding-top: 6px;
		padding-bottom: 3px;
		border-radius: 16px;
		transition: background-color 0.3s;
	}
	.hideText {
		opacity: 0;
		transition: opacity 0.3s;
		text-align: center;
	}
	.topBar1 {
		position: fixed;
		top: 0;
		left: 0;
		background-color: var(--color22);
		width: 100%;
		height: 60px;
		box-sizing: border-box;
		z-index: 3;
		display: flex;
		align-items: center;
		transition: background-color 0.3s;
		#menuIcon {
			margin-top: 3px;
		}
		#title {
			margin-left: 25px;
			font-weight: 600;
			margin-top: 0;
			margin-bottom: 0;
			color: var(--textColor);
		}
		.submitBtn {
			background-color: var(--color5);
			padding-inline: 24px;
			border-radius: 16px;
			margin-right: 26px;
			text-decoration: none;
			color: white;
			transition: 0.15s;
			margin-left: auto;
			p {
				margin-top: 8px;
				margin-bottom: 8px;
			}
		}
		.submitBtn:active:hover {
			background-color: var(--color3);
			transition: 0.15s;
		}
	}

	.topBar {
		position: fixed;
		top: 0;
		left: 0;
		background-color: transparent;
		width: 100%;
		height: 60px;
		box-sizing: border-box;
		z-index: 3;
		display: flex;
		align-items: center;
		transition: background-color 0.3s;
		#menuIcon {
			margin-top: 3px;
		}
		#title {
			margin-left: 25px;
			font-weight: 600;
			margin-top: 0;
			margin-bottom: 0;
			color: var(--textColor);
		}
		.submitBtn {
			background-color: var(--color5);
			padding-inline: 24px;
			border-radius: 16px;
			margin-right: 26px;
			text-decoration: none;
			color: white;
			transition: 0.15s;
			margin-left: auto;
			p {
				margin-top: 8px;
				margin-bottom: 8px;
			}
		}
		.submitBtn:active:hover {
			background-color: var(--color3);
			transition: 0.15s;
		}
	}
	.searchBox {
		background-color: var(--color19);
		border-radius: 8px;
		height: 55%;
		margin-left: auto;
		margin-right: 65px;
		width: 400px;
		input {
			border-radius: 8px;
			width: 100%;
			height: 100%;
			border-color: transparent;
			background-color: transparent;
			color: var(--textColor);
			box-sizing: border-box;
			padding-inline: 15px;
		}
	}
	.searchInput:focus + .searchRes {
		display: block;
	}
	.searchRes:hover {
		display: block;
	}
	.searchRes {
		display: none;
		position: fixed;
		background-color: var(--color19);
		width: 400px;
		box-sizing: border-box;
		padding-inline: 15px;
		margin-top: 10px;
		border-radius: 10px;
		overflow-y: scroll;
		max-height: 400px;
		a {
			color: var(--textColor);
			text-decoration: none;
			width: 100%;
		}
	}
	.dimBg {
		display: block;
		opacity: 0.5;
	}
	@media screen and (max-width: 1100px) {
		.sidebar {
			.sidebarIconWrapper {
				display: none;
			}
			width: 0;
		}
		#title {
			display: none;
		}
		.searchBox {
			width: calc(100% - 265px);
			height: 30px;
			left: 115px;
			transition: all 0.3s;
			position: fixed;
		}
		.searchRes {
			width: 100%;
			left: 0;
		}
	}
</style>
