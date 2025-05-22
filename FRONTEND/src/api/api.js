import Axios from "axios"

import { jwtDecode } from "jwt-decode"

export const BaseUrl= "http://127.0.0.1:8000/api/"
export const BASEUrl= "http://127.0.0.1:8000"

export const api = Axios.create({
    baseURL:BaseUrl
})


api.interceptors.request.use(

    (config) =>{

        const token = localStorage.getItem("access")
        if (token){
            const tokens = jwtDecode(token)
            const date_exp = tokens.exp
            const date_act =Date.now()/1000
            if (date_exp > date_act){
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config

    },
    (error)=>{
        return Promise.reject(error)
    }

)