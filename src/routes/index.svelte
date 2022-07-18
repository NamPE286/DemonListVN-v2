<script>
  import Topbar from '../components/Topbar.svelte'
  import Sidebar from '../components/Sidebar.svelte'
</script>

<main>
  <Topbar />
  <div class="container">
    <Sidebar />
  </div>
</main>

<style>
  main {
      margin: 10px 0;
  }
</style>
