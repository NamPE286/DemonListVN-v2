<script>
	export let top;
	export let title;
	export let creator;
	export let points;
</script>

<main>
	<section>
		<h1>#{top}</h1>
		<div class="detail">
			<h4>{title}</h4>
			<small>by {creator} - {points}pt</small>
		</div>
	</section>
</main>

<style>
	main {
		background: #007700;
		display: flex;
		width: 48%;
		max-width: 450px;
		height: 225px;

		border-radius: 40px;
	}

	section {
		width: 100%;
		height: 30%;
		background: #202020;
		align-self: end;
		border-radius: 0 0 40px 40px;

		display: flex;
		justify-content: center;
		gap: 10px;
	}

	.detail {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 80%;
	}

	.detail > h4 {
		margin: 0.2em 0;
	}
</style>
