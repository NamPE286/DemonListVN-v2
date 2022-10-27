<script lang="ts">
	import { fade } from "svelte/transition";
	import { userdata } from "../../routes/stores";
	import { createClient } from "@supabase/supabase-js";
	import imageCompression from "browser-image-compression";
	var user;
	var user1;
	var fileinput;
	var uploadText = 'Upload avatar'
	userdata.subscribe((value) => {
		user = value;
		user1 = JSON.parse(JSON.stringify(value));
	});
	export var ifShow: boolean;
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
	async function apply() {
		document.body.style.cursor = "wait";
		const a = {
			name: user.data.name,
			youtube: user.data.youtube,
			facebook: user.data.facebook,
			discord: user.data.discord,
			isHidden: user.data.isHidden
		};
		try {
			for (const i in a) {
				if (i != "name" && i != "isHidden") {
					var s = a[i].split(" ");
					var s1 = "";
					for (const j in s) {
						s1 += s[j];
					}
					a[i] = s1;
				}
			}
		} catch {}
		fetch(`https://seademonlist-api.vercel.app/player/${user.metadata.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				token: supabase.auth.session().access_token,
				data: a
			})
		}).then(async (res) => {
			document.body.style.cursor = "default";
			if (res.ok) {
				alert("Profile updated!");
				window.location.reload();
			} else alert("An error occured");
		});
	}
	function cancel() {
		user = JSON.parse(JSON.stringify(user1));
	}
	function getImage(e) {
		let image = e.target.files[0];
		const options = {
			maxSizeMB: 0.035,
			maxWidthOrHeight: 480,
			useWebWorker: true
		};
		uploadText = 'Compressing image...'
		imageCompression(image, options).then(async (cImg) => {
			var { data, error } = await supabase.storage
				.from("avatars")
				.upload(`/${$userdata.metadata.id}.jpg`, cImg, {
					cacheControl: "0",
					upsert: true
				});
			if(error) uploadText = 'An error ocurred'
			else {
				uploadText = 'Avatar uploaded! (refreshing page)'
				window.location.reload()
			}
		});
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
					<p class="s_title s_margin4">Edit profile</p>
				</div>
				<div class="s_flexcol" style="align-items: center;">
					<input class="s_input" id="name" bind:value={user.data.name} />
					<button
						class="s_input1"
						id="avatar"
						placeholder="Avatar"
						on:click={() => {
							fileinput.click();
						}}>{uploadText}</button
					>
					<input
						style="display:none"
						type="file"
						accept=".jpg, .jpeg"
						on:change={(e) => getImage(e)}
						bind:this={fileinput}
					/>
					<input
						class="s_input"
						id="youtube"
						placeholder="Youtube Link"
						bind:value={user.data.youtube}
					/>
					<input
						class="s_input"
						id="facebook"
						placeholder="Facebook Link"
						bind:value={user.data.facebook}
					/>
					<input
						class="s_input"
						id="discord"
						placeholder="Discord tag"
						bind:value={user.data.discord}
					/>
					{#if !user.data.isHidden}
						<button
							class="hideBtn"
							on:click={() => {
								if (
									confirm(
										"By continue, your profile will be:\n- Hidden from top player.\n- Hidden from search result.\n- You will not be able to see your rank.\n- All of your records will be hidden (won't be deleted).\n- You're still be able to submit new record.\nDo you wish to proceed?"
									)
								) {
									user.data.isHidden = true;
									apply();
								}
							}}>Make my profile hidden</button
						>
					{/if}
					{#if user.data.isHidden}
						<button
							class="hideBtn1"
							on:click={() => {
								user.data.isHidden = false;
								apply();
							}}>Make my profile visible</button
						>
					{/if}
				</div>
				<div class="s_flexrow buttonWrapper" style="justify-content: flex-end;">
					<a
						href="#!"
						class="s_button2 s_margin6 s_red"
						on:click={() => {
							ifShow = !ifShow;
							cancel();
						}}>Cancel</a
					>
					<a
						href="#!"
						class="s_button2 s_margin5 s_blue"
						on:click={() => {
							apply();
						}}>Apply</a
					>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.hideBtn {
		height: 60px;
		width: calc(100% - 90px);
		border-radius: 15px;
		background-color: red;
		color: var(--color6);
		font-size: 15px;
		font-weight: 600;
	}
	.hideBtn1 {
		height: 60px;
		width: calc(100% - 90px);
		border-radius: 15px;
		background-color: rgb(0, 233, 31);
		color: var(--color6);
		font-size: 15px;
		font-weight: 600;
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
	.s_input1 {
		background-color: var(--color19);
		width: calc(100% - 95px);
		border-radius: 10px;
		margin-bottom: 8px;
		padding: 16px 16px 16px 16px;
		border: none;
		color: var(--color6);
		font-family: "Roboto Flex", "Roboto", sans-serif;
		font-size: 16px;
		transition: all 0.1s ease-in-out;
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
	.s_input1:active {
		outline: none;
		border: 0;
		background-color: var(--color18);
	}

	.s_red {
		background-color: var(--color1);
		transition: 0.3s;
	}
	.s_blue {
		background-color: var(--color5);
		transition: 0.3s;
	}
	.s_blue:active:hover {
		background-color: var(--color4);
		transition: 0.15s;
	}
	.s_shadow {
		box-shadow: 0px 0px 32px var(--color25);
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
		.hideBtn {
			width: calc(100% - 30px);
		}
		.hideBtn1 {
			width: calc(100% - 30px);
		}
	}
</style>
