<script>
    export var rating
    export var size = 0
    function setTextSize(){
        if(size == 0) return ''
        return `font-size: ${size}px`
    }
    function getTitle(){
        if(rating >= 3800) return {
            title: 'LGM',
            fullTitle: 'Legendary Grandmaster',
            color:'darkred'
        }
        if(rating >= 3500) return {
            title: 'GM',
            fullTitle: 'Grandmaster',
            color:'red'
        }
        if(rating >= 2750) return {
            title: 'M',
            fullTitle: 'Master',
            color:'blue'
        }
        if(rating >= 2200) return {
            title: 'CM',
            fullTitle: 'Candidate Master',
            color:'darkorange'
        }
        if(rating >= 1850) return {
            title: 'EX',
            fullTitle: 'Expert',
            color:'purple'
        }
        if(rating >= 1000) return {
            title: 'SP',
            fullTitle: 'Specialist',
            color:'darkcyan'
        }
        if(rating >= 500) return {
            title: 'AP',
            fullTitle: 'Apprentice',
            color:'darkgreen'
        }
        if(rating >= 250) return {
            title: 'N',
            fullTitle: 'Novice',
            color:'green'
        }
        return null
    }
    const title = getTitle()
</script>
<div class="wrapper">
    {#if getTitle()}
        <div class='badge' title={title.fullTitle} style={`${setTextSize()}; background-color: ${title.color}`}>{title.title}</div>
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