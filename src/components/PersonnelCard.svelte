<script lang="ts">
    export var staffName:string;
    export var staffYT:string;
    export var staffFB:string;
    export var staffGH:string;
    export var staffAvatar:string;
</script>
<style lang="scss">
    p {
        margin: 0 0 0 0;
    }
    .staff_Card {
        width: calc(100%);
        height: 192px;
        display: flex;
        align-items: center;
        border-radius: 48px;
        margin: 0px auto 16px auto;
    }
    .c_inlineWrap {
        display: flex;
        flex-direction: row;
        width: calc(100% - 64px);
        margin: 0 auto 0 auto;
    }
    .c_avatar {
        height: 128px;
        width: 128px;
        border-radius: 64px;
        margin: 0 32px 0 0;
    }
    .c_flexCol {
        display: flex;
        flex-direction: column;
    }
    .c_flexRow {
        display: flex;
        flex-direction: row;
    }
    .c_name {
        font-size: 32px;
        margin: 16px 0 0 0
    }
    .c_icon {
        width: 32px;
        height: 32px;
        margin-left: 2px;
        margin-right: 30px;
        margin-top: 16px;
    }
</style>
<div class="staff_Card">
    <div class="c_inlineWrap">
        <img src={staffAvatar} class="c_avatar" alt="avatar">
        <div class="c_flexCol">
            <p class="c_name">{staffName}</p>
            <div class="c_flexRow">
                <!-- svelte-ignore empty-block -->
                {#if staffYT == "#!" || staffYT == ""}{:else}
                <a href={staffYT}><img class="c_icon" src="../youtube.svg" alt="youtube"></a>
                {/if}
                <!-- svelte-ignore empty-block -->
                {#if staffFB == "#!" || staffFB == ""}{:else}
                <a href={staffFB}><img class="c_icon" src="../facebook.svg" alt="facebook"></a>
                {/if}
                <!-- svelte-ignore empty-block -->
                {#if staffGH == "#!" || staffGH == ""}{:else}
                    <a href={staffGH}><img class="c_icon" src="../github.svg" alt="github"></a>
                {/if}
            </div>
        </div>  
    </div>
</div>