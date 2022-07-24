<script lang="ts">
	export var top: number;
	export var name: string;
	export var creator: string;
	export var point: number;
	export var videoID: string;
</script>

<a href="#!" class="levelWidget">
	<img src={`https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`} alt="" loading='lazy'/>
	<div class="levelInfo">
		<p class="top">#{top}</p>
		<div class="info">
			<p class="levelName">{name}</p>
			<p class="creator">by {creator} - {point}pt</p>
		</div>
		<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"
			><path
				d="M18.708 28.333h2.75v-10h-2.75ZM20 15.167q.625 0 1.042-.417.416-.417.416-1.042t-.416-1.062q-.417-.438-1.042-.438t-1.042.438q-.416.437-.416 1.062t.416 1.042q.417.417 1.042.417Zm0 21.5q-3.458 0-6.479-1.313-3.021-1.312-5.292-3.583t-3.583-5.292Q3.333 23.458 3.333 20t1.313-6.5q1.312-3.042 3.583-5.292t5.292-3.562Q16.542 3.333 20 3.333t6.5 1.313q3.042 1.312 5.292 3.562t3.562 5.292q1.313 3.042 1.313 6.5t-1.313 6.479q-1.312 3.021-3.562 5.292T26.5 35.354q-3.042 1.313-6.5 1.313Z"
			/></svg
		>
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
		img {
			height: 70%;
			width: 100%;
			object-fit: cover;
			border-radius: 50px 50px 0 0;
		}
		svg {
			filter: invert(0.5);
			margin-top: auto;
			margin-bottom: auto;
			margin-left: auto;
			margin-right: 40px;
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
	@media screen and (min-width: 1100px) {
		.levelName {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 13vw;
		}
		.creator {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 13vw;
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
