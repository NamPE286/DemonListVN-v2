<script>
    export var rating
    export var size = 0
    function setTextSize(){
        if(size == 0) return ''
        return 'font-size: 15px'
    }
    function getTitle(){
        if(rating >= 3800) return 'LGM'
        if(rating >= 3500) return 'GM'
        if(rating >= 2750) return 'M'
        if(rating >= 2200) return 'CM'
        if(rating >= 1850) return 'EX'
        if(rating >= 1000) return 'SP'
        if(rating >= 500) return 'AP'
        if(rating >= 250) return 'N'
        return ''
    }
    function getFullTitle(){
        if(rating >= 3800) return 'Legendary Grandmaster'
        if(rating >= 3500) return 'Grandmaster'
        if(rating >= 2750) return 'Master'
        if(rating >= 2200) return 'Candidate Master'
        if(rating >= 1850) return 'Expert'
        if(rating >= 1000) return 'Specialist'
        if(rating >= 500) return 'Apprentice'
        if(rating >= 250) return 'Novice'
        return ''
    }
    function getColor(){
        if(rating >= 3800) return 'darkred'
        if(rating >= 3500) return 'red'
        if(rating >= 2750) return 'blue'
        if(rating >= 2200) return 'darkorange'
        if(rating >= 1850) return 'purple'
        if(rating >= 1000) return 'darkcyan'
        if(rating >= 500) return 'darkgreen'
        if(rating >= 250) return 'green'
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