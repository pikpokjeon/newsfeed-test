import {fetchKeyword, API_KEY} from "./api"
import {Popo} from "popo-dom"

const {element} = Popo

const html = element( 'html' )
const div = html( 'div' )
const img = html( 'img' )
const article = html( 'article' )
const h4 = html( 'h4' )
const p = html( 'p' )
const span = html( 'span' )

const fetchData = async ( data ) =>
{
    const lostPpl = await data
    return lostPpl
}

const main = async () =>
{
    const lostPpl = await fetchData( fetchKeyword( API_KEY.LOST_PEOPLE.GOV ) )
    const arrest = await fetchData( fetchKeyword( API_KEY.ARREST.NAVER ) )
    const arrestList = arrest.data['LABEL-8']



    const lostProfileArr = Object.values( lostPpl.data ).reduce( ( acc, cur, idx ) =>
    {
        if ( idx < 1 ) acc = Array( cur.length )

        Object.values( cur ).forEach( ( c, i ) =>
        {
            if ( idx < 1 )
            {
                const [name, gender] = c.content.split( '  ' ).map( ( text, i ) =>
                {
                    if ( i < 1 ) return text.substr( 0, text.indexOf( '(' ) )
                    else return text
                } )
                let personData = {}
                Object.assign( personData, {name, gender, link: c.href} )
                acc.push( personData )
                return acc
            } else if ( idx === 3 )
            {
                Object.assign( acc[i + 1], {img: c.content} )
                return acc
            } else if ( idx === 5 )
            {
                // console.log( c )
                const [prev, now] = c.content.split( ' ' ).map( ( age, i ) =>
                {
                    return Number( age.substr( 0, 2 ) )
                } )
                Object.assign( acc[i + 1], {lostAge: prev, curAge: now} )
                return acc
            }

        } )
        return acc

    }, [] ).filter( p => p )

    console.log( lostProfileArr )

    const profileLists = div( {id: 'list'}, [...lostProfileArr.map( info =>
        article( {class: 'profile'}, [
            img( {src: info.img, width: 120, height: 160} ),
            p( {class: 'profile-name', text: info.name}, [span( {class: `${info.gender === '여자' ? 'red' : 'blue'} ball`} )] ),
            div( [
                p( {class: 'profile-age grey', text: `실종당시:${info.lostAge}`} ),
                p( {class: 'profile-age bold', text: `현재:${info.curAge}`} )
            ] )
        ]
        ) )
    ] )
    const main = document.getElementById( 'main' )
    main.appendChild( profileLists )

}

main()