<script lang="ts">
	export var top: number;
	export var name: string;
	export var creator: string;
	export var point: number;
	export var videoID: string;
	export var levelID: number;
</script>

<a href={`/level?id=${levelID}`} class="levelWidget">
	<img src={`https://img.youtube.com/vi/${videoID}/mqdefault.jpg`} alt="" loading='lazy'/>
	<div class="levelInfo">
		<p class="top">#{top}</p>
		<div class="info">
			<p class="levelName">{name}</p>
			<p class="creator">by {creator} - {point}pt</p>
		</div>
	</div>
</a>

<style lang="scss">
	.levelWidget {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 300px;
		border-radius: 50px;
		background-color: #202020;
		text-decoration: none;
		color: white;
		overflow: hidden;
		transition: all 0.3s;
		img {
			height: 70%;
			width: 100%;
			object-fit: cover;
			border-radius: 50px 50px 0 0;
		}
		.levelInfo {
			display: flex;
			margin-top: auto;
			margin-bottom: auto;
			p {
				margin: 0;
			}
			.top {
				font-size: 40px;
				font-weight: 500;
				margin-left: 40px;
				margin-right: 15px;
			}
			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				.levelName {
					font-weight: 500;
					font-size: 23px;
				}
				.creator {
					font-size: 14px;
					font-weight: 200;
					color: #b8b8b8;
				}
			}
		}
	}
	.levelWidget:hover{
		transform: scale(1.15);
		box-shadow: 0 0 32px rgb(34, 34, 34);
	}
	@media screen and (min-width: 1100px) {
		.levelName {
			overflow: hidden;
		}
		.creator {
			overflow: hidden;
		}
	}
	@media screen and (max-width: 750px) {
		.levelWidget {
			height: 260px;
			img {
				height: 160px;
			}
		}
	}
</style>
