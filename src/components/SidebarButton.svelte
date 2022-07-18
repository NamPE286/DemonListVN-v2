<script>
	export let link;
	export let func;
	export let title;
        export let expanded;

	if (func == undefined) {
		func = () => {};
	}

	if (title == undefined) {
		title = "";
	}

</script>

<div class="wrapper" class:expanded>
	<a href={link == undefined ? "#!" : link} class="button" on:click={func}>
		<slot />
                <p class="sideTitle">{title}</p>
	</a>
	<small>{title}</small>
</div>

<style>
	.wrapper {
		display: flex;
		align-items: center;
		flex-direction: column;
		transition: background 0.3s ease-out;
                width: min-content;
	}

	.button {
		display: flex;
		justify-content: center;

		border-radius: 16px;
		padding: 6px;
                margin: 0 10px;
		width: 80%;
		transition: background 0.3s ease-out;
	}

        .sideTitle {
          display: none;
          }

	small {
		visibility: hidden;
		color: #2e2e2e;
		transition: color 0.3s ease-out, visibility 0.3s ease-out;
	}

	.wrapper:hover > .button {
		background: #2e2e2e;
	}

	.wrapper:hover > small {
		visibility: visible;
		color: #fff;
	}

        .expanded {
            width: 100%;
          }

        .expanded small {
          display: none;
        }

        .expanded .button {
          width: 80%;
          justify-content: initial;
          align-items: center;
          gap: 20px;
          }


        .expanded .sideTitle {
          display: block;
          }
</style>
