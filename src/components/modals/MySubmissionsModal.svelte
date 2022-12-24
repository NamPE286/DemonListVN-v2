<script lang="ts">
	import { fade } from "svelte/transition";
	import { createClient } from "@supabase/supabase-js";
	export var ifShow: boolean;
	export var uid;
	var submissions = [];
	var hasSubmission = true
	fetch(`https://api.vnpower.tech/player/${uid}/submissions`)
		.then((response) => response.json())
		.then((data) => {
			submissions = data;
			hasSubmission = submissions.length != 0
		});
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
	async function cancel(item, index) {
		if(confirm('Cancel submission?')){
			var { data, error } = await supabase.from("records").delete().match({ userid: item.userid, levelid: item.levelid });
			submissions.splice(index, 1);
			submissions = submissions;
		}
	}
</script>

{#if ifShow}
	<div out:fade={{ duration: 200 }} id="abcs">
		<div
			class="dimBg"
			on:click={() => {
				ifShow = !ifShow;
			}}
			in:fade={{ duration: 150 }}
		/>
		<div
			style="display: flex; justify-content: center; align-items: center; transition: all 0.25s ease-in-out;"
			class="modalWrapper"
		>
			<div class="submitModal s_shadow">
				<div class="s_flexrow" style="align-items: flex-end;">
					<p class="s_title s_margin4">My submissions</p>
				</div>
				{#if hasSubmission}
					<div class="allSubmission">
						{#each submissions as item, index}
							<div class="submission">
								<a id="info" href={item.videoLink} target="_blank"
									><b id="levelName">{item.levels.name}</b>
									<span id="levelID"
										>(ID: {item.levelid}) ({item.progress}% {item.refreshRate}hz)</span
									></a
								>
								<span id="cancel" class="clickable" on:click={() => cancel(item, index)}>
									<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
										><path
											d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"
										/></svg
									>
								</span>
							</div>
						{/each}
					</div>
				{/if}
				{#if !hasSubmission}
					<div class='noSubmissionTextWrapper'>
						<p class='noSubmissionText'>No submission</p>
					</div>
				{/if}
				<div class="s_flexrow buttonWrapper" style="justify-content: flex-end;">
					<span
						class="s_button2 s_margin5 s_red clickable"
						on:click={() => {
							ifShow = !ifShow;
						}}>Close</span
					>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.noSubmissionTextWrapper{
		display: flex;
	}
	.noSubmissionText{
		color: gray;
		margin-inline: auto;
	}
	.allSubmission {
		max-height: 500px;
		overflow-y: scroll;
	}
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
	.submission {
		background-color: var(--color21);
		width: 80%;
		margin-inline: auto;
		border-radius: 20px;
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		#info {
			margin-left: 25px;
			padding-top: 18px;
			padding-bottom: 18px;
			color: var(--color6);
			text-decoration: none;
		}
		svg {
			margin-top: 8px;
		}
		#cancel {
			margin-left: auto;
			margin-right: 25px;
			svg{
				fill: var(--color6);
			}
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
	.s_red {
		background-color: var(--color1);
		transition: 0.3s;
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
		.s_margin4 {
			margin: 32px 16px 16px 22px;
		}
		.s_margin5 {
			margin: 16px 22px 24px 0px;
		}
	}
</style>
