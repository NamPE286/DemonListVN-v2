<script lang="ts">
  export let title;
  export let description;
</script>

<div class="titleWidget">
        <div class="title">
                <p class="bigTitle">{title}</p>
        {#if description != undefined}
                <p class="description">{description}</p>
        {/if}
        </div>
</div>

<style lang="scss">
    .titleWidget {
            grid-area: header;
            width: 100%;
            height: 300px;
            background-color: #202020;
            border-radius: 50px;
            display: flex;
            align-items: center;
    margin-bottom: -10px;
            .title {
                    margin-left: 80px;
                    font-weight: 500;
            }
            .description {
                    font-weight: 200;
            }
            p {
                    margin: 0;
            }
            .bigTitle {
                    font-size: 50px;
                    margin-bottom: 20px;
            }
    }
</style>
