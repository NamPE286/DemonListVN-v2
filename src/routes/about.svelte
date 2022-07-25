<script lang="ts">
	import Title from "../components/Title.svelte";
	import CardVisit from "../components/PersonnalCard.svelte";
</script>

<div class="pageContent">
	<Title
		title="About"
		description="A list of people who maintain Demon List VN as well as the website developers"
	/>
	<p>Staffs</p>
	<CardVisit
		staffName="AdminNotDeveloper"
		staffYT="https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw"
		staffFB="https://www.facebook.com/RickAstley"
		staffGH="#!"
		staffAvatar="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Auto_Racing_Green.svg/1200px-Auto_Racing_Green.svg.png"
	/>
  <p>Developers</p>
	<CardVisit
		staffName="AdminIsDeveloper"
		staffYT="https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw"
		staffFB="https://www.facebook.com/RickAstley"
		staffGH="https://github.com/rickastley"
		staffAvatar="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Auto_Racing_Green.svg/1200px-Auto_Racing_Green.svg.png"
	/>
</div>

<style lang="scss">
	p {
		font-size: 30px;
    font-weight: 500;
		margin: 40px 0 0 32px;
	}
	.pageContent {
		width: 60%;
		margin-inline: auto;
		margin-bottom: 100px;
	}
	@media screen and (max-width: 1450px) {
		.pageContent {
			width: 80%;
		}
	}
	@media screen and (max-width: 1100px) {
		.pageContent {
			width: 90%;
		}
	}
</style>
