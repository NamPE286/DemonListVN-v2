<script lang="ts">
	import { createClient } from "@supabase/supabase-js";
	import { userdata } from "./stores";
	import Title from "../components/widgets/Title.svelte";
	import ThemePicker from "../components/settings/ThemePicker.svelte";
	import SettingInput from "../components/settings/ImagePicker.svelte"
	import SliderPicker from "../components/settings/SliderPicker.svelte"
	import SettingToggle from "../components/settings/settingToggle.svelte";
	const supabase = createClient(import.meta.env.VITE_DATABASE_API_URL, import.meta.env.VITE_DATABASE_API_KEY);
	async function signOut() {
		window.location.reload();
		await supabase.auth.signOut();
	}
	
</script>
<head>
	<title>Settings - Demon List VN</title>
	<meta name='description' content='View and modify your preferences'>
</head>

<div class="pageContent">
<h1>Settings</h1>
    <div class="st_option">
		<ThemePicker name="Theme" />
		<SettingInput name="Background image" key='bg' />
		<SliderPicker name="BG opacity" key="opacity" />
		<SliderPicker name="BG blur" key="blur" />
		<SettingToggle name='Show discord widget' key='showDiscordWidget' defaultKey='true'/>
		<SettingToggle name="Minimize player's badges" key='badgeMinimized' defaultKey='false'/>
		{#if $userdata.metadata}
			<span class="submitBtn clickable" id="signIn" on:click={signOut}>
				<p>Sign Out</p>
			</span>
		{/if}
    </div>
</div>

<style lang="scss">
	.st_option {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: calc(100% - 64px);
		margin: 25px auto 0 auto;
	}
	.submitBtn {
		background-color: var(--color0);
		padding-inline: 24px;
		border-radius: 16px;
		text-decoration: none;
		color: var(--textColor);
		margin-left: auto;
		margin-right: 10px;
		margin-top: 25px;
		p {
			margin-top: 8px;
			margin-bottom: 8px;
		}
	}
    @media screen and (max-width: 1450px) {

	}
	@media screen and (max-width: 1100px) {

		.submitBtn{
			margin-left: auto;
			margin-right: auto;
			width: 80%;
			text-align: center;
		}
    }
</style>
