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
        if(rating >= 25) return 'N'
        return ''
    }
    function getFullTitle(){
        if(rating >= 300) return 'Legendary Grandmaster'
        if(rating >= 250) return 'Grandmaster'
        if(rating >= 200) return 'Master'
        if(rating >= 150) return 'Candidate Master'
        if(rating >= 100) return 'Expert'
        if(rating >= 75) return 'Specialist'
        if(rating >= 50) return 'Apprentice'
        if(rating >= 25) return 'Novice'
        return ''
    }
    function getColor(){
        if(rating >= 300) return 'darkred'
        if(rating >= 250) return 'red'
        if(rating >= 200) return 'blue'
        if(rating >= 150) return 'darkorange'
        if(rating >= 100) return 'purple'
        if(rating >= 75) return 'darkcyan'
        if(rating >= 50) return 'darkgreen'
        if(rating >= 25) return 'green'
        return ''
    }
</script>
<div class="wrapper">
    {#if getTitle()}
        <div class='badge' title={getFullTitle()} style={`${setTextSize()}; background-color: ${getColor()}`}>{getTitle()}</div>
    {/if}
    <slot/>
</div>
<style lang="scss">
    .wrapper{
        display: flex;
        align-items: center;
    }
    .badge{
        user-select: none;
		padding: 5px;
		border-radius: 6px;
		font-weight: 600;
		vertical-align: middle;
        margin-right: 5px;
        font-size: 10px;
	}
</style>