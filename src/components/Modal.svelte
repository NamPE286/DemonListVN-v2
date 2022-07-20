<script lang="ts">
    export var ifShow:boolean;
</script>
{#if ifShow}
<div class='dimBg' on:click={() => {ifShow = !ifShow}}/>
<div
    style="display: flex; justify-content: center; align-items: center; transition: all 0.25s ease-in-out;"
    class='modalWrapper'
>
    <div class="submitModal s_shadow">
        <div class="s_flexrow" style="align-items: flex-end;">
            <p class="s_title s_margin4">Submit</p>
            <button class="s_button s_margin3">View rules</button>
        </div>
        <div class="s_flexcol" style="align-items: center;">
            <select class="s_select">
                <option value="Featured List">Featured List</option>
                <option value="Demon List">Demon List</option>
            </select>
            <input class="s_input" placeholder="Player name" />
            <input class="s_input" placeholder="Level name" />
            <input class="s_input" placeholder="Progress" type='number'/>
            <input class="s_input" placeholder="FPS" type='number'/>
            <input class="s_input" placeholder="Video link" />
            <input class="s_input" placeholder="Comment (optional)" />
        </div>
        <div class="s_flexrow" style="justify-content: flex-end;">
            <a href='#!' class="s_button2 s_margin6 s_red" on:click={() => {ifShow = !ifShow}}>Cancel</a>
            <a href='#!' class="s_button2 s_margin5 s_blue">Submit</a>
        </div>
    </div>
</div>
{/if}


<style lang="scss">
    .dimBg{
        position: fixed;
        margin-top: -135px;
        height: 120%;
        width: 100%;
        background-color: black;
        z-index: 2;
        opacity: 0.5;
    }
    .modalWrapper{
        z-index: 3;
    }
	button {
		border: none;
		color: white;
	}
	.submitModal {
		position: fixed;
		top: 50%;
		background-color: #202020;
		width: 36%;
		border-radius: 48px;
		z-index: 2;
		transform: translateY(-50%);
	}
	.s_flexrow {
		display: flex;
		flex-direction: row;
	}
	.s_flexcol {
		display: flex;
		flex-direction: column;
	}
	.s_title {
		font-weight: 500;
		font-size: 48px;
	}
	.s_margin3 {
		margin: 32px 0px 24px 0px;
	}
	.s_margin4 {
		margin: 32px 16px 16px 52px;
	}
	.s_margin5 {
		margin: 16px 50px 24px 0px;
	}
	.s_margin6 {
		margin: 16px 16px 32px 0px;
	}
	.s_button {
		background-color: #2d2d2d;
		height: 28px;
		width: 96px;
		font-size: 14px;
		border-radius: 14px;
		font-weight: 350;
	}
	.s_button2 {
		height: 36px;
		width: 96px;
		font-size: 14px;
		border-radius: 24px;
		color: #fff;
		font-weight: 350;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
	}
	.s_input {
		background-color: #2d2d2d;
		width: calc(100% - 126px);
		border-radius: 10px;
		margin-bottom: 8px;
		padding: 16px 16px 16px 16px;
		border: none;
		color: #fff;
		font-family: "Roboto Flex", "Roboto", sans-serif;
		font-size: 18px;
        transition: all 0.25s ease-in-out;
	}
    .s_select {
		background-color: #2d2d2d;
		width: calc(100% - 96px);
		border-radius: 10px;
		margin-bottom: 8px;
		padding: 16px 16px 16px 12px;
		border: none;
		color: #fff;
		font-family: "Roboto Flex", "Roboto", sans-serif;
		font-size: 18px;
        -moz-appearance: textfield;
        transition: all 0.25s ease-in-out;
	}
	.s_input::placeholder {
		position: relative;
		font-family: "Roboto Flex", "Roboto", sans-serif;
		font-size: 18px;
	}
	.s_input:focus {
		outline: none;
		border: 0;
		background-color: #333333;
		transition: all 0.25s ease-in-out;
	}
	.s_select:focus {
		outline: none;
		border: 0;
		background-color: #333333;
		transition: all 0.25s ease-in-out;
	}
	.s_red {
		background-color: #f90000;
	}
	.s_blue {
		background-color: #005ff9;
	}
	.s_shadow {
		box-shadow: 0px 0px 32px #000000;
	}
</style>
