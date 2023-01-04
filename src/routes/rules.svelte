<script lang="ts">
	import Title from "../components/widgets/Title.svelte";
    import Badge from "../components/badge.svelte";
</script>
<svelte:head>
    <title>Rules - Demon List VN</title>
    <meta name='description' content='Read the rules'>
</svelte:head>
<Title title="Rules" description="Read the rules" />
<div class="pageContent">
    <div class='rule'>
        <h2>Demon List rules</h2>
        <ul>
            <li>You must have Vietnamese citizenship.</li>
            <li>If you got banned from GDVN or CDGDVN facebook group, your record will be rejected until you got unbanned.</li>
            <li>Submitted records can correspond to a player completing a level or achieving progress above its minimum requirement. Achieved the record without using hacks (however, FPS bypass is allowed, up to 360fps).</li>
            <li>Secret routes or bug routes are not allowed.</li>
            <li>Do not turn off orb pulse: You must playing the level with downloaded music (any song is acceptable).</li>
            <li>For mobile player: Do not hiding trail in your completion or your record will be rejected.</li>
        </ul>
        <h2>Featured List rules</h2>
        <ul>
            <li>Only 100% records of any demons in the list are accepted (Only apply for FDLVN).</li>
            <li>Any records related to any cheat tools or secret ways will be rejected (However, FPS bypass is allowed, up to 360 FPS).</li>
            <li>Stealing videos from others will not be accepted.</li>
        </ul>
        <h2>Rating</h2>
        <ul>
            <li>Rating is a metric intended to more accurately gauge player performance and skill.</li>
            <li>Rating is based on player's best performance and performance on other levels on Demon List (Note: grinding is not a viable way to increase player's rating)</li>
            <li>Rating also represents player potential to beat levels in their rating range</li>
            <li>Rating distribution:</li>
            <ul>
                <li><Badge rating={250}> Novice: >= 250</Badge></li>
                <li><Badge rating={500}> Apprentice: >= 500</Badge></li>
                <li><Badge rating={1000}> Specialist: >= 1000</Badge></li>
                <li><Badge rating={1850}> Expert: >= 1850</Badge></li>
                <li><Badge rating={2200}> Candidate Master: >= 2200</Badge></li>
                <li><Badge rating={2750}> Master: >= 2750</Badge></li>
                <li><Badge rating={3500}> Grandmaster: >= 3500</Badge></li>
                <li><Badge rating={3800}> Legendary Grandmaster: >= 3800</Badge></li>
            </ul>
        </ul>
    </div>
</div>

<style lang="scss">
    .rule{
        box-sizing: border-box;
        margin-top: 40px;
        padding-inline: 80px;
    }
	@media screen and (max-width: 1100px) {

        .rule{
            padding-inline: 30px;
        }
    }
</style>
