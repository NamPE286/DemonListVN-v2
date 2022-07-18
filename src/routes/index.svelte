<script>
  import Topbar from '../components/Topbar.svelte'
  import Sidebar from '../components/Sidebar.svelte'
</script>

<main>
    <Sidebar />
  <div class="container">
  <Topbar />
  </div>
</main>

<style>
  main {
      margin: 10px 0;
      display: flex;
  }

  .container {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
</style>
