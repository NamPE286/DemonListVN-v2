<script lang="ts">
	export var name:string;
    export var key:string;
    var fileinput
    function apply(e){
        let image = e.target.files[0];
        let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                let val = String(e.target.result)
                localStorage.setItem(key, val);
                window.location.reload()
            };
    }
</script>

<div class="titleWidget">
    <p class="sl_name">{name}</p>
    <button on:click={() =>{fileinput.click()}} class="right">Choose image</button>
    <button on:click={() =>{
        localStorage.setItem(key, '');
        window.location.reload()
    }}>Clear BG</button>
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
