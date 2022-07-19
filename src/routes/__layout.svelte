<script lang="ts">
	import Nav from '../components/Nav.svelte';
	var list: number = 0;
	var listOption: number = 0;
</script>

<Nav />
<div class="listSwitcherWrapper">
	<div class="listSwitcher">
		<a
			class="listSwitcherItem"
			id={list == 0 ? 'highlight' : ''}
			on:click={() => {
				list = 0;
			}}
			href="#!"
		>
			<a href="#!">Featured List</a>
		</a>
		<a
			class="listSwitcherItem"
			id={list == 1 ? 'highlight' : ''}
			on:click={() => {
				list = 1;
			}}
			href="#!"
		>
			<a href="#!">Demon List</a>
		</a>
	</div>
</div>
<div class="pageContent">
	<slot />
</div>

<style lang="scss">
	.listSwitcherWrapper {
		z-index: 1;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 0;
		margin-bottom: 15px;
		.listSwitcher {
			height: 50px;
			background-color: #202020;
			box-shadow: 0 0 30px rgb(7, 7, 7);
			border-radius: 50px;
			a {
				color: white;
				text-decoration: none;
			}
			display: flex;
			align-items: center;
			justify-content: center;
			.listSwitcherItem {
				margin-inline: 8px;
				padding-left: 15px;
				padding-right: 15px;
				height: calc(100% - 15px);
				border-radius: 50px;
				display: flex;
				align-items: center;
				transition: background-color 0.3s;
			}
			.listSwitcherItem:hover {
				transition: background-color 0.3s;
				background-color: #3b3b3b;
			}
		}
	}
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
	#highlight {
		background-color: #3b3b3b;
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
