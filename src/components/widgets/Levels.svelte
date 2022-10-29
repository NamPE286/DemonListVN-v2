<script lang="ts">
	export var top: number;
	export var name: string;
	export var creator: string;
	export var point: number;
	export var videoID: string;
	export var levelID: number;
	export var progress: number;
	var isMenuOpen = false
	function copyID(){
		const el = document.createElement("textarea");
		el.value = String(levelID);
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
		isMenuOpen = false
	}
	
</script>
<div class="levelWidget">
	<a href={`/level?id=${levelID}`} class="levelWidget">
		<img src={`https://img.youtube.com/vi/${videoID}/mqdefault.jpg`} alt="" loading='lazy'/>
		<div class="levelInfo">
			<p class="top">#{top}</p>
			<div class="info">
				<p class="levelName">{name}</p>
				<p class="creator">by {creator} - {point}pt</p>
			</div>
			{#if progress != 100 && progress}	
				<span>{progress}%</span>
			{/if}
			{#if progress == 100}
				<span><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"/></svg></span>
			{/if}
		</div>
	</a>
	<span class='tripleDot clickable' on:click={() => isMenuOpen = !isMenuOpen}>
		<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 14q-.825 0-1.412-.588Q4 12.825 4 12t.588-1.413Q5.175 10 6 10t1.412.587Q8 11.175 8 12q0 .825-.588 1.412Q6.825 14 6 14Zm6 0q-.825 0-1.412-.588Q10 12.825 10 12t.588-1.413Q11.175 10 12 10t1.413.587Q14 11.175 14 12q0 .825-.587 1.412Q12.825 14 12 14Zm6 0q-.825 0-1.413-.588Q16 12.825 16 12t.587-1.413Q17.175 10 18 10q.825 0 1.413.587Q20 11.175 20 12q0 .825-.587 1.412Q18.825 14 18 14Z"/></svg>
	</span>
	{#if isMenuOpen}
		<div class="menu">
			<section on:click={copyID}>
				<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4.5 18q-.625 0-1.062-.438Q3 17.125 3 16.5V5h1.5v11.5H14V18Zm3-3q-.625 0-1.062-.438Q6 14.125 6 13.5v-10q0-.625.438-1.062Q6.875 2 7.5 2h8q.625 0 1.062.438Q17 2.875 17 3.5v10q0 .625-.438 1.062Q16.125 15 15.5 15Zm0-1.5h8v-10h-8v10Zm0 0v-10 10Z"/></svg>
				Copy ID
			</section>
		</div>
	{/if}
</div>


<style lang="scss">
	.tripleDot{
		position: absolute;
		right: 0;
		height: fit-content !important;
		margin-top: 25px;
		border-radius: 50%;
		transition: 0.2s;
		svg{
			filter: drop-shadow( 0 0 5px black);
		}
	}
	.menu:hover{
		display: block;
	}
	.menu{
		position: absolute;
		height: auto;
		width: 200px;
		background-color: var(--color23);
		right: 0;
		margin-right: 20px;
		margin-top: 60px;
		border-radius: 15px;
		box-sizing: border-box;
		padding: 5px;
		svg{
			margin-right: 5px;
		}
		section{
			width: 100%;
			height: 30px;
			border-radius: 15px;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 5px;
			font-size: 12px;
			transition: 0.2s;
		}
		section:hover{
			background-color: var(--color20);
		}
	}
	.levelWidget {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 300px;
		border-radius: 50px;
		background-color: var(--color23);
		text-decoration: none;
		color: var(--color6);
		overflow: hidden;
		transition: all 0.3s;
		a{
			color: var(--color6);
			text-decoration: none;
		}
		span{
			height: 100%;
			margin-left: auto;
			margin-right: 35px;
			display: flex;
			align-items: center;
		}
		img {
			height: 70%;
			width: 100%;
			object-fit: cover;
			border-radius: 50px 50px 0 0;
		}
		svg{
			fill: var(--color6);
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
					color: var(--color7);
				}
			}
		}
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
