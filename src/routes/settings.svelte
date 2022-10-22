<script lang="ts">
	import { createClient } from "@supabase/supabase-js";
	import { userdata } from "./stores";
	import Title from "../components/widgets/Title.svelte";
	//import Selector from "../components/Selector.svelte";
	import SettingInput from "../components/settings/ImagePicker.svelte"
	import SliderPicker from "../components/settings/SliderPicker.svelte"
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
	async function signOut() {
		window.location.reload();
		const { error } = await supabase.auth.signOut();
	}
	console.log($userdata)
</script>
<head>
	<title>Settings - Demon List VN</title>
	<meta name='description' content='View and modify your preferences'>
</head>
<div class="pageContent">
    <Title title="Settings" description="View and modify your preferences" />
    <div class="st_option">
		<SettingInput name="Background image" key='bg' />
		<SliderPicker name="BG opacity" key="opacity" />
		<SliderPicker name="BG blur" key="blur" />
		{#if $userdata.metadata}
			<a class="submitBtn" id="signIn" href="#!" on:click={signOut}>
				<p>Sign Out</p>
			</a>
		{/if}
		<!-- <Selector name="Dark theme" isToggled /> -->
    </div>
</div>

<style lang="scss">
    .pageContent {
		width: 60%;
		margin-inline: auto;
		margin-bottom: 100px;
    }
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
		color: white;
		margin-left: auto;
		margin-right: 10px;
		margin-top: 25px;
		p {
			margin-top: 8px;
			margin-bottom: 8px;
		}
	}
    @media screen and (max-width: 1450px) {
		.pageContent {
			width: 80%;
		}
	}
	@media screen and (max-width: 1100px) {
		.pageContent {
			width: 90%;
		}
		.submitBtn{
			margin-left: auto;
			margin-right: auto;
			width: 80%;
			text-align: center;
		}
    }
</style>
