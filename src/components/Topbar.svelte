
<script>
  let sidebarExpanded = false;
</script>

<main>
  <div class="left">
      <a href="#!" class="menuButton" on:click={() => sidebarExpanded = !sidebarExpanded}>
      {#if !sidebarExpanded}
        <svg id="menuIcon" xmlns="http://www.w3.org/2000/svg" ><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"></path></svg>
      {:else}
        <svg id="menuIcon" xmlns="http://www.w3.org/2000/svg" ><path d="M3 18v-2h13v2Zm16.6-1-5-5 5-5L21 8.4 17.4 12l3.6 3.6ZM3 13v-2h10v2Zm0-5V6h13v2Z"></path></svg>
      {/if}
      </a>
    <p class="title">Demon List VN</p>
  </div>
  <div class="right">
    <div class="submit">
      <h3>Submit</h3>
    </div>
  </div>
</main>

<style lang='scss'>
  :global(svg) {
    filter: invert(1);
    width: 24px;
    height: 24px;
    }

  .menuButton {
      display: flex;
      justify-content: center;

      padding: 5px;
      border-radius: 50%;
      transition: background 0.3s ease-out;
    }

  .menuButton:hover {
      background: #2e2e2e;

    }

  main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 97%;
      margin: 10px 20px 20px 20px;
    }

  main > div {
      display: flex;
      align-items: center;
      gap: 30px;
      height: auto;
    }

  .title {
      font-weight: 600;
    }

  .submit {
      padding: 0.75em 1.25em;
      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 20px;

      background: #005ff9;
    }

  .submit > h3 {
      margin: 0;
    }
</style>
