<script>
    export var rating
    export var size = 0
    function setTextSize(){
        if(size == 0) return ''
        return `font-size: ${size}px`
    }
    function getTitle(){
        if(rating >= 4200) return {
            title: 'LGM',
            fullTitle: 'Legendary Grandmaster',
            color:'darkred'
        }
        if(rating >= 3900) return {
            title: 'SGM',
            fullTitle: 'Super Grandmaster',
            color:'red'
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
        if(rating >= 2800) return {
            title: 'CM',
            fullTitle: 'Candidate Master',
            color:'darkorange'
        }
        if(rating >= 2500) return {
            title: 'EX',
            fullTitle: 'Expert',
            color:'purple'
        }
        if(rating >= 2350) return {
            title: 'S+',
            fullTitle: 'S+',
            color:'gold'
        }
        if(rating >= 2200) return {
            title: 'S',
            fullTitle: 'S',
            color:'gold'
        }
        if(rating >= 2000) return {
            title: 'S-',
            fullTitle: 'S-',
            color:'gold'
        }
        if(rating >= 1800) return {
            title: 'A+',
            fullTitle: 'A+',
            color:'green'
        }
        if(rating >= 1600) return {
            title: 'A',
            fullTitle: 'A',
            color:'green'
        }
        if(rating >= 1400) return {
            title: 'A-',
            fullTitle: 'A-',
            color:'green'
        }
        if(rating >= 1200) return {
            title: 'B+',
            fullTitle: 'B+',
            color:'#413cde'
        }
        if(rating >= 1000) return {
            title: 'B',
            fullTitle: 'B',
            color:'#413cde'
        }
        if(rating >= 800) return {
            title: 'B-',
            fullTitle: 'B-',
            color:'#413cde'
        }
        if(rating >= 600) return {
            title: 'C+',
            fullTitle: 'C+',
            color:'gray'
        }
        if(rating > 0) return {
            title: 'C',
            fullTitle: 'C',
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
        color: white;
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