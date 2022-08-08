<script lang="ts">
    import { fade } from 'svelte/transition';
	import { createClient } from "@supabase/supabase-js";
	export var ifShow: boolean;
	export var uid;
	var submissions = []
	fetch(`https://demon-listv2-api.vercel.app/players/${uid}/submissions`)
		.then((response) => response.json())
		.then((data) => {
			submissions = data;
			console.log(data)
		});
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
	async function cancel(item, index){
		var { data, error } = await supabase
			.from('submissions')
			.delete()
			.match({id: item.id})
		console.log(data, error)
		submissions.splice(index, 1)
		submissions = submissions
	}

</script>

{#if ifShow}
<div out:fade="{{duration: 200}}" id='abcs'>
	<div
		class="dimBg"
		on:click={() => {
			ifShow = !ifShow;
		}}
        in:fade="{{duration: 150}}"
	/>
	<div
		style="display: flex; justify-content: center; align-items: center; transition: all 0.25s ease-in-out;"
		class="modalWrapper"
	>
		<div class="submitModal s_shadow">
			<div class="s_flexrow" style="align-items: flex-end;">
				<p class="s_title s_margin4">My submissions</p>
			</div>
			{#each submissions as item, index}
				<div class="submission">
					<a id='info' href={item.videoLink} target='_blank'><b id='levelName'>{item.levels.name}</b> <span id='levelID'>(ID: {item.levelid}) ({item.progress}% {item.refreshRate}hz)</span></a>
					<a id='cancel' href="#!" on:click={() => cancel(item, index)}>
						<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"/></svg>
					</a>
				</div>
			{/each}
			<div class="s_flexrow buttonWrapper" style="justify-content: flex-end;">
				<a href="#!" class="s_button2 s_margin5 s_red" on:click={() => {
					ifShow = !ifShow;
				}}>Close</a>
			</div>
		</div>
	</div>

</div>
{/if}

<style lang="scss">
	.dimBg {
		position: fixed;
		margin-top: -135px;
		height: 200%;
		width: 200%;
		background-color: black;
		z-index: 3;
		opacity: 0.5;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.modalWrapper {
		z-index: 3;
	}
	.submission{
		background-color: #2b2b2b;
		width: 80%;
		margin-inline: auto;
		border-radius: 20px;
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		#info{
			margin-left: 25px;
			padding-top: 18px;
			padding-bottom: 18px;
			color: white;
			text-decoration: none;
		}
		svg{
			filter: invert(1);
			margin-top: 8px;
		}
		#cancel{
			margin-left: auto;
			margin-right: 25px;
		}
	}
	button {
		border: none;
		color: white;
		a{
			text-decoration: none;
			color: white;
		}
	}
	.submitModal {
		position: fixed;
		top: 50%;
		background-color: #202020;
		width: 36%;
		border-radius: 48px;
		z-index: 3;
		transform: translateY(-50%);
	}
	.s_flexrow {
		display: flex;
		flex-direction: row;
	}
	.s_flexcol {
		display: flex;
		flex-direction: column;
	}
	.s_title {
		font-weight: 500;
		font-size: 42px;
	}
	.s_margin3 {
		margin: 32px 0px 24px 0px;
	}
	.s_margin4 {
		margin: 32px 16px 16px 52px;
	}
	.s_margin5 {
		margin: 16px 50px 24px 0px;
	}
	.s_margin6 {
		margin: 16px 16px 32px 0px;
	}
	.s_button {
		background-color: #2d2d2d;
		height: 28px;
		width: 125px;
		border-radius: 14px;
		font-weight: 350;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.3s;
		a{
			margin-left: 10px;
		}
		svg{
			filter: invert(1);
		}
	}
	.s_button:hover{
		background-color: #424242;
		transition: 0.3s;
	}
	.s_button:active:hover{
		background-color: #808080;
		transition: 0.15s;
	}
	.s_button2 {
		height: 36px;
		width: 96px;
		border-radius: 24px;
		color: #fff;
		font-weight: 350;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 400;
	}
	.s_input {
		background-color: #2d2d2d;
		width: calc(100% - 126px);
		border-radius: 10px;
		margin-bottom: 8px;
		padding: 16px 16px 16px 16px;
		border: none;
		color: #fff;
		font-family: "Roboto Flex", "Roboto", sans-serif;
		font-size: 16px;
		transition: all 0.25s ease-in-out;
	}
	.s_select {
		background-color: #2d2d2d;
		width: calc(100% - 96px);
		border-radius: 10px;
		margin-bottom: 8px;
		padding: 16px 16px 16px 12px;
		border: none;
		color: #fff;
		font-family: "Roboto Flex", "Roboto", sans-serif;
		font-size: 16px;
		transition: all 0.25s ease-in-out;
	}
	.s_input::placeholder {
		position: relative;
		font-family: "Roboto Flex", "Roboto", sans-serif;
		font-size: 16px;
	}
	.s_input:focus {
		outline: none;
		border: 0;
		background-color: #333333;
		transition: all 0.25s ease-in-out;
	}
	.s_select:focus {
		outline: none;
		border: 0;
		background-color: #333333;
		transition: all 0.25s ease-in-out;
	}
	.s_red {
		background-color: #f90000;
		transition: 0.3s;
	}
	.s_blue {
		background-color: #005ff9;
		transition: 0.3s;
	}
	.s_blue:active:hover{
		background-color: #0040a7;
		transition: 0.15s;
	}
	.s_shadow {
		box-shadow: 0px 0px 32px #000000;
	}
	@media screen and (max-width: 1250px) {
		.submitModal {
			width: 65%;
		}
	}
	@media screen and (max-width: 750px) {
		.submitModal {
			width: 95%;
		}
		.s_input {
			width: calc(100% - 66px);
		}
		.s_select {
			width: calc(100% - 36px);
		}
		.s_margin4 {
			margin: 32px 16px 16px 22px;
		}
		.s_margin5 {
			margin: 16px 22px 24px 0px;
		}
	}
</style>
