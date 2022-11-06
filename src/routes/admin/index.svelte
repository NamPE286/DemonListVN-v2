<script>
    import { createClient } from "@supabase/supabase-js";
	import Title from "../../components/widgets/Title.svelte";
	import { userdata } from "../stores";
	const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);

</script>
{#if $userdata.data.isAdmin}
	<div class="pageContent">
		<Title title="All Player" description="" />
	</div>
{/if}
<style lang="scss">

</style>