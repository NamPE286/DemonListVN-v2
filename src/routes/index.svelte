<script>
    import Nav from '../components/Nav.svelte'
</script>
<Nav/>
<div class='titleWidget'>
    <div class='title'>
        <p class='bigTitle'>Featured List</p>
        <p class='description'>Levels created and beaten by Vietnamese</p>
    </div>
</div>
<style lang='scss'>
    .titleWidget{
        width: 60%;
        height: 300px;
        background-color: #202020;
        margin-inline: auto;
        border-radius: 50px;
        display: flex;
        align-items: center;
        .title{
            margin-left: 80px;
            font-weight: 500;
        }
        .description{
            font-weight: 200;
        }
        p{
            margin: 0;
        }
        .bigTitle{
            font-size: 50px;
            margin-bottom: 20px;
        }
    }
</style>