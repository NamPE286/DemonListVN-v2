<script>
    function showHightlight(s){
        const u = 'list'
        if(s == u) return 'barItem'
        return 'hide'
    }
    function showTitle(s){
        const u = 'list'
        if(s == u) return ''
        return 'hideText'
    }
</script>
<div class="sidebar">
    <svg id="menuIcon" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>
    <a href='#!'>
        <div class={showHightlight('list')}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M8 17q.425 0 .713-.288Q9 16.425 9 16t-.287-.713Q8.425 15 8 15t-.713.287Q7 15.575 7 16t.287.712Q7.575 17 8 17Zm0-4q.425 0 .713-.288Q9 12.425 9 12t-.287-.713Q8.425 11 8 11t-.713.287Q7 11.575 7 12t.287.712Q7.575 13 8 13Zm0-4q.425 0 .713-.288Q9 8.425 9 8t-.287-.713Q8.425 7 8 7t-.713.287Q7 7.575 7 8t.287.712Q7.575 9 8 9Zm3 8h6v-2h-6Zm0-4h6v-2h-6Zm0-4h6V7h-6ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14ZM5 5v14V5Z"/></svg>
        </div>
    </a>
    <a class={showTitle('list')}>List</a>
    <a href='#!' id='bottomIcon'>
        <div class={showHightlight('settings')}>
            <svg id='bottomIcon' xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9.25 22-.4-3.2q-.325-.125-.612-.3-.288-.175-.563-.375L4.7 19.375l-2.75-4.75 2.575-1.95Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337L1.95 9.375l2.75-4.75 2.975 1.25q.275-.2.575-.375.3-.175.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3.287.175.562.375l2.975-1.25 2.75 4.75-2.575 1.95q.025.175.025.337v.675q0 .163-.05.338l2.575 1.95-2.75 4.75-2.95-1.25q-.275.2-.575.375-.3.175-.6.3l-.4 3.2Zm2.8-6.5q1.45 0 2.475-1.025Q15.55 13.45 15.55 12q0-1.45-1.025-2.475Q13.5 8.5 12.05 8.5q-1.475 0-2.488 1.025Q8.55 10.55 8.55 12q0 1.45 1.012 2.475Q10.575 15.5 12.05 15.5Zm0-2q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588.662-.387 1.212-.937l2.475 1.025.975-1.7-2.15-1.625q.125-.35.175-.738.05-.387.05-.787t-.05-.788q-.05-.387-.175-.737l2.15-1.625-.975-1.7-2.475 1.05q-.55-.575-1.212-.963-.663-.387-1.438-.587L13 4h-1.975l-.35 2.65q-.775.2-1.437.587-.663.388-1.213.938L5.55 7.15l-.975 1.7 2.15 1.6q-.125.375-.175.75-.05.375-.05.8 0 .4.05.775t.175.75l-2.15 1.625.975 1.7 2.475-1.05q.55.575 1.213.962.662.388 1.437.588Z"/></svg>
        </div>
    </a>
    <a class={showTitle('settings')}>Settings</a>
    <a>
        <div class={showHightlight('info')}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 17h2v-6h-2Zm1-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>
        </div>
    </a>
    <a class={showTitle('info')}>Info</a>
</div>

<style lang='scss'>
    .sidebar{
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 65px;
        height: 100%;
        z-index: 1;
        padding-top: 12px;
        padding-bottom: 12px;
        svg{
            filter: invert(1);
        }
        #bottomIcon{
            margin-top: auto;
        }
        #menuIcon{
            margin-bottom: 12px;
        }
        .barItem{
            background-color: #2e2e2e;
            padding-inline: 10px;
            padding-top: 6px;
            padding-bottom: 3px;
            border-radius: 16px;
        }
        a{
            font-size: 12px;
            margin-top: 12px;
            margin-bottom: 12px;
        }
    }
    .hide{
        background-color: transparent;
        padding-inline: 10px;
        padding-top: 6px;
        padding-bottom: 3px;
        border-radius: 16px;
    }
    .hideText{
        opacity: 0;
    }
</style>
