<script>
	//
	import Menu from './LinkButton.svelte';
	import Button from './SidebarButton.svelte';

	let expanded = false;

	function toggleSidebar() {
		$: expanded = !expanded;
	}
</script>

<nav class:expanded>
	<div class="top">
		<Menu image="/closed_menu.svg" func={toggleSidebar} />
                <a href="#">
                  <div class="button">
                    <img src="/list.svg">
                    <div>
                      List
                    </div>
                  </div>
                </a>
	</div>
	<div class="bottom">
		<p>Settings</p>
		<p>About</p>
	</div>
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 60px;
		overflow: hidden;
		transition: ease-out 200ms;

                gap: 10px;

                margin: 5px;
	}

	.expanded {
		width: 200px;
	}

        .button {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 0 5px;
            gap: 10px;
	    transition: ease-out 200ms;

            border-radius: 10px;
          }

        .button:hover {
            background: #202020;
          }


	.button > div {
		transition: opacity 200ms ease-out, visibility 0ms 200ms;
		opacity: 0;
		visibility: hidden;
	}

	.expanded .button > div {
		transition: opacity 200ms ease-out 100ms;
		opacity: 1;
		visibility: visible;
	}
</style>
