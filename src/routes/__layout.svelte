<script lang="ts">
	import Nav from '../components/Nav.svelte';
	var img;
	var blur, opacity;
	function getImg(){
		try{
			img = localStorage.getItem('bg')
			blur = localStorage.getItem('blur')
			opacity = localStorage.getItem('opacity')
			console.log(localStorage)
			if(!img) img = ''
			if(!blur && blur != 0) blur = 0 
			if(!opacity && opacity != 0) opacity = 100
		}
		catch{
			setTimeout(getImg, 100)
		}
	}
	getImg()
	
</script>
{#if img}
	<img src={img} alt='bg' style={`filter: blur(${blur}px); opacity: ${opacity}%;`}>
{/if}
<Nav />
<slot />

<style lang="scss">
	img{
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
