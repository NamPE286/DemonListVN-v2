<script>
	import { createClient } from "@supabase/supabase-js";
	import Title from "../../../components/widgets/Title.svelte";
	import { userdata } from "../../stores";
	const supabase = createClient(
		import.meta.env.VITE_DATABASE_API_URL,
		import.meta.env.VITE_DATABASE_API_KEY
	);
	var submissions = [];
	async function getData() {
		var { data, error } = await supabase
			.from("records")
			.select("*, levels!inner(name, flTop, minProgress), players!inner(name, uid)")
			.not("levels.flTop", "is", null)
			.eq("progress", 100)
			.eq("isChecked", false)
			.order("timestamp", { ascending: true });
		submissions = data;
	}
	getData();
	async function reject(item, index) {
		submissions.splice(index, 1);
		submissions = submissions;
		fetch(`${import.meta.env.VITE_BACKEND_API_URL}/record/${item.userid}/${item.levelid}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				token: supabase.auth.session().access_token
			})
		});
	}
	async function accept(item, index) {
		submissions.splice(index, 1);
		submissions = submissions;
		item.isChecked = true;
		fetch(`${import.meta.env.VITE_BACKEND_API_URL}/record`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				token: supabase.auth.session().access_token,
				data: item
			})
		});
	}
	function ifMobile(item) {
		if (item.mobile) return "Mobile ";
		return "";
	}
</script>

{#if $userdata.data.isAdmin}
	<div class="pageContent">
		<Title
			title="Submit Checker"
			description={`Total submission: ${submissions.length.toString()}`}
		/>
		{#each submissions as item, index}
			<div class="submit">
				<p>
					<b id="title">{item.levels.name}</b> ({ifMobile(item)}{item.progress}%) ({item.refreshRate}hz)
					(ID:{item.levelid})<br />
					Player name: <a href={`/player?id=${item.players.uid}`}>{item.players.name}</a><br />
					Comment: {item.comment}<br />
					Video Link: <a href={item.videoLink}>{item.videoLink}</a>
				</p>
				<button id="bla" on:click={() => reject(item, index)}>Reject</button>
				{#if item.progress >= item.levels.minProgress}
					<button on:click={() => accept(item, index)}>Accept</button>
				{/if}
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	#title {
		font-size: 25px;
	}
	#bla {
		margin-left: 50px;
	}
	.pageContent {
		display: grid;
		gap: 30px;
		grid-template-areas:
			"header"
			"widget";
		grid-auto-columns: 1fr;
	}
	.submit {
		height: 160px;
		width: 100%;
		background-color: var(--color23);
		border-radius: 50px;
		p {
			margin-left: 50px;
			font-size: 16px;
		}
	}
</style>
