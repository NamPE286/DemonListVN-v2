<script lang="ts">
    import { fade } from 'svelte/transition';
	import { userdata } from '../routes/stores'
	var user;
	userdata.subscribe(value => {
		user = value
		console.log(value)
	})
	export var ifShow: boolean;
</script>

{#if ifShow}
<div out:fade="{{duration: 200}}">
	<div
		class="dimBg"
		on:click={() => {
			ifShow = !ifShow;
		}}
        in:fade="{{duration: 150}}"
	/>
	<div
		style="display: flex; justify-content: center; align-items: center; transition: all 0.25s ease-in-out;"
		class="modalWrapper"
	>
		<div class="submitModal s_shadow">
			<div class="s_flexrow" style="align-items: flex-end;">
				<p class="s_title s_margin4">Submit</p>
				<button class="s_button s_margin3"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M11.667 8.333v-1.5q.687-.291 1.406-.437.719-.146 1.51-.146.542 0 1.063.083.521.084 1.021.209v1.416q-.5-.187-1.011-.281-.51-.094-1.073-.094-.791 0-1.521.198-.729.198-1.395.552Zm0 4.5v-1.5q.687-.291 1.406-.437.719-.146 1.51-.146.542 0 1.063.083.521.084 1.021.209v1.416q-.5-.187-1.011-.281-.51-.094-1.073-.094-.791 0-1.521.188-.729.187-1.395.562Zm0-2.25v-1.5q.687-.291 1.406-.437.719-.146 1.51-.146.542 0 1.063.083.521.084 1.021.209v1.416q-.5-.187-1.011-.281-.51-.094-1.073-.094-.791 0-1.521.198-.729.198-1.395.552ZM5.458 13.25q.959 0 1.865.219t1.802.614V6.021q-.833-.479-1.771-.708-.937-.23-1.896-.23-.729 0-1.468.125-.74.125-1.407.396v8.125q.729-.229 1.438-.354.708-.125 1.437-.125Zm5.417.833q.896-.395 1.802-.614.906-.219 1.844-.219.75 0 1.448.125t1.448.375V5.667q-.709-.292-1.427-.438-.719-.146-1.469-.146-.938 0-1.886.23-.947.229-1.76.708ZM10 16.667q-.979-.792-2.135-1.229Q6.708 15 5.458 15q-.896 0-1.75.26-.854.261-1.646.678-.416.229-.822-.011-.407-.239-.407-.719V5.083q0-.229.115-.416.114-.188.323-.292.979-.521 2.031-.781 1.052-.261 2.156-.261 1.188 0 2.344.302 1.156.303 2.198.907 1.042-.604 2.188-.907 1.145-.302 2.333-.302 1.104 0 2.156.271t2.052.771q.209.104.323.292.115.187.115.416v10.125q0 .48-.407.719-.406.24-.843.011-.792-.438-1.646-.688-.854-.25-1.75-.25-1.25 0-2.396.438-1.146.437-2.125 1.229Zm-4.146-7Z"/></svg><a href='#!'>View rules</a></button>
			</div>
			<div class="s_flexcol" style="align-items: center;">
				<select class="s_select">
					<option value="Demon List">Demon List</option>
					<option value="Featured List">Featured List</option>
				</select>
				<input class="s_input" value={user.data.data.name} readonly={true} />
				<input class="s_input" placeholder="Level name" />
				<input class="s_input" placeholder="Progress" type="number" />
				<input class="s_input" placeholder="FPS" type="number" />
				<input class="s_input" placeholder="Video link" />
				<input class="s_input" placeholder="Comment (optional)" />
			</div>
			<div class="s_flexrow buttonWrapper" style="justify-content: flex-end;">
				<a
					href="#!"
					class="s_button2 s_margin6 s_red"
					on:click={() => {
						ifShow = !ifShow;
					}}>Cancel</a
				>
				<a href="#!" class="s_button2 s_margin5 s_blue">Submit</a>
			</div>
		</div>
	</div>

</div>
{/if}

<style lang="scss">
	.dimBg {
		position: fixed;
		margin-top: -135px;
		height: 200%;
		width: 200%;
		background-color: black;
		z-index: 2;
		opacity: 0.5;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.modalWrapper {
		z-index: 3;
	}
	button {
		border: none;
		color: white;
		a{
			text-decoration: none;
			color: white;
		}
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
		font-size: 42px;
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
		width: 125px;
		border-radius: 14px;
		font-weight: 350;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.3s;
		a{
			margin-left: 10px;
		}
		svg{
			filter: invert(1);
		}
	}
	.s_button:hover{
		background-color: #424242;
		transition: 0.3s;
	}
	.s_button:active:hover{
		background-color: #808080;
		transition: 0.15s;
	}
	.s_button2 {
		height: 36px;
		width: 96px;
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
		font-size: 16px;
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
		font-size: 16px;
		transition: all 0.25s ease-in-out;
	}
	.s_input::placeholder {
		position: relative;
		font-family: "Roboto Flex", "Roboto", sans-serif;
		font-size: 16px;
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
		transition: 0.3s;
	}
	.s_blue {
		background-color: #005ff9;
		transition: 0.3s;
	}
	.s_blue:active:hover{
		background-color: #0040a7;
		transition: 0.15s;
	}
	.s_shadow {
		box-shadow: 0px 0px 32px #000000;
	}
	@media screen and (max-width: 1250px) {
		.submitModal {
			width: 65%;
		}
	}
	@media screen and (max-width: 750px) {
		.submitModal {
			width: 95%;
		}
		.s_input {
			width: calc(100% - 66px);
		}
		.s_select {
			width: calc(100% - 36px);
		}
		.s_margin4 {
			margin: 32px 16px 16px 22px;
		}
		.s_margin5 {
			margin: 16px 22px 24px 0px;
		}
	}
</style>
