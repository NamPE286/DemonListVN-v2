<script lang="ts">
	export var name:string;
    export var key:string;
	var a;
    var isChanged = false
	function getImg(){
		try{
			a = localStorage.getItem(key)
			if(!a && a != 0) {
                if(key == 'blur') a = 0
                else a = 100
            }
		}
		catch{
			setTimeout(getImg, 100)
		}
	}
    getImg()
    function update(){
        isChanged = true
        localStorage.setItem(key, a)
    }
</script>
{#if isChanged}
    <div class='warn'>
        <p>The page need to be refreshed for this setting to take effect</p>
    </div>
{/if}
<div class="titleWidget">
    <p class="sl_name">{name}</p>
    <input class='right' type="range" min="0" max="100" bind:value={a} on:change={update}>
</div>

<style lang="scss">
    .warn{
		width: 100%;
		background-color: rgb(66, 62, 1);
		height: fit-content;
		box-sizing: border-box;
		padding-inline: 18px;
		padding-top: 1px;
		padding-bottom: 1px;
		border-radius: 20px;
		margin-inline: auto;
		color: yellow;
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
