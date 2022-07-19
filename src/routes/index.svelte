<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import Title from '../components/Title.svelte';
	import Levels from '../components/Levels.svelte';
	var list: number = 0;
	var listOption: number = 0;
</script>

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

<style lang="scss">
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
	#highlight1 {
		background-color: #353535;
	}
	@media screen and (max-width: 750px) {
		.listSelector {
			a {
				margin-inline: 10px;
				padding-inline: 10px;
			}
			margin-bottom: -40px;
		}
	}
</style>
