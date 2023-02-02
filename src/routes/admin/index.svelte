<script>
	import { createClient } from "@supabase/supabase-js";
	import Title from "../../components/widgets/Title.svelte";
	import { userdata } from "../stores";
	const supabase = createClient(import.meta.env.VITE_DATABASE_API_URL, import.meta.env.VITE_DATABASE_API_KEY);
	var a = "Refresh list";
	async function refreshList() {
		a = "Refreshing...";
		await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/refreshList`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				token: supabase.auth.session().access_token
			})
		});
		a = "Refreshed!"
	}
</script>

{#if $userdata.data.isAdmin}
	<div class="pageContent">
		<Title title="Admin" description="" />
		<button class="refreshList" on:click={refreshList}>{a}</button><br />
		<span>Submit checker: </span>
		<a href="/admin/submitChecker">All</a>
		<a href="/admin/submitChecker/DL">DL</a>
		<a href="/admin/submitChecker/FL">FL</a><br />
		<a href="/admin/newLevel">New levels</a><br />
		<a href="/admin/allPlayer">Player manager</a>
		<a href="/admin/mergeAccount">Merge Account</a>
	</div>
{/if}

<style lang="scss">
	.refreshList {
		margin-top: 50px;
		height: 25px;
		width: 100px;
	}
</style>
