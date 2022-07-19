<script lang="ts">
	import Nav from '../components/Nav.svelte';
</script>

<Nav />

<slot />

<style lang="scss">
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
