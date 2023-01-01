<script>
    export var rating
    export var size = 0
    function setTextSize(){
        if(size == 0) return ''
        return 'font-size: 15px'
    }
    function getTitle(){
        if(rating >= 300) return 'LGM'
        if(rating >= 250) return 'GM'
        if(rating >= 200) return 'M'
        if(rating >= 150) return 'CM'
        if(rating >= 100) return 'EX'
        if(rating >= 75) return 'SP'
        if(rating >= 50) return 'AP'
        return ''
    }
    function getColor(){
        if(rating >= 300) return 'darkred'
        if(rating >= 250) return 'red'
        if(rating >= 200) return 'blue'
        if(rating >= 150) return 'darkorange'
        if(rating >= 100) return 'purple'
        if(rating >= 75) return 'darkcyan'
        if(rating >= 50) return 'green'
        return ''
    }
</script>
<div class="wrapper">
    {#if getTitle()}
        <div class='badge' style={`${setTextSize()}; background-color: ${getColor()}`}>{getTitle()}</div>
    {/if}
    <slot/>
</div>
<style lang="scss">
    .wrapper{
        display: flex;
        align-items: center;
    }
    .badge{
		padding: 5px;
		border-radius: 6px;
		font-weight: 600;
		vertical-align: middle;
        margin-right: 5px;
        font-size: 10px;
	}
</style>