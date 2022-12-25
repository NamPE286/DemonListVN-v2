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
		width: 120%;
		margin-left: -10%;
		min-height: 350px;
		border-radius: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: -25px;
		background-color: var(--color26);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10.8px);
		-webkit-backdrop-filter: blur(10.8px);
		border: 1px solid rgba(255, 255, 255, 0.11);
		.title {
			margin-inline: 80px;
			font-weight: 500;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.description {
			font-weight: 300;
			font-size: 21px;
		}
		p {
			margin: 0;
		}
		.bigTitle {
			font-weight: 500;
			font-size: 100px;
			margin-bottom: 10px;
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
