import axios, { type AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})


export const fetcher = (url: string, options: AxiosRequestConfig = {}) => {
  const data = api.get(url, options)
    .then((res) => res.data)
  return data
}