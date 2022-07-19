<script lang="ts">
	export var title:string;
	export var description:string;
</script>

<div class="titleWidget">
	<div class="title">
		<p class="bigTitle">{title}</p>
		<p class="description">{description}</p>
	</div>
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
	.titleWidget {
		grid-area: header;
		width: 100%;
		min-height: 300px;
		background-color: #202020;
		border-radius: 50px;
		display: flex;
		align-items: center;
		margin-bottom: -10px;
		.title {
			margin-inline: 80px;
			font-weight: 500;
		}
		.description {
			font-weight: 200;
		}
		p {
			margin: 0;
		}
		.bigTitle {
			font-size: 50px;
			margin-bottom: 20px;
		}
	}
	@media screen and (max-width: 750px) {
		.titleWidget {
			.title {
				margin-left: 30px;
			}
		}
	}
</style>
