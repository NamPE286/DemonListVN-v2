<script>
	import { createClient } from "@supabase/supabase-js";
	import Title from "../components/Title.svelte";
	import { userdata } from "./stores";
	var user;
	userdata.subscribe((value) => {
		user = value;
	});
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
	var players = [];
	async function getData() {
		var { data, error } = await supabase.from("players").select("*");
		players = data;
	}
	getData();
    var n
    async function addPlayer(){
        var { data, error } = await supabase.from("players").insert({name: n})
        console.log(data, error)
        window.location.reload()
    }
</script>

{#if user.data.data.isAdmin}
	<div class="pageContent">
		<Title title="Admin" description="" />
        <div>
            <button on:click={addPlayer}>Add player</button>
            <input bind:value={n}>
        </div>
		{#each players as item, index}
			<a href={`/player?id=${item.uid}`} target="_blank">{item.name}</a>
		{/each}
	</div>
{/if}

<style lang="scss">
	a {
		text-decoration: none;
		color: white;
	}
	#title {
		font-size: 25px;
	}
	#bla {
		margin-left: 50px;
	}
	.pageContent {
		display: grid;
		width: 60%;
		margin-inline: auto;
		margin-bottom: 100px;
		gap: 30px;
		grid-template-areas:
			"header"
			"widget";
		grid-auto-columns: 1fr;
	}
	.submit {
		grid-area: widget;
		height: 160px;
		width: 100%;
		background-color: #202020;
		border-radius: 50px;
		p {
			margin-left: 50px;
			font-size: 16px;
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
	}
</style>
