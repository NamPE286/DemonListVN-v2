<script lang="ts">
	import Title from "../components/widgets/Title.svelte";
	import CardVisit from "../components/widgets/PersonnalCard.svelte";
</script>
<svelte:head>
	<title>About - Demon List VN</title>
	<meta name='description' content='A list of people who maintain Demon List VN as well as the website developers' />
</svelte:head>
<div class="pageContent">
	<Title
		title="About"
		description="A list of people who maintain Demon List VN as well as the website developers"
	/>
	<p>Staffs</p>
	<CardVisit
		staffName="Hito73"
		staffYT="https://www.youtube.com/channel/UCYw-j3PO02FCfEL-M-VZqGg"
		staffFB="https://www.facebook.com/thecloudsgiveway"
		staffGH="#!"
		staffAvatar="https://cdn.discordapp.com/attachments/1006116184703369216/1006136970340225074/unknown.png"
	/>

  <p>Developers</p>
	<CardVisit
		staffName="NamPE"
		staffYT="https://www.youtube.com/channel/UCCj7J4fxHF70n5zxccZQDww"
		staffFB="https://www.facebook.com/profile.php?id=100008542323249"
		staffGH="https://github.com/NamPE286"
		staffAvatar="https://avatars.githubusercontent.com/u/71075654?v=4"
	/>
	<CardVisit
		staffName="Kryogenic"
		staffYT="https://youtube.com/channel/UC30N4JkZcgfpC2WBzKJtaMA"
		staffFB="https://facebook.com/truongan0404"
		staffGH="https://github.com/DoAn08"
		staffAvatar="https://avatars.githubusercontent.com/u/106440315?v=4"
	/>
	<CardVisit
		staffName="VnPower"
		staffYT=""
		staffFB="https://www.facebook.com/TRVnPower"
		staffGH="https://github.com/rVnPower"
		staffAvatar="https://avatars.githubusercontent.com/u/80624167?v=4"
	/>
</div>

<style lang="scss">
	p {
		font-size: 30px;
    font-weight: 500;
		margin: 40px 0 0 32px;
	}
</style>
