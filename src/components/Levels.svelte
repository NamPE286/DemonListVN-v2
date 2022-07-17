<script>
  import LevelCard from "./LevelCard.svelte";
</script>

<div>
   <LevelCard top="1" title="The Moon" creator="Onvil" points="1000"/>
   <LevelCard top="2" title="Summertime" creator="VN" points="1000"/>
   <LevelCard top="2" title="Summertime" creator="VN" points="1000"/>
</div>

<style>
  div {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-flow: row wrap;
      column-gap: 4%;
      row-gap: 20px;

      padding: 30px 0;
    }
</style>
