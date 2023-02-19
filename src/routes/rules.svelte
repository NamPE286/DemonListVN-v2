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
        <h2>General rules</h2>
        <ul>
            <li>Records must reach minimum progress requirement of any level to be accepted.</li>
            <li>Cheats and tools are not allowed except for these:</li>
            <ul>
                <li>FPS bypass (Max 360fps).</li>
            </ul>
            <li>Records stolen from other are not accepted.</li>
            <li>Secret routes or bug routes are not allowed.</li>
            <li>Record must have sound.</li>
            <li>Icon trail must be visible.</li>
            <li>If you use custom LDM version, you have to show LDM level ID in comment when submit. Otherwise, your submission will be rejected immediately.</li>
        </ul>
        <h2>Demon List rules</h2>
        <ul>
            <li>You must have Vietnamese citizenship.</li>
            <li>If you got banned from GDVN or CDGDVN facebook group, your record will be rejected until you got unbanned.</li>
        </ul>
        <h2>Rating</h2>
        <ul>
            <li>Overview:</li>
            <ul>
                <li>Rating is a metric represents player potential to beat levels in their rating range.</li>
                <li>Rating is based on player's best performance and performance on other levels on Demon List (Note: grinding is not a viable way to increase player's rating)</li>
            </ul>
            <li>Rules:</li>
            <ul>
               <li>Rating is only applied to Demon List.</li>
               <li>Banned and hidden accounts will be unrated.</li> 
            </ul>
            <li>Rating distribution:</li>
            <ul>
                <li><Badge rating={1}> Casual: > 0</Badge></li>
                <li><Badge rating={500}> Novice: >= 500</Badge></li>
                <li><Badge rating={1000}> Apprentice: >= 1000</Badge></li>
                <li><Badge rating={1400}> Specialist: >= 1400</Badge></li>
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
