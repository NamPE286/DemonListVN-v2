<script lang="ts">
	import Nav from "../components/Nav.svelte";
	import { onMount } from "svelte";
	import { page } from '$app/stores'
	var img;
	var blur, opacity;
	var isSnowfallEnable = false
	function getImg() {
		try {
			img = localStorage.getItem("bg");
			blur = localStorage.getItem("blur");
			opacity = localStorage.getItem("opacity");
			if (!img) img = "";
			if (!blur && blur != 0) blur = 0;
			if (!opacity && opacity != 0) opacity = 100;
		} catch {
			setTimeout(getImg, 100);
		}
	}
	function setTheme() {
		var currentTheme = localStorage.getItem("theme");
		if (!currentTheme) {
			currentTheme = "dark";
			localStorage.setItem("theme", "dark");
		}
		document.documentElement.setAttribute("data-theme", currentTheme);
	}
	onMount(() => {
		getImg();
		setTheme();
	});
</script>

{#if img}
	<img src={img} alt="bg" style={`filter: blur(${blur}px); opacity: ${opacity}%;`} />
{/if}
<Nav />
{#key $page.url}
	<div>
		<slot />
	</div>
{/key}

<style lang="scss">
	img {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	:global(.pageContent) {
		width: 1105px;
		margin-inline: auto;
		margin-bottom: 100px;
		@media screen and (max-width: 1350px) {
			width: 900px;
		}
		@media screen and (max-width: 1100px) {
			width: 90%;
		}
	}
</style>
