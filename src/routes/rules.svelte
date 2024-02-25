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
            <li>Only the players who have Vietnamese citizenship or Vietnamese bloodline can submit records.</li>
            <li>Records without FPS counter, clicks and raw footage will be rejected immediately.</li>
            <li>Records must reach minimum progress requirement of any level to be accepted.</li>
            <li>Records using disallowed hacks or secret routes (bypassing the hardest parts of the level), or stolen from others will not be accepted. It is recommended to check <a href="https://docs.google.com/spreadsheets/d/1evE4nXATxRAQWu2Ajs54E6cVUqHBoSid8I7JauJnOzg/edit?usp=sharing">the list of allowed hacks from Pointercrate</a>.</li>
            <li>Records not showing the in-game endscreen after completing the level will not be accepted.</li>
            <li>Records should be available on YouTube (public or unlisted).</li>
            <li>Players are allowed to fix bugs that are caused by varying refresh rates or in-game physics changes.</li>
            <li>If you use a custom LDM version, you must show the LDM level's ID in the comment section when submitting. Otherwise, your submission will be rejected immediately.</li>
            <li>If you get banned from the GDVN or CDGDVN facebook group, your record will be rejected until you get unbanned.</li>
        </ul>
        <h2>Demon List rule</h2>
        <ul>
            <li>All levels must be insane or extreme demons at the time of submission.</li>
        </ul>
        <h2>Featured List rule</h2>
        <ul>
            <li>All levels must be rated demons, created and uploaded by the Vietnamese (or having at least 50% Vietnamese contribution).</li>
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
                <li><Badge player={{rating:1}}> C: > 0</Badge></li>
                <li><Badge player={{rating:600}}> C+: >= 600</Badge></li>
                <li><Badge player={{rating:800}}> B-: >= 800</Badge></li>
                <li><Badge player={{rating:1000}}> B: >= 1000</Badge></li>
                <li><Badge player={{rating:1200}}> B+: >= 1200</Badge></li>
                <li><Badge player={{rating:1400}}> A-: >= 1400</Badge></li>
                <li><Badge player={{rating:1600}}> A: >= 1600</Badge></li>
                <li><Badge player={{rating:1800}}> A+: >= 1800</Badge></li>
                <li><Badge player={{rating:2000}}> S-: >= 2000</Badge></li>
                <li><Badge player={{rating:2200}}> S: >= 2200</Badge></li>
                <li><Badge player={{rating:2350}}> S+: >= 2350</Badge></li>
                <li><Badge player={{rating:2500}}> Expert: >= 2500</Badge></li>
                <li><Badge player={{rating:2800}}> Candidate Master: >= 2800</Badge></li>
                <li><Badge player={{rating:3000}}> Master: >= 3000</Badge></li>
                <li><Badge player={{rating:3600}}> Grandmaster: >= 3600</Badge></li>
                <li><Badge player={{rating:4200}}> Legendary Grandmaster: >= 4200</Badge></li>
                <li><Badge player={{rating:4800}}> Legendary International Grandmaster: >= 4800</Badge></li>
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
