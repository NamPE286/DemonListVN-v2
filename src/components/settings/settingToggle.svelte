<script lang="ts">
	export var name: string;
    export var key: string;
    export var defaultKey: string = 'false';
    import { onMount } from "svelte";
    var isToggled = false
    onMount(() => {
        var a = localStorage.getItem(key)
        if(a == null) {
            localStorage.setItem(key, defaultKey)
            a = localStorage.getItem(key)
        }
        isToggled = JSON.parse(a)
    })
    function toggleSetting(){
        isToggled = !isToggled
        localStorage.setItem(key, JSON.stringify(isToggled))
    }
</script>

<div class="titleWidget">
	<p class="sl_name">{name}</p>
	<span
		on:click={async () => {
			toggleSetting()
		}}
		class="right"
	>
		{#if isToggled == false}
			<div class="right slider unToggled">
				<span class="sl_button" />
			</div>
		{:else}
			<div class="right slider Toggled">
				<span class="sl_buttonToggled" />
			</div>
		{/if}
		</span>
</div>

<style lang="scss">
	span{
		cursor: pointer;
	}
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
		background-color: #fff;
		border-radius: 10px;
	}
	.sl_buttonToggled {
		margin-left: auto;
		margin-right: 4px;
		height: 16px;
		width: 16px;
		background-color: #fff;
		border-radius: 10px;
	}
	.unToggled {
		background-color: #808080;
	}
	.Toggled {
		background-color: #00f900;
	}
</style>
