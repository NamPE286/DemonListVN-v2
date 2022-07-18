<script>
  export let link
  export let func
  export let title

  if (func == undefined) {
      func = () => {}
    }

  if (title == undefined) {
      title = ""
    }
</script>

<div class="wrapper">
  <a href={link == undefined ? "#!" : link} class="button"
     on:click={func}>
    <slot />
  </a>
  <small>{title}</small>
</div>

<style>
  .wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;
      transition: background 0.3s ease-out;
    }

  .button {
      display: flex;
      justify-content: center;

      border-radius: 16px;
      padding: 6px;
      width: 80%;
      transition: background 0.3s ease-out;
  }


  small {
      visibility: hidden;
      color: #2e2e2e;
      transition: color 0.3s ease-out, visibility 0.3s ease-out;
    }

  .wrapper:hover > .button {
      background: #2e2e2e;
    } 

  .wrapper:hover > small {
      visibility: visible;
      color: #fff;
    }

  
</style>
