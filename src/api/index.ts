import axios, { type AxiosInstance } from "axios";

export function createApi(): AxiosInstance {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;
    
    let headers = {}
    if (import.meta.env.DEV) {
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
