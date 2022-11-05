const go = () =>
{
    const titles = document.querySelectorAll( '.news_tit' )
    const titleTexts = [...titles].map( n => n.text )
    const filtered = titleTexts.map( ( t, i ) =>
    {
        if ( t.includes( '고독사' ) && !t.includes( '예방' ) ) {return i}
        else
            return -1
    } )
    console.log( filtered )
    const hasOnlyKeyword = filtered.some( n => n !== -1 )
    console.log( hasOnlyKeyword )
    if ( !hasOnlyKeyword )
    {
        const nextBttn = document.querySelector( '.btn_next' )
        nextBttn.click()
    }
}

go()