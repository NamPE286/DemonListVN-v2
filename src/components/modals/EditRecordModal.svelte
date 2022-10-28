<script lang="ts">
    import { fade } from 'svelte/transition';
	import { createClient } from "@supabase/supabase-js";
	export var ifShow: boolean;
	export var player;
	export var level;
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
	var a = level
	async function apply(){
		const b = new Date(a.timestamp)
		a.timestamp = b.getTime()
		a.userid = player.uid
		delete a.levels
		delete a.players
		fetch(`https://seademonlist-api.vercel.app/record`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: supabase.auth.session().access_token,
				data: a
			})
		})
			.then((res) => {
				if(res.ok){
					alert('Successfully updated')
					window.location.reload()
				}
				else{
					alert("An error occured")
				}
			})
	}
	function cancel(){
		ifShow = !ifShow;
		a = level
	}
	function update(){
		a = level
		var b = new Date(a.timestamp)
		var c = b.toISOString()
		var d = c.split('T')
		a.timestamp = d[0]
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
				<input class="s_input" placeholder="Refresh rate" bind:value={a.refreshRate} type='number'/>
				<input class="s_input" placeholder="Progress" bind:value={a.progress} type='number'/>
				<input class="s_input" placeholder="Timestamp" bind:value={a.timestamp} type="date"/>
			</div>
			<div class="s_flexrow buttonWrapper" style="justify-content: flex-end;">
				<span
					class="s_button2 s_margin6 s_red clickable"
					on:click={() => {
						cancel()
					}}>Cancel</span
				>
				<span class="s_button2 s_margin5 s_blue clickable" on:click={() => {
					apply()
				}}>Edit</span>
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
		color: var(--color6);
		a{
			text-decoration: none;
			color: var(--color6);
		}
	}
	.submitModal {
		position: fixed;
		top: 50%;
		background-color: var(--color23);
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
		background-color: var(--color19);
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
			
		}
	}
	.s_button:hover{
		background-color: var(--color15);
		transition: 0.3s;
	}
	.s_button:active:hover{
		background-color: var(--color10);
		transition: 0.15s;
	}
	.s_button2 {
		height: 36px;
		width: 96px;
		border-radius: 24px;
		color: var(--color6);
		font-weight: 350;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 400;
	}
	.s_input {
		background-color: var(--color19);
		width: calc(100% - 126px);
		border-radius: 10px;
		margin-bottom: 8px;
		padding: 16px 16px 16px 16px;
		border: none;
		color: var(--color6);
		font-family: "Roboto Flex", "Roboto", sans-serif;
		font-size: 16px;
		transition: all 0.25s ease-in-out;
	}
	.s_select {
		background-color: var(--color19);
		width: calc(100% - 96px);
		border-radius: 10px;
		margin-bottom: 8px;
		padding: 16px 16px 16px 12px;
		border: none;
		color: var(--color6);
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
		background-color: var(--color18);
		transition: all 0.25s ease-in-out;
	}
	.s_select:focus {
		outline: none;
		border: 0;
		background-color: var(--color18);
		transition: all 0.25s ease-in-out;
	}
	.s_red {
		background-color: var(--color1);
		transition: 0.3s;
	}
	.s_blue {
		background-color: var(--color5);
		transition: 0.3s;
	}
	.s_blue:active:hover{
		background-color: var(--color4);
		transition: 0.15s;
	}
	.s_shadow {
		box-shadow: 0px 0px 32px black;
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
