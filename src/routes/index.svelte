
<script>
  import Header from "../components/Header.svelte";
  import Topbar from "../components/Topbar.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Levels from "../components/Levels.svelte";
  import LevelCard from "../components/LevelCard.svelte";

  let title = "Feature List";
  let desc = "Levels created and beaten by Vietnamese"
</script>

<main>
  <Topbar />
    <div class="container">
      <Sidebar />
      <section>
        <Header title={title} description={desc} /> 
        <hr>
        <Levels />
      </section>
    </div>
</main>

<style lang="scss">
  main {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .container {
    display: grid;
    grid-template-columns: 50px 100%;
    grid-template-areas: "nav content";
    width: 95%;
  }

  section {
    width: 60%;
    grid-area: content;

    justify-self: center;
  }
</style>
