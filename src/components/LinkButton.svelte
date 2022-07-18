<script>
	export let image;
	export let alt;
	export let link;
	export let func;

	if (link == undefined) {
		link = '#';
	} else if (!link.startsWith('https://')) {
		link = `https://$(link)`;
	}

	if (alt == undefined) {
		alt = '';
	}
</script>

<a href={link}>
	<div on:click={func}>
		{#if !(image == undefined)}
			<img src={image} {alt} />
		{:else}
			<h4>{alt}</h4>
		{/if}
		<slot />
	</div>
</a>

<style>
	div {
		display: block;
		border-radius: 0.75em;
		padding: 5px;

		transition: background 0.3s linear;
	}

	div:hover {
		background: #202020;
	}
</style>
