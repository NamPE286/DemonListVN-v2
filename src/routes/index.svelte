<script lang='ts'>
	import Nav from '../components/Nav.svelte';
    var list:number = 0
    var listOption:number = 0
</script>
<Nav />
<div class='listSwitcherWrapper'>
    <div class='listSwitcher'>
        <a class='listSwitcherItem' id={list == 0 ? 'highlight' : ''} on:click={() => {list = 0}} href='#!'>
            <a href='#!'>Featured List</a>
        </a>
        <a class='listSwitcherItem' id={list == 1 ? 'highlight' : ''} on:click={() => {list = 1}} href='#!'>
            <a href='#!'>Demon List</a>
        </a>
    </div>
</div>
<div class="pageContent">
	<div class="titleWidget">
		<div class="title">
			<p class="bigTitle">Featured List</p>
			<p class="description">Levels created and beaten by Vietnamese</p>
		</div>
	</div>
	<div class="listSelector">
		<ul>
			<li><a href="#!" id={listOption == 0 ? 'highlight1' : ''} on:click={() => {listOption = 0}}>Levels Listing</a></li>
			<li><a href="#!" id={listOption == 1 ? 'highlight1' : ''} on:click={() => {listOption = 1}}>Legacy</a></li>
			<li><a href="#!" id={listOption == 2 ? 'highlight1' : ''} on:click={() => {listOption = 2}}>Top Player</a></li>
		</ul>
	</div>
	<hr />
	{#each Array(5) as item, index}
		<a href='#!' class="levelWidget">
			<img
				src="https://c4.wallpaperflare.com/wallpaper/455/438/502/twintails-redhead-blue-hair-red-eyes-loli-hd-wallpaper-preview.jpg"
				alt=""
			/>
			<div class="levelInfo">
				<p class="top">#{index + 1}</p>
				<div class="info">
					<p class="levelName">Level name</p>
					<p class="creator">by Creator</p>
				</div>
				<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"
					><path
						d="M18.708 28.333h2.75v-10h-2.75ZM20 15.167q.625 0 1.042-.417.416-.417.416-1.042t-.416-1.062q-.417-.438-1.042-.438t-1.042.438q-.416.437-.416 1.062t.416 1.042q.417.417 1.042.417Zm0 21.5q-3.458 0-6.479-1.313-3.021-1.312-5.292-3.583t-3.583-5.292Q3.333 23.458 3.333 20t1.313-6.5q1.312-3.042 3.583-5.292t5.292-3.562Q16.542 3.333 20 3.333t6.5 1.313q3.042 1.312 5.292 3.562t3.562 5.292q1.313 3.042 1.313 6.5t-1.313 6.479q-1.312 3.021-3.562 5.292T26.5 35.354q-3.042 1.313-6.5 1.313Z"
					/></svg
				>
			</div>
		</a>
	{/each}
</div>
<style lang="scss">
    .listSwitcherWrapper{
        z-index: 1;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom:0;
        margin-bottom: 15px;
        .listSwitcher{
            height: 50px;
            background-color: #202020;
            box-shadow: 0 0 30px rgb(7, 7, 7);
            border-radius: 50px;
            a{
                color: white;
                text-decoration: none;
            }
            display: flex;
            align-items: center;
            justify-content: center;
            .listSwitcherItem{
                margin-inline: 8px;
                padding-left: 15px;
                padding-right: 15px;
                height: calc(100% - 15px);
                border-radius: 50px;
                display: flex;
                align-items: center;
                transition: background-color 0.3s;
            }
            .listSwitcherItem:hover{
                transition: background-color 0.3s;
                background-color: #3B3B3B;
            }
        }
    }
	.pageContent {
		display: grid;
		width: 60%;
		margin-inline: auto;
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
		height: 300px;
		background-color: #202020;
		border-radius: 50px;
		display: flex;
		align-items: center;
        margin-bottom: -10px;
		.title {
			margin-left: 80px;
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
            float:left;
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
	.levelWidget {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 300px;
		border-radius: 50px;
		background-color: #202020;
        text-decoration: none;
        color:white;
		img {
			height: 200px;
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
    #highlight{
        background-color: #3b3b3b;
    }
    #highlight1{
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
