import axios from "axios"
import {jwtDecode}from "jwt-decode"

export const BASEUrl = "http://127.0.0.1:8000/api/"
export const BASEIMAGEUrl = "http://127.0.0.1:8000"

export const api = axios.create({
    baseURL: BASEUrl
})

export const securedApi = axios.create({
    baseURL: BASEUrl
})

securedApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access")
        
        if (token) {
            const decodedToken = jwtDecode(token)
            const date_exp = decodedToken.exp
            const date_act = Date.now() / 1000

            if (date_exp > date_act) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    }
)
