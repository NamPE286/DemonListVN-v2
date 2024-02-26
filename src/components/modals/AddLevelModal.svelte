<script lang="ts">
    import { fade } from 'svelte/transition';
	import { createClient } from "@supabase/supabase-js";
	export var ifShow: boolean;
	var level = {
		id: null,
		name: null,
		creator: null,
		videoID: null,
		minProgress: null,
		flTop: null,
		rating: null,
		ldm: []
	}
	var ldmString = ''
	const supabase = createClient(import.meta.env.VITE_DATABASE_API_URL, import.meta.env.VITE_DATABASE_API_KEY);
	async function apply(){
		var temp = ldmString.split(' ')
		var temp1 = []
		for(const i of temp) temp1.push(parseInt(i))
		level.ldm = temp1
		fetch(`${import.meta.env.VITE_BACKEND_API_URL}/level/${level.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: supabase.auth.session().access_token,
				data: level
			})
		})
			.then((res) => {
				if(res.ok){
					alert('Level added')
					window.location.reload()
				}
				else alert('An error occured')
			})
	}
	function cancel(){
		ifShow = false
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
				<p class="s_title s_margin4">Edit level info</p>
			</div>
			<div class="s_flexcol" style="align-items: center;">
				<input class="s_input" placeholder="Level ID" bind:value={level.id} type="number"/>
				<input class="s_input" placeholder="Level name" bind:value={level.name} />
				<input class="s_input" placeholder="Creator" bind:value={level.creator} />
				<input class="s_input" placeholder="Video ID" bind:value={level.videoID}/>
				<input class="s_input" placeholder="Minimum Progress" bind:value={level.minProgress} type='number'/>
				<input class="s_input" placeholder="Featured List Top (leave blank for null)" bind:value={level.flTop} type='number'/>
				<input class="s_input" placeholder="Demon List Rating (leave blank for null)" bind:value={level.rating} type='number'/>
				<input class="s_input" placeholder="LDM (seperated by space)" bind:value={ldmString} type='text'/>
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
				}}>Apply</span>
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
	.s_margin4 {
		margin: 32px 16px 16px 52px;
	}
	.s_margin5 {
		margin: 16px 50px 24px 0px;
	}
	.s_margin6 {
		margin: 16px 16px 32px 0px;
	}
	.s_button2 {
		height: 36px;
		width: 96px;
		border-radius: 24px;
		color: var(--textColor);
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
		color: var(--textColor);
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
		.s_margin4 {
			margin: 32px 16px 16px 22px;
		}
		.s_margin5 {
			margin: 16px 22px 24px 0px;
		}
	}
</style>
