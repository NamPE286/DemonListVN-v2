<script>
    import { createClient } from "@supabase/supabase-js";
    import Title from "../../components/widgets/Title.svelte";
    import { userdata } from '../stores'
    const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
    var submissions = [];
    async function getData(){
        if($userdata.data.country){
            var { data, error } = await supabase
                .from('submissions')
                .select('*, levels!inner(name, dlTop, minProgress), players!inner(name, uid, country)')
                .not('levels.dlTop', 'is', 'null')
                .eq('players.country', $userdata.data.country)
                .order('id', {ascending: true})
            console.log(data, error)
            submissions = data
        }
        else{
            setTimeout(getData, 50)
        }
    }
    getData()
    async function reject(item, index){
        submissions.splice(index, 1)
        submissions = submissions
		fetch(`https://seademonlist-api.vercel.app/submission/${item.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: supabase.auth.session().access_token
				})
			})
    }
    async function accept(item, index){
        submissions.splice(index, 1)
        submissions = submissions
        fetch(`https://seademonlist-api.vercel.app/record`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: supabase.auth.session().access_token,
					data : item
				})
			})
    }
    function ifMobile(item){
        if(item.mobile) return "Mobile "
        return ''
    }
</script>
{#if $userdata.data.isAdmin}
<div class="pageContent">
    <Title title="Submit Checker" description={`Total submissions: ${submissions.length.toString()}`} />
    {#each submissions as item, index}
        <div class='submit'>
            <p><b id='title'>{item.levels.name}</b> ({ifMobile(item)}{item.progress}%) ({item.refreshRate}hz) (ID:{item.levelid})<br>
                Player name: <a href={`/player?id=${item.players.id}`}>{item.players.name}</a><br>
                Comment: {item.comment}<br>
                Video Link: <a href={item.videoLink}>{item.videoLink}</a>
            </p>
            <button id='bla' on:click={() => reject(item, index)}>Reject</button>
            {#if item.progress >= item.levels.minProgress}
                <button on:click={() => accept(item, index)}>Accept</button>
            {/if}
        </div>
    {/each}
</div>
{/if}


<style lang='scss'>
    .pageContent{
        a{
            color: rgb(58, 61, 255);
        }
    }
    #title{
        font-size: 25px;
    }
    #bla{
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
        height: 160px;
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
	}
</style>