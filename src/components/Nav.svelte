<script lang="ts">
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";
	import Modal from "./Modal.svelte";
	import NameModal from "./NameModal.svelte";
	async function addUser(user1) {
		var { data, error } = await supabase.from("players").select("uid, name").eq("uid", user1.id);
		if (data.length == 0) {
			var { data, error } = await supabase.from("players").insert({
				uid: user.id,
				name: "/defaultplayers/",
				email: user1.email,
				country:'VI'
			});
			ifShowNameInput = true;
		} else {
			if (data[0].name == "/defaultplayers/") {
				ifShowNameInput = true;
			}
		}
	}
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
	var user;
	var uid;
	supabase.auth.onAuthStateChange((_, session) => {
		user = session.user;
		uid = user.id
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

	var searchValue = ''
	var tOut = []
	var searchRes = []
	var searchPlayerRes = []
	var isTyping = false
	function typingAction(){
		isTyping = true
		for (var i=0; i < tOut.length; i++) {
			clearTimeout(tOut[i]);
		}
		tOut = []
		tOut.push(setTimeout(()=>{
			if(searchValue.length) fetch(`https://seademonlist-api.vercel.app/search/${searchValue}`)
				.then((response) => response.json())
				.then((data) => {
					searchRes = data[0]
					searchPlayerRes = data[1]
					isTyping = false
				});
		},400));
	}
</script>

<div class={ifOntop ? "topBar" : "topBar1"}>
	<a href="#!" class="menuIconWrapper" on:click={toggleMenu}>
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
	</a>
	<a id="title" href='/'>Demon List VN</a>
	<input autocomplete="false" class='searchBox' placeholder='Search' id='hideRes' bind:value={searchValue} on:input={typingAction} >
	{#if (searchRes.length && searchValue.length) && !isTyping || ((searchPlayerRes.length && searchValue.length) && !isTyping)}
		<div class="searchRes">
			{#each searchRes as item, index}
				<a href={`/level?id=${item.id}`} on:click={() => searchValue = ''}><br><b>{item.name}</b> by {item.creator}</a><br>
			{/each}
			{#each searchPlayerRes as item, index}
				<a href={`/player?id=${item.id}`} on:click={() => searchValue = ''}><br><b>{item.name}</b></a><br>
			{/each}
			<br>
		</div>
	{/if}
	{#if (!searchRes.length && !searchPlayerRes.length && searchValue.length) && !isTyping}
		<div class="searchRes">
				<a href='#!' on:click={() => searchValue = ''}><br><b>No result</a><br>
			<br>
		</div>
	{/if}
	{#if uid && !forceSignIn}
		<a href="#!" class="signOut" on:click={signOut}>Sign out</a>
		<a class="submitBtn" href="#!" on:click={openModal}>
			<p>Submit</p>
		</a>
	{/if}
	{#if !uid || forceSignIn}
		<a class="submitBtn" id="signIn" href="#!" on:click={signIn}>
			<p>Sign In</p>
		</a>
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
	<a href="/" class="sidebarIconWrapper">
		<div class='hide' id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M13 9V3h8v6ZM3 13V3h8v10Zm10 8V11h8v10ZM3 21v-6h8v6Zm2-10h4V5H5Zm10 8h4v-6h-4Zm0-12h4V5h-4ZM5 19h4v-2H5Zm4-8Zm6-4Zm0 6Zm-6 4Z"/></svg>			</div>
			<p id="title1">Dashboard</p>
		</div>
		<p class='hideText' id="iconTitle">Dashboard</p>
	</a>
	<a href="/DL" class="sidebarIconWrapper">
		<div class='hide' id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
					><path
						d="M8 17q.425 0 .713-.288Q9 16.425 9 16t-.287-.713Q8.425 15 8 15t-.713.287Q7 15.575 7 16t.287.712Q7.575 17 8 17Zm0-4q.425 0 .713-.288Q9 12.425 9 12t-.287-.713Q8.425 11 8 11t-.713.287Q7 11.575 7 12t.287.712Q7.575 13 8 13Zm0-4q.425 0 .713-.288Q9 8.425 9 8t-.287-.713Q8.425 7 8 7t-.713.287Q7 7.575 7 8t.287.712Q7.575 9 8 9Zm3 8h6v-2h-6Zm0-4h6v-2h-6Zm0-4h6V7h-6ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14ZM5 5v14V5Z"
					/></svg
				>
			</div>
			<p id="title1">Demon List</p>
		</div>
		<p class='hideText' id="iconTitle">Demon List</p>
	</a>
	<a href="/FL" class="sidebarIconWrapper">
		<div class='hide' id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z"/></svg>
			</div>
			<p id="title1">Featured List</p>
		</div>
		<p class='hideText' id="iconTitle">Featured List</p>
	</a>
	<hr />
	{#if uid}
	<a href={`#!`} class="sidebarIconWrapper" on:click={() => window.location.replace(`/player?id=${uid}`)}>
		<div class='hide' id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5.85 17.1q1.275-.975 2.85-1.538Q10.275 15 12 15q1.725 0 3.3.562 1.575.563 2.85 1.538.875-1.025 1.363-2.325Q20 13.475 20 12q0-3.325-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12q0 1.475.488 2.775.487 1.3 1.362 2.325ZM12 13q-1.475 0-2.488-1.012Q8.5 10.975 8.5 9.5t1.012-2.488Q10.525 6 12 6t2.488 1.012Q15.5 8.025 15.5 9.5t-1.012 2.488Q13.475 13 12 13Zm0 9q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q1.325 0 2.5-.387 1.175-.388 2.15-1.113-.975-.725-2.15-1.113Q13.325 17 12 17t-2.5.387q-1.175.388-2.15 1.113.975.725 2.15 1.113Q10.675 20 12 20Zm0-9q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075Q12.65 8 12 8q-.65 0-1.075.425Q10.5 8.85 10.5 9.5q0 .65.425 1.075Q11.35 11 12 11Zm0-1.5Zm0 9Z"/></svg>
			</div>
			<p id="title1">Profile</p>
		</div>
		<p class='hideText' id="iconTitle">Profile</p>
	</a>
	{/if}
	<a href="/settings" class="sidebarIconWrapper">
		<div class='hide' id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
					><path
						d="m9.25 22-.4-3.2q-.325-.125-.612-.3-.288-.175-.563-.375L4.7 19.375l-2.75-4.75 2.575-1.95Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337L1.95 9.375l2.75-4.75 2.975 1.25q.275-.2.575-.375.3-.175.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3.287.175.562.375l2.975-1.25 2.75 4.75-2.575 1.95q.025.175.025.337v.675q0 .163-.05.338l2.575 1.95-2.75 4.75-2.95-1.25q-.275.2-.575.375-.3.175-.6.3l-.4 3.2Zm2.8-6.5q1.45 0 2.475-1.025Q15.55 13.45 15.55 12q0-1.45-1.025-2.475Q13.5 8.5 12.05 8.5q-1.475 0-2.488 1.025Q8.55 10.55 8.55 12q0 1.45 1.012 2.475Q10.575 15.5 12.05 15.5Zm0-2q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588.662-.387 1.212-.937l2.475 1.025.975-1.7-2.15-1.625q.125-.35.175-.738.05-.387.05-.787t-.05-.788q-.05-.387-.175-.737l2.15-1.625-.975-1.7-2.475 1.05q-.55-.575-1.212-.963-.663-.387-1.438-.587L13 4h-1.975l-.35 2.65q-.775.2-1.437.587-.663.388-1.213.938L5.55 7.15l-.975 1.7 2.15 1.6q-.125.375-.175.75-.05.375-.05.8 0 .4.05.775t.175.75l-2.15 1.625.975 1.7 2.475-1.05q.55.575 1.213.962.662.388 1.437.588Z"
					/></svg
				>
			</div>
			<p id="title1">Settings</p>
		</div>
		<p class='hideText' id="iconTitle">Settings</p>
	</a>
	<a href="/about" class="sidebarIconWrapper">
		<div class='hide' id="sidebarIcon">
			<div class="sidebarIcon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
					><path
						d="M11 17h2v-6h-2Zm1-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"
					/></svg
				>
			</div>
			<p id="title1">About</p>
		</div>
		<p class='hideText' id="iconTitle">About</p>
	</a>
	<div class="bottomPad" />
</div>
<Modal bind:ifShow={submitClicked} />
{#if user}
	<NameModal bind:ifShow={ifShowNameInput} uid={user.id} />
{/if}

<style lang="scss">
	#signIn {
		margin-left: auto;
	}
	.signOut {
		color: #f90000;
		margin-left: auto;
		margin-right: 25px;
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
		filter: invert(1);
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
		transition: all 0.2s ease-out;
		box-sizing: border-box;
		.sidebarIconWrapper {
			color: white;
			text-decoration: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 65px;
		}
		hr {
			margin-top: auto;
			width: 90%;
			border-color: #707070;
			margin-bottom: 24px;
			opacity: 0;
		}
		#title1 {
			display: none;
		}
		.barItem {
			background-color: #2e2e2e;
			padding-inline: 10px;
			padding-top: 6px;
			padding-bottom: 2px;
			border-radius: 16px;
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
		background-color: #202020;
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
		box-shadow: 0 0 15px rgb(9, 9, 9);
		transition: all 0.2s ease-out;
		overflow-x: hidden;
		#iconTitle {
			font-size: 10px;
			margin-top: 0;
			margin-bottom: 0;
			visibility: hidden;
		}
		.barItem {
			background-color: #2e2e2e;
		}
		#title1{
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
			color: white;
			transition: background-color 0.3s;
			p {
				margin-left: 12px;
				font-size: 14px;
				margin-top: 14px;
				margin-bottom: 14px;
			}
		}
		#sidebarIcon:hover {
			background-color: #2e2e2e;
			transition: background-color 0.3s;
		}
		hr {
			margin-top: auto;
			width: calc(100% - 10px);
			border-color: #525252;
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
		background-color: #424242;
	}
	.menuIconWrapper:active:hover {
		background-color: gray;
	}
	.sidebarIconWrapper:hover {
		#sidebarIcon {
			background-color: #2e2e2e;
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
		background-color: #272727;
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
			color: white;
		}
		.submitBtn {
			background-color: #005ff9;
			padding-inline: 24px;
			border-radius: 16px;
			margin-right: 26px;
			text-decoration: none;
			color: white;
			transition: 0.15s;
			p {
				margin-top: 8px;
				margin-bottom: 8px;
			}
		}
		.submitBtn:active:hover {
			background-color: #003996;
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
			color: white;
		}
		.submitBtn {
			background-color: #005ff9;
			padding-inline: 24px;
			border-radius: 16px;
			margin-right: 26px;
			text-decoration: none;
			color: white;
			transition: 0.15s;
			p {
				margin-top: 8px;
				margin-bottom: 8px;
			}
		}
		.submitBtn:active:hover {
			background-color: #003996;
			transition: 0.15s;
		}
	}
	.searchBox{
		background-color: #2d2d2d;
		border-color: transparent;
		border-radius: 8px;
		height: 55%;
		margin-left: auto;
		width: 400px;
		box-sizing: border-box;
		padding-inline: 15px;
		color: white;
	}
	.searchRes{
		position: fixed;
		left: calc(50% - 207.5px);
		top: 60px;
		background-color: #2d2d2d;
		width: 400px;
		border-radius: 8px;
		box-sizing: border-box;
		padding-inline: 15px;
		a{
			color: white;
			text-decoration: none;
			width: 100%;
		}
	}
	@media screen and (max-width: 1580px) {
		.dimBg {
			display: block;
			opacity: 0.5;
		}
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
		.searchBox{
			width: calc(100% - 300px);
			height: 30px;
			left: 75px;
			transition: all 0.3s;
			position: fixed;
		}
		.searchBox:focus{
			transform: translateX(-70px);
			width: calc(100% - 10px);
			height: 50px;
		}
		.searchRes{
			width: 100%;
			left: 0;
		}
	}
</style>
