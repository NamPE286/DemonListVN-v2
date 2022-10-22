<script>
	import { createClient } from "@supabase/supabase-js";
	import LoadingAnimation from "../components/animations/LoadingAnimation.svelte";
	import { userdata } from "./stores";
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
	var player;
	$: player = $userdata.data
    var randomDL, randomFL;
    async function getRandom(){
        var { data, error } = await supabase
            .from('random_levels')
            .select('*')
            .not('flTop', 'is', null)
            .limit(1)
            .single()
        randomFL = data.id
        var { data, error } = await supabase
            .from('random_levels')
            .select('*')
            .not('dlTop', 'is', null)
            .limit(1)
            .single()
        randomDL = data.id
    }
    getRandom()
	var greeting = [
			'Hi',
			'Hello',
			'Welcome',
			'Hola',
			'Bonjour',
			'Xin chào'
		]
	var l = Math.floor(Math.random()*greeting.length);
	function getGreeting(a){
		if(a) {
			return `${greeting[l]}, ${a}!`
		}
		return `${greeting[l]}!`
	}
</script>

<svelte:head>
	<title>Demon List VN</title>
	<meta name='description' content='Welcome to Demon List VN, this is where we keep track of the hardest demons created, verified and hardest demon beaten by Vietnamese!'>
</svelte:head>

{#if player}
    <div class='greeting'>
        <h1>{getGreeting(player.name)}</h1>
    </div>
	<div class="pageContent">
        <div class="fltop">
			<p class="topTitle">Featured List Rank</p>
			<p class="top">#{player.flrank ? player.flrank : "N/a"}</p>
		</div>
		<div class="dltop">
			<p class="topTitle">Demon List Rank</p>
			<p class="top">#{player.dlrank ? player.dlrank : "N/a"}</p>
		</div>
        <iframe src="https://e.widgetbot.io/channels/877546680801697813/877546680801697816" title="Discord"></iframe>
        <div class='tobeat'>
            <p class="topTitle">Utilities</p>
            <a href={`/level?id=${randomDL}`} class='level'>
                <p>Pick a random level from Demon List</p>
            </a>
            <a href={`/level?id=${randomFL}`} class='level'>
                <p>Pick a random level from Featured List</p>
            </a>
        </div>
    </div>
{:else}
	<LoadingAnimation />
{/if}

<style lang="scss">
	iframe{
		background-color: var(--color23);
	}
    .level{
        background-color: var(--color5);
        height: 50px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        margin-bottom: 15px;
    }
    .greeting{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
        h1{
            font-weight: 500;
        }
    }
	#center{
		text-align: center;
	}
	#abcs {
		display: none;
	}
	#videoLink {
		margin-left: 3px;
	}
	.pageContent {
		display: grid;
		width: 70%;
		margin-inline: auto;
		margin-bottom: 100px;
		gap: 30px;
		grid-template-areas:
			"dltop fltop"
			"sel sel"
			"sel1 sel1"
			"record record";
        grid-template-columns: 50% 50%;
	}
	.avatar {
		background-color: black;
		margin-bottom: 30px;
		width: 12.5vw;
		height: 12.5vw;
		margin-inline: auto;
		border-radius: 50%;
		border-color: white;
		border-style: solid;
		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
			border-radius: 50%;
		}
	}
	.playerName {
		font-size: 30px;
		font-weight: 500;
		margin-bottom: 30px;
		svg {
			filter: invert(1);
			margin-left: -30px;
		}
	}
	.playerInfoWidget {
		height: fit-content;
		width: 100%;
		border-radius: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 40px;
		padding-bottom: 40px;
		background-color: var(--color23);
	}
	.playerInfoWidgetWrapper {
		grid-area: info;
		height: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.fltop {
		grid-area: fltop;
		height: 200px;
		border-radius: 50px;
		background-color: var(--color23);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-inline: 50px;
		.topTitle {
			font-size: 28px;
			margin-top: 0;
			margin-bottom: 0;
		}
		.top {
			font-size: 75px;
			margin-top: 0;
			margin-bottom: 0;
			color: var(--color13);
			font-weight: 300;
		}
	}
	.dltop {
		grid-area: dltop;
		height: 200px;
		border-radius: 50px;
		background-color: var(--color23);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-inline: 50px;
		.topTitle {
			font-size: 28px;
			margin-top: 0;
			margin-bottom: 0;
		}
		.top {
			font-size: 75px;
			margin-top: 0;
			margin-bottom: 0;
			color: var(--color13);
			font-weight: 300;
		}
	}
    iframe{
        border-radius: 50px;
        width: 100%;
        height: 400px;
        border-color: transparent;
    }
    .tobeat{
        box-sizing: border-box;
        padding-inline: 50px;
        padding-top: 30px;
        padding-bottom: 30px;
        border-radius: 50px;
        width: 100%;
        height: 400px;
        background-color: var(--color23);
        .topTitle {
			font-size: 28px;
			margin-top: 0;
			margin-bottom: 10px;
		}
        a{
            color:white;
            text-decoration: none;
        }
    }
	@media screen and (max-width: 1450px) {
		.pageContent {
			width: 80%;
			.avatar {
				margin-top: 35px;
				width: 14vw;
				height: 14vw;
			}
		}
		.playerInfoWidget {
			padding-top: 0px;
			padding-bottom: 30px;
			.avatar {
				margin-bottom: 30px;
			}
			.playerName {
				font-size: 26px;
			}
		}
	}
	@media screen and (max-width: 1100px) {
		#abcs {
			display: block;
		}
		.pageContent {
			width: 90%;
			grid-template-areas:
				"dltop"
				"fltop"
				"info"
				"sel"
				"sel1"
				"record";
			grid-template-columns: 100%;
			.avatar {
				margin-top: 35px;
				width: 50vw;
				height: 50vw;
			}
		}
		.playerPt {
			margin-right: 20px;
		}
		.playersList {
			height: 80px;
		}
	}
</style>
