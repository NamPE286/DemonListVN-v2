<script>
	import { createClient } from "@supabase/supabase-js";
	import Title from "../../components/widgets/Title.svelte";
	import { userdata } from "../stores";
	const supabase = createClient(import.meta.env.VITE_DATABASE_API_URL, import.meta.env.VITE_DATABASE_API_KEY);
	var from = '', to = ''
	async function merge() {
		console.log('ok')
		await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/mergeAccount/${from}/${to}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				token: supabase.auth.session().access_token
			})
		});
	}
</script>

{#if $userdata.data.isAdmin}
	<div class="pageContent">
		<Title title="Merge Account" description="" />
		<input type="text" placeholder="From (uid)" bind:value={from}>
		<input type="text" placeholder="To (uid)" bind:value={to}>
		<button on:click={merge}>Merge</button>
	</div>
{/if}