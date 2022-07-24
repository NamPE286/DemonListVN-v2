<script lang="ts">
	export var name:string;
    export var isToggled:boolean;
</script>

<div class="titleWidget">
    <p class="sl_name">{name}</p>
    <a href="#!" on:click={async() => {
        isToggled = !isToggled;
    }} class="right">
        {#if isToggled == false}
        <div class="right slider unToggled">
            <span class="sl_button"> </span>
        </div>
        {:else}
        <div class="right slider Toggled">
            <span class="sl_buttonToggled"> </span>
        </div>
        {/if}
    </a>
</div>

<style lang="scss">
    .titleWidget {
        display: flex;
        flex-direction: row;
        width: 100%;
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
        background-color: #202020;
    }
    .Toggled {
        background-color: #00f900;
    }
</style>
