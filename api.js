import axios from "axios"
import * as dotenv from 'dotenv'
dotenv.config()


console.log( process.env.API_TOKEN )

export const API_KEY = {
    SOLITARY_DEATH: {
        NAVER: 'FiB8UwCK',
    },
    ARREST: {
        NAVER: '7DbuwYms'
    },
    LOST_PEOPLE: {
        GOV: 'CJJW0Avt'
    }
}

const BASE_URL = `https://www.listly.io/api/single`
const API_URL = key => `${BASE_URL}?key=${key}&selected=1&arrange=y&href=y&file=json`
const headers = {
    headers: {'Authorization': process.env.API_TOKEN}
}



export const Listly = () =>
{
    const fetch = async ( key ) =>
    {
        const data = await axios.get( API_URL( key ), headers )
        return data
    }

    return {fetch}
}

export const fetchKeyword = async ( key ) =>
{

    const {data} = await Listly().fetch( key )
    return data

}
