<script lang="ts">
	import Nav from '../components/Nav.svelte';
</script>

<Nav />

<div class="pageContent">
	<slot />
</div>

<style lang="scss">
	.pageContent {
		display: grid;
		width: 60%;
		margin-inline: auto;
		margin-bottom: 100px;
		gap: 30px;
		grid-template-areas:
			'header header'
			'sel sel'
			'line line'
			'widget widget';
	}
	@media screen and (max-width: 750px) {
		.pageContent {
			width: 90%;
			grid-template-areas:
				'header'
				'sel'
				'line'
				'widget';
		}
	}
</style>
