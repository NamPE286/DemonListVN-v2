<script>
</script>

<main>
	<div class="left">
		<p class="title">Demon List VN</p>
	</div>
	<div class="right">
		<div class="submit">
			<h3>Submit</h3>
		</div>
	</div>
</main>

<style lang="scss">
	:global(svg) {
		filter: invert(1);
		width: 24px;
		height: 24px;
	}

	main {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 97%;
		margin: 10px 20px 20px 20px;
	}

	main > div {
		display: flex;
		align-items: center;
		gap: 30px;
		height: auto;
	}

	.title {
		font-weight: 600;
	}

	.submit {
		padding: 0.75em 1.25em;
		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: 20px;

		background: #005ff9;
	}

	.submit > h3 {
		margin: 0;
	}
</style>
