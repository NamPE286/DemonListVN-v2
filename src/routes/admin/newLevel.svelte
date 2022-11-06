<script>
	import { createClient } from "@supabase/supabase-js";
	import Title from "../../components/widgets/Title.svelte";
	import { userdata } from "../stores";
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
	var levels = [];
	async function getData() {
		var { data, error } = await supabase
			.from("levels")
			.select("*")
			.is("dlTop", null)
			.is("flTop", null);
		levels = data;
	}
	getData();
</script>

{#if $userdata.data.isAdmin}
	<div class="pageContent">
		<Title title="New levels" description={`Total new levels: ${levels.length.toString()}`} />
		{#each levels as item, index}
			<div class="submit">
				<a href={`/level?id=${item.id}`}><b id="title">{item.name}</b></a>by {item.creator} (ID:{item.id})<br
				/>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	#title {
		font-size: 20px;
		margin-right: 5px;
	}
	#bla {
		margin-left: 50px;
	}
	span {
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
		height: 65px;
		width: 100%;
		background-color: var(--color23);
		border-radius: 50px;
		display: flex;
		align-items: center;
		a {
			color: var(--color6);
			margin-left: 50px;
			font-size: 16px;
			text-decoration: none;
		}
	}
	@media screen and (max-width: 1450px) {

	}
	@media screen and (max-width: 1100px) {

		#bla {
			margin-left: 30px;
		}
		span {
			margin-left: 30px;
		}
		.submit {
			p {
				margin-left: 30px;
			}
		}
	}
</style>
