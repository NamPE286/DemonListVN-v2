<script>
  export let link
</script>


<a href={link == undefined ? "#!" : link} class="button">
  <slot />
</a>

<style>
  .button {
      display: flex;
      justify-content: center;

      background: #2e2e2e;
      border-radius: 16px;
      padding: 6px;
      width: 62%;
  }
</style>
