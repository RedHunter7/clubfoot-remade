import axios, { type AxiosInstance } from "axios";

export function createApi(): AxiosInstance {
    let apiUrl = "/netlify/functions";
    
    let headers = {}
    if (import.meta.env.DEV) {
        const apiKey = import.meta.env.VITE_API_KEY;
        apiUrl = import.meta.env.VITE_API_URL;
        

        headers = { 
            'X-Auth-Token': apiKey,
            "Content-Type": "application/json"
        }
    }

    return axios.create({
        baseURL: apiUrl,
        headers: headers,
        timeout: 10000,
    });
}
