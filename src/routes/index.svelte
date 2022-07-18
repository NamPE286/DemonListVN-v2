<script>
	import Header from "../components/Header.svelte";
	import Levels from "../components/Levels.svelte";
	import LevelCard from "../components/LevelCard.svelte";

	let title = "Feature List";
	let desc = "Levels created and beaten by Vietnamese";
</script>

<Header {title} description={desc} />
<hr />
<Levels />
