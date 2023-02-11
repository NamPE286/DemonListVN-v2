<script lang="ts">
	import Badge from "./badge.svelte";
	var players = [];
	export var list: string;
	fetch(`${import.meta.env.VITE_BACKEND_API_URL}/players/${list}/page/1`)
		.then((response) => response.json())
		.then((data) => {
			players = data;
		});
</script>

<div class="playersListWrapper">
	<div class="playersList">
		<div class="playerTop" />
		<div class="playerName">
			<p>Player name</p>
		</div>
		<div class="playerPt" style="margin-left: 30px;">
			{#if list == 'rating'}
				<p>Rating</p>
			{:else}
				<p>Total point</p>
			{/if}
		</div>
	</div>
	{#if players.length == 0}
		{#each Array(30) as item, index}
			<div class="playersList" id={index % 2 ? "" : "highlight2"}>
				<div class="playerTop">
					<p>#{index + 1}</p>
				</div>
				<div class="playerName">
					Loading...
				</div>
				<div class="playerPt">
					<p>N/a</p>
				</div>
			</div>
		{/each}
	{/if}
	{#each players as item, index}
		<div class="playersList" id={index % 2 ? "" : "highlight2"}>
			<div class="playerTop">
				{#if list == 'rating'}
					<p>#{item.overallRank}</p>
				{:else}
					<p>#{item[`${list}rank`]}</p>
				{/if}
			</div>
			<Badge rating={item.rating}/>
			<div class="playerName">
				<a href={`/player?id=${item.uid}`}>{item.name}</a>
			</div>
			<div class="playerPt">
				{#if list == 'rating'}
					<p>{item.rating}</p>
				{:else}
					<p>{item[`total${list.toUpperCase()}pt`]}</p>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	#highlight2 {
		background-color: var(--color23);
	}
	.playersListWrapper {
		grid-area: widget;
		display: flex;
		flex-direction: column;
	}
	.playersList {
		height: 40px;
		display: flex;
		border-radius: 50px;
		a {
			color: var(--textColor);
			text-decoration: none;
		}
		.playerTop {
			display: flex;
			align-items: center;
			width: 7%;
			height: 100%;
			p {
				margin-left: 20px;
			}
		}
		.playerName {
			display: flex;
			align-items: center;
			width: 73%;
			height: 100%;
		}
		.playerPt {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 20%;
			height: 100%;
		}
	}
	@media screen and (max-width: 1100px) {
		.playersList {
			.playerTop {
				width: 15%;
				p {
					margin-left: 20px;
				}
			}
			.playerName {
				width: 50%;
			}
			.playerPt {
				width: 35%;
			}
		}
	}
</style>
