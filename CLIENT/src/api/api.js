import axios from "axios"

export const BASEUrl= "http://127.0.0.1:8000/api/"
export const BASEIMAGEUrl="http://127.0.0.1:8000"


export const api = axios.create({
    baseURL:BASEUrl
})

