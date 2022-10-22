<script lang="ts">
	export var title:string;
	export var description:string;
</script>

<div class="titleWidget">
	<div class="title">
		<h1 class="bigTitle">{title}</h1>
		{#if description != ""}
			<p class="description">{description}</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.titleWidget {
		grid-area: header;
		width: 100%;
		min-height: 300px;
		background-color: var(--color23);
		border-radius: 50px;
		display: flex;
		align-items: center;
		margin-bottom: -25px;
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
			font-weight: 500;
			font-size: 50px;
			margin-bottom: 20px;
			margin-top: 0;
		}
	}
	@media screen and (max-width: 1100px) {
		.titleWidget {
			.title {
				margin-left: 30px;
			}
		}
	}
</style>
