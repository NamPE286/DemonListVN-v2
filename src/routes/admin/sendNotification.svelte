<script>
	import { createClient } from "@supabase/supabase-js";
	import Title from "../../components/widgets/Title.svelte";
	import { userdata } from "../stores";
	const supabase = createClient(import.meta.env.VITE_DATABASE_API_URL, import.meta.env.VITE_DATABASE_API_KEY);
	var content = '', to = ''
	async function merge() {
		console.log('ok')
		await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/notifications/${to}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				data: {
					to: to,
					content: content
				},
				token: supabase.auth.session().access_token
			})
		});
		alert('Sent')
	}
</script>

{#if $userdata.data.isAdmin}
	<div class="pageContent">
		<Title title="Notification" description="" />
		<input type="text" placeholder="To (uid)" bind:value={to}>
		<input type="text" placeholder="Content" bind:value={content}>
		<button on:click={merge}>Send</button>
	</div>
{/if}