<script lang="ts">
    import Title from './Title.svelte';
    import Selector from './Selector.svelte';
</script>

<style lang="scss">
    .st_option {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc(100% - 64px);
        margin: 0 auto 0 auto;
    }
</style>

<Title title="Settings" description="View and modify your preferences" />
<div class="st_option">
    <Selector name="Dark theme" isToggled />
</div>