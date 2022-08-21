<script lang="ts">
	import Title from "../components/Title.svelte";
</script>
<svelte:head>
    <title>Rules - Demon List VN</title>
    <meta name='description' content='Read the rules'>
</svelte:head>
<div class="pageContent">
    <Title title="Rules" description="Read the rules" />
    <div class='rule'>
        <h2>Demon List rules:</h2>
        <ul>
            <li>You must have Vietnamese citizenship.</li>
            <li>If you got banned from GDVN or CDGDVN facebook group, your record will be rejected until you got unbanned.</li>
            <li>Submitted records can correspond to a player completing a level or achieving progress above its minimum requirement. Achieved the record without using hacks (however, FPS bypass is allowed, up to 360fps).</li>
            <li>Secret routes or bug routes are not allowed.</li>
            <li>Do not turn off orb pulse: You must playing the level with downloaded music (any song is acceptable).</li>
            <li>For mobile player: Do not hiding trail in your completion or your record will be rejected.</li>
        </ul>
        <h2>Featured List rule:</h2>
        <ul>
            <li>Only 100% records of any demons in the list are accepted (Only apply for FDLVN).</li>
            <li>Any records related to any cheat tools or secret ways will be rejected (However, FPS bypass is allowed, up to 360 FPS).</li>
            <li>Stealing videos from others will not be accepted.</li>
        </ul>
    </div>
</div>

<style lang="scss">
    .rule{
        box-sizing: border-box;
        margin-top: 40px;
        padding-inline: 80px;
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
        .rule{
            padding-inline: 30px;
        }
    }
</style>
