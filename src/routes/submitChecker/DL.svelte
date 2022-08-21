<script>
    import { createClient } from "@supabase/supabase-js";
    import Title from "../../components/Title.svelte";
    import { userdata } from '../stores'
    const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
    var submissions = [];
    async function getData(){
        var { data, error } = await supabase
            .from('submissions')
            .select('*, levels!inner(name, dlTop), players(name)')
            .is('levels.flTop', null)
            .is('levels.seaTop', null)
            .order('id', {ascending: true})
        submissions = data
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
        fetch(`https://seademonlist-api.vercel.app/submission`, {
				method: 'POST',
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
                Player name: {item.players.name}<br>
                Comment: {item.comment}<br>
                Video Link: <a href={item.videoLink}>{item.videoLink}</a>
            </p>
            <button id='bla' on:click={() => reject(item, index)}>Reject</button>
            <button on:click={() => accept(item, index)}>Accept</button>
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