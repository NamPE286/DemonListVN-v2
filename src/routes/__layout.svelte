<script lang="ts">
	import Nav from '../components/Nav.svelte';
	var img;
	function getImg(){
		try{
			img = localStorage.getItem('bg')
			if(!img) img = ''
			console.log(img)
		}
		catch{
			setTimeout(getImg, 100)
		}
	}
	getImg()
	
</script>
{#if img}
	<img src={img} alt='bg'>
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
