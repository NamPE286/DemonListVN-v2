<script lang="ts">
    import { page } from '$app/stores';
</script>
<style lang="scss">
    a {
        text-decoration: none;
        color: white;
        font-weight: 600;
        text-decoration: underline;
    }
    p {
        margin: 0 0 4px 0;
    }
    .errorWrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        .e_icon {
            font-size: 120px;
            font-variation-settings: 'FILL' 1;
        }
        .e_title {
            font-size: 80px;
            font-weight: 525;
        }
        .e_desc {
            font-family: monospace;
        }
    }
    .divisor {
        margin-top: 16px;
    }
</style>
<div class="errorWrapper">
    <p class="material-symbols-outlined e_icon">error</p>
    <p class="e_title">Oops!</p> 
    <span class="divisor"></span>
    <p class="e_desc">Error {$page.status} {$page.error.message}</p>
    <p class="e_desc">If you believe this error should not happen, message a developer <a href="https://discord.gg/hgTSD6eM7D">here</a></p>
    <!-- abc xyz -->
</div>