<script>
    import { createClient } from "@supabase/supabase-js";
    import Title from "../components/Title.svelte";
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
        console.log(data, error)
        var { data, error } = await supabase
            .from('levels')
            .delete()
            .match({ id: item.id })
        console.log(data, error)
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
        console.log(data, error)
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
            <p><b id='title'>{item.name}</b> (ID:{item.id})<br></p>
            <span>Demon List Top: </span>
            <input type='number' bind:value={item.dlTop}><br><br>
            <span>Video ID: </span>
            <input type='text' bind:value={item.videoID}><br><br>
            <span>Minimum Progress: </span>
            <input type='number' bind:value={item.minProgress}><br><br>
            <button id='bla' on:click={() => addLv(item, index)}>Add</button>
            <button on:click={() => delLv(item, index)}>Delete</button>
        </div>
    {/each}
</div>
{/if}

<style lang='scss'>
    #title{
        font-size: 25px;
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
        height: 180px;
        width: 100%;
        background-color: #202020;
        border-radius: 50px;
        p{
            margin-left: 50px;
            font-size: 16px;
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