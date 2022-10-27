<script lang="ts">
	export var name:string;
    var fileinput
    import { onMount } from "svelte";
    var currentTheme
    onMount(() => currentTheme = localStorage.getItem('theme'))
    function apply(theme){
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }
</script>

<div class="titleWidget">
    <p class="sl_name">{name}</p>
    <select class="right" bind:value={currentTheme} on:change={() => apply(currentTheme)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
    </select>
    <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e) => apply(e)} bind:this={fileinput} >
</div>

<style lang="scss">
    .titleWidget {
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
    }
    .sl_name {
        font-size: 18px;
    }
    .right {
        margin: 0 0 0 auto;
    }
    .slider {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 24px;
        width: 48px;
        border-radius: 12px;
    }
    .sl_button {
        margin-left: 4px;
        height: 16px;
        width: 16px;
        background-color: var(--color6);
        border-radius: 10px;
    }
    .sl_buttonToggled {
        margin-left: auto;
        margin-right: 4px;
        height: 16px;
        width: 16px;
        background-color: var(--color6);
        border-radius: 10px;
    }
    .unToggled {
        background-color: var(--color23);
    }
    .Toggled {
        background-color: var(--color2);
    }
</style>
