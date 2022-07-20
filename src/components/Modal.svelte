<script lang="ts">

</script>

<style lang="scss">
button {
    border: none;
    font-family: 'Roboto Flex', 'Roboto', sans-serif;
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
    font-weight: 400;
    font-size: 48px;
}
.s_margin3 {
    margin: 32px 0px 24px 0px;
}
.s_margin4 {
    margin: 32px 32px 16px 32px;
}
.s_margin5 {
    margin: 16px 32px 24px 0px;
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
}
.s_input {
    background-color: #2d2d2d;
    width: calc(100% - 96px);
    border-radius: 20px;
    margin-bottom: 8px;
    padding: 16px 16px 16px 16px;
    border: none;
    color: #fff;
    font-family: 'Roboto Flex', 'Roboto', sans-serif;
    font-size: 18px;
}
.s_input::placeholder { 
    position: relative;
    font-family: 'Roboto Flex', 'Roboto', sans-serif;
    font-size: 18px;
}
.s_input:focus {
    outline: none;
    border: 0;
    background-color: #333333;
    transition: all 0.25s ease-in-out;
}
.s_red {
    background-color: #f90000;
}
.s_blue {
    background-color: #005FF9;
}
.s_shadow {
    box-shadow: 0px 0px 32px #000000;
}
</style>
<div style="display: flex; justify-content: center; align-items: center; transition: all 0.25s ease-in-out;">
    <div class="submitModal s_shadow">
        <div class="s_flexrow" style="align-items: flex-end;">
            <p class="s_title s_margin4">Submit</p>
            <button class="s_button s_margin3">View rules</button>
        </div>
        <div class="s_flexcol" style="align-items: center;">
            <input class="s_input" placeholder="Submit to...">
            <input class="s_input" placeholder="Player name...">
            <input class="s_input" placeholder="Level name...">
            <input class="s_input" placeholder="Record Percentage...">
            <input class="s_input" placeholder="FPS value...">
            <input class="s_input" placeholder="Video link...">
            <input class="s_input" placeholder="Additional comments...">             
        </div>
        <div class="s_flexrow" style="justify-content: flex-end;">
            <button class="s_button2 s_margin6 s_red">Cancel</button>
            <button class="s_button2 s_margin5 s_blue">Submit</button>
        </div>
    </div>
</div>

