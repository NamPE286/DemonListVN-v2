<script lang="ts">
	import Title from "../components/Title.svelte";
	import CardVisit from "../components/PersonnalCard.svelte";
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
	<CardVisit
		staffName="noeruchan"
		staffYT="https://m.youtube.com/c/noeruchangd/featured"
		staffFB="https://www.facebook.com/profile.php?id=100015875652073"
		staffGH="#!"
		staffAvatar="https://yt3.ggpht.com/OBeTi6u8XxufbZxeJRe9jYx9nmBkAdYVBrZLQlke8BQXoMznrmQsoqD5V3K7fHMfx8fJfaeI=s88-c-k-c0x00ffffff-no-rj"
	/>
	<CardVisit
		staffName="shira"
		staffYT="https://m.youtube.com/channel/UCcdpyP7JZZima9_Ukaguj-w"
		staffFB="https://www.facebook.com/profile.php?id=100015875652073"
		staffGH="#!"
		staffAvatar="https://yt3.ggpht.com/F5UuDHIqnfnMj5LNZEN7RJRgLhq6TEYCVCwqQrLivebh1yTBLJLw_ID6GWeEwwlI_cxHVZTfZg=s88-c-k-c0x00ffffff-no-rj"
	/>
	<CardVisit
		staffName="Kanota"
		staffYT="https://www.youtube.com/channel/UCyHGYrLHvmZ-5rDTOxcCwAw"
		staffFB="https://www.facebook.com/Eyetalium"
		staffGH="#!"
		staffAvatar="https://yt3.ggpht.com/GDn_2gPVf9lCyTtlTHnPEZ_eTx7OiylIzm67oq48u9LieyvFXnPqIP3FtXqOUYc1DFw3iksyJQ=s88-c-k-c0x00ffffff-no-rj"
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
