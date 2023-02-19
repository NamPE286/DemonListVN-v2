<script>
	import { userdata } from "./stores";
	import { createClient } from "@supabase/supabase-js";
	const supabase = createClient(
		import.meta.env.VITE_DATABASE_API_URL,
		import.meta.env.VITE_DATABASE_API_KEY
	);
	function getDate(timestamp) {
		return new Date(timestamp).toLocaleDateString("en-US");
	}
	function clearAll() {
		fetch(`${import.meta.env.VITE_BACKEND_API_URL}/notifications/${$userdata.metadata.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				token: supabase.auth.session().access_token
			})
		}).then((res) => {
			if (!res.ok) alert("An error occured");
			else window.location.reload()
		});
	}
</script>

<div class="pageContent">
	<h1>Notifications</h1>
	<button class="clickable" on:click={clearAll}>Clear all</button>
	{#each $userdata.notifications as item, index}
		<div class="notification">
			<p><b>{getDate(item.timestamp)}</b><br />{item.content}</p>
		</div>
	{/each}
</div>

<style lang="scss">
	button {
		border: none;
		color: var(--textColor);
		background-color: var(--color20);
		height: 30px;
		width: 80px;
		border-radius: 10px;
	}
	.notification {
		background-color: var(--color20);
		padding-inline: 20px;
		padding-top: 1px;
		padding-bottom: 1px;
		margin-top: 10px;
		border-radius: 10px;
	}
</style>
