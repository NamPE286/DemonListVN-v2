<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import Title from '../components/Title.svelte';
	import Levels from '../components/Levels.svelte';
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
	<Title title="Featured List" description="Levels created and beaten by Vietnamese" />
	<div class="listSelector">
		<ul>
			<li>
				<a
					href="#!"
					id={listOption == 0 ? 'highlight1' : ''}
					on:click={() => {
						listOption = 0;
					}}>Levels Listing</a
				>
			</li>
			<li>
				<a
					href="#!"
					id={listOption == 1 ? 'highlight1' : ''}
					on:click={() => {
						listOption = 1;
					}}>Legacy</a
				>
			</li>
			<li>
				<a
					href="#!"
					id={listOption == 2 ? 'highlight1' : ''}
					on:click={() => {
						listOption = 2;
					}}>Top Player</a
				>
			</li>
		</ul>
	</div>
	<hr />
	<Levels />
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
	.listSelector {
		grid-area: sel;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: -50px;
		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
			overflow: hidden;
		}
		li {
			float: left;
			list-style-type: none;
			margin-left: 5px;
			margin-right: 5px;
			a {
				display: block;
				padding-left: 30px;
				padding-right: 30px;
				padding-top: 10px;
				padding-bottom: 10px;
				border-radius: 50px;
				text-decoration: none;
				color: white;
				transition: 0.3s;
			}
			a:hover {
				background-color: #353535;
				transition: 0.3s;
			}
		}
	}
	hr {
		grid-area: line;
		width: 100%;
		height: 0;
		margin: 0;
		border-color: rgb(71, 71, 71);
		margin-top: 20px;
	}
	#highlight {
		background-color: #3b3b3b;
	}
	#highlight1 {
		background-color: #353535;
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
		.listSelector {
			a {
				margin-inline: 10px;
				padding-inline: 10px;
			}
			margin-bottom: -40px;
		}
		.titleWidget {
			.title {
				margin-left: 30px;
			}
		}
		.description {
			width: 70%;
		}
	}
</style>
