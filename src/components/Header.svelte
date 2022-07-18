<script>
	export let title;
	export let description;
</script>

<div>
	<h1>{title}</h1>
	<p>{description}</p>
</div>

<style>
	div {
		font-size: 20px;
		border-radius: 40px;
		background: #333;
		padding: 0.5em 3em;
		width: 830px;
		min-height: 300px;

		line-height: 20px;

		display: flex;
		justify-content: center;
		flex-direction: column;
	}
</style>
