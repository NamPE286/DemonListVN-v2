<script lang="ts">
	import Title from "../components/Title.svelte";
	import Selector from "../components/Selector.svelte";
</script>
<div class="pageContent">
    <Title title="Settings" description="View and modify your preferences" />
    <div class="st_option">
        <Selector name="Dark theme" isToggled />
    </div>
</div>

<style lang="scss">
    .pageContent {
		width: 60%;
		margin-inline: auto;
		margin-bottom: 100px;
    }
	.st_option {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: calc(100% - 64px);
		margin: 25px auto 0 auto;
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
