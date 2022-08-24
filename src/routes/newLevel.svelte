<script>
    import { createClient } from "@supabase/supabase-js";
    import Title from "../components/widgets/Title.svelte";
    import { userdata } from './stores'
    const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
    var levels = [];
    async function getData(){
        var { data, error } = await supabase
            .from('levels')
            .select('*')
            .is('dlTop', null)
            .is('flTop', null)
        levels = data
    }
    getData()
    async function delLv(item, index){
        var { data, error } = await supabase
            .from('submissions')
            .delete()
            .match({ levelid: item.id })
        var { data, error } = await supabase
            .from('levels')
            .delete()
            .match({ id: item.id })
        levels.splice(index, 1)
        levels = levels
    }
    async function addLv(item, index){
        if(item.dlTop == null){
            alert('Level\'s top cannot be null')
            return
        }
        if(item.videoID.length < 6){
            alert('Invalid video ID')
            return
        }
        item.dlTop -= 0.5
        var { data, error } = await supabase
            .from('levels')
            .update(item)
            .match({ id: item.id })
        var { data, error } = await supabase
            .rpc('updateRank')
        levels.splice(index, 1)
        levels = levels
    }

</script>
{#if $userdata.data.isAdmin}
<div class="pageContent">
    <Title title="New levels" description={`Total new levels: ${levels.length.toString()}`} />
    {#each levels as item, index}
        <div class='submit'>
            <a href={`/level?id=${item.id}`}><b id='title'>{item.name}</b></a>by {item.creator} (ID:{item.id})<br>
        </div>
    {/each}
</div>
{/if}

<style lang='scss'>
    #title{
        font-size: 20px;
        margin-right: 5px;
        
    }
    #bla{
        margin-left: 50px;
    }
    span{
        margin-left: 50px;
    }
	.pageContent {
		display: grid;
		width: 60%;
		margin-inline: auto;
		margin-bottom: 100px;
		gap: 30px;
		grid-template-areas:
			"header"
			"widget";
		grid-auto-columns: 1fr;
	}
    .submit{
        height: 65px;
        width: 100%;
        background-color: #202020;
        border-radius: 50px;
        display: flex;
        align-items: center;
        a{
            color: white;
            margin-left: 50px;
            font-size: 16px;
            text-decoration: none;
        }
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
        #bla{
            margin-left: 30px;
        }
        span{
            margin-left: 30px;
        }
        .submit{
            p{
                margin-left: 30px;
            }
        }
	}
</style>