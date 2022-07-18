<script>
	import Button from './LinkButton.svelte';
</script>

<main>
	<div>
		<h2>Demon List Vn</h2>
	</div>
	<button class="submit">
		<h3>Submit</h3>
	</button>
</main>

<style>
	main {
		width: 96%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	div {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	button {
		background: #005ff9;
		appearance: none;
		color: inherit;
		border: none;
		border-radius: 25px;
		padding: 5px 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
