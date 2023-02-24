<script>
    export var rating
    export var size = 0
    function setTextSize(){
        if(size == 0) return ''
        return `font-size: ${size}px`
    }
    function getTitle(){
        if(rating >= 4000) return {
            title: 'LGM',
            fullTitle: 'Legendary Grandmaster',
            color:'darkred'
        }
        if(rating >= 3600) return {
            title: 'GM',
            fullTitle: 'Grandmaster',
            color:'red'
        }
        if(rating >= 3000) return {
            title: 'M',
            fullTitle: 'Master',
            color:'blue'
        }
        if(rating >= 2500) return {
            title: 'CM',
            fullTitle: 'Candidate Master',
            color:'darkorange'
        }
        if(rating >= 2000) return {
            title: 'EX',
            fullTitle: 'Expert',
            color:'purple'
        }
        if(rating >= 1500) return {
            title: 'SP',
            fullTitle: 'Specialist',
            color:'darkcyan'
        }
        if(rating >= 1000) return {
            title: 'AP',
            fullTitle: 'Apprentice',
            color:'darkgreen'
        }
        if(rating >= 500) return {
            title: 'N',
            fullTitle: 'Novice',
            color:'green'
        }
        if(rating > 0) return {
            title: 'C',
            fullTitle: 'Casual',
            color:'gray'
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