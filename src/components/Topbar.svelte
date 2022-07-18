
<main>
  <div class="left">
    <a href="#!">
      <svg id="menuIcon" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"></path></svg>
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
  svg {
      filter: invert(1);
    }

  main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 97%;
      margin: 0 20px;
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
