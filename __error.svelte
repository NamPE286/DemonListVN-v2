<script lang="ts">
    import { page } from '$app/stores';
    var server:string = "https://discord.gg/hgTSD6eM7D";
</script>
<style lang="scss">
    a {
        text-decoration: none;
        color: white;
        font-weight: 600;
    }
    a:hover {
        text-decoration: underline;
    }
    p {
        margin: 0 0 4px 0;
    }
    .errorWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        .e_title {
            font-size: 80px;
            font-weight: 500;
        }
        .e_desc {
            font-family: monospace;
        }
    }
</style>
<div class="errorWrapper">
    <p class="e_title">{$page.status}</p> 
    <p class="e_desc">{$page.error.message}</p>
    <p class="e_desc">If you believe this is an error, message a developer <a href={server}>here</a></p>
    <!-- abc xyz -->
</div>