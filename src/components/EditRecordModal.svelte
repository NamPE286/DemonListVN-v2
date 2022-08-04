<script lang="ts">
    import { fade } from 'svelte/transition';
	import { createClient } from "@supabase/supabase-js";
	export var ifShow: boolean;
	export var player;
	export var level;
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
	var a = level
	async function apply(){
		a.timestamp = Date.now()
		a.userid = player.data.uid
		var { data, error } = await supabase
			.from('records')
			.update(a)
			.match({id: level.id})
		a = {
			levelid: level.levelid,
			userid: level.userid,
			videoLink: level.videoLink,
			refreshRate: level.refreshRate,
			mobile:false,
			progress: level.progress,
			timestamp: level.timestamp
		}
		if(error){
			console.log(error)
			return
		}
		var { data, error} = await supabase.rpc('updateRank')
		alert('Successfully updated')
		window.location.reload()
	}
	function cancel(){
		ifShow = !ifShow;
		a = level
	}
	function update(){
		a = level
		return ''
	}
</script>

{#if ifShow}
{update()}
<div out:fade="{{duration: 200}}" id='abcs'>
	<div
		class="dimBg"
		on:click={() => {
			cancel()
		}}
        in:fade="{{duration: 150}}"
	/>
	<div
		style="display: flex; justify-content: center; align-items: center; transition: all 0.25s ease-in-out;"
		class="modalWrapper"
	>
		<div class="submitModal s_shadow">
			<div class="s_flexrow" style="align-items: flex-end;">
				<p class="s_title s_margin4">Edit record</p>
			</div>
			<div class="s_flexcol" style="align-items: center;">
				<input class="s_input" placeholder="Video Link" bind:value={a.videoLink}/>
				<select class="s_select" placeholder='Device' bind:value={a.mobile}>
					<option value={false}>Desktop</option>
					<option value={true}>Mobile</option>
				</select>
				<input class="s_input" placeholder="Refresh rate" bind:value={a.refreshRate} />
				<input class="s_input" placeholder="Progress" bind:value={a.progress}/>
			</div>
			<div class="s_flexrow buttonWrapper" style="justify-content: flex-end;">
				<a
					href="#!"
					class="s_button2 s_margin6 s_red"
					on:click={() => {
						cancel()
					}}>Cancel</a
				>
				<a href="#!" class="s_button2 s_margin5 s_blue" on:click={() => {
					apply()
				}}>Edit</a>
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
