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
