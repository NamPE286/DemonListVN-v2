<script>
	import Header from '../components/Header.svelte';
	import Topbar from '../components/Topbar.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	import Levels from '../components/Levels.svelte';
	import LevelCard from '../components/LevelCard.svelte';

	let title = 'Feature List';
	let desc = 'Levels created and beaten by Vietnamese';
</script>

<main>
	<Sidebar />
	<div class="container">
		<Topbar />
		<section>
			<Header {title} description={desc} />
			<hr />
			<Levels />
		</section>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		justify-content: center;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 95%;
	}

	section {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 75%;
	}
</style>
