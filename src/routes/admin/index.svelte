<script>
    import { createClient } from "@supabase/supabase-js";
	import Title from "../../components/widgets/Title.svelte";
	import { userdata } from "../stores";
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
	var a = 'Refresh list'
	async function refreshList(){
		a = 'Refreshing...'
		const res = await (
					await fetch(`https://api.vnpower.tech/refreshList`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							token: supabase.auth.session().access_token
						})
					})
				).json();
	}
</script>
{#if $userdata.data.isAdmin}
	<div class="pageContent">
		<Title title="Admin" description="" />
		<button class='refreshList' on:click={refreshList}>{a}</button><br>
		<span>Submit checker: </span>
		<a href='/admin/submitChecker'>All</a>
		<a href='/admin/submitChecker/DL'>DL</a>
		<a href='/admin/submitChecker/FL'>FL</a><br>
		<a href='/admin/allPlayer'>New levels</a><br>
		<a href='/admin/allPlayer'>Player manager</a>
	</div>
{/if}
<style lang="scss">
	.refreshList{
		margin-top: 50px;
		height: 25px;
		width: 100px;
	}
</style>