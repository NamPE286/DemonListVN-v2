<script>
	import Topbar from "../components/Topbar.svelte";
	import Sidebar from "../components/Sidebar.svelte";
</script>

<main>
	<Sidebar />
	<div class="container">
		<Topbar />
		<section>
			<slot />
		</section>
	</div>
</main>

<style>
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
