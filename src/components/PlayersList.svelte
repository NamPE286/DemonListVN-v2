<script>
	var players = [];
	export var list;
	export var listOption;
	fetch("https://api.vnpower.tech/players/fl/page/1")
		.then((response) => response.json())
		.then((data) => {
			players = data;
		});
</script>

{#if listOption == 1}
	<div class="playersListWrapper">
		<div class="playersList">
			<div class="playerTop" />
			<div class="playerName">
				<p>Player name</p>
			</div>
			<div class="playerPt">
				<p>Total point</p>
			</div>
		</div>
		{#each players as item, index}
			<div class="playersList" id={index % 2 ? "" : "highlight2"}>
				<div class="playerTop">
					<p>#{item.flrank}</p>
				</div>
				<div class="playerName">
					<a href={`/player?id=${item.uid}`}>{item.name}</a>
				</div>
				<div class="playerPt">
					<p>{item.totalFLpt}</p>
				</div>
			</div>
		{/each}
	</div>
{/if}

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
			color: var(--color6);
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
