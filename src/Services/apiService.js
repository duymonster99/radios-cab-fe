import axios from "axios"

// service 1

export const getApi = async (apiUrl) => {
    const response = await axios.get(`http://localhost:5047/api/${apiUrl}`)
    return response.data.data
}

export const postApi = async ({ url, data }) => {
    const response = await axios.post(`http://localhost:5047/api/${url}`, data)
    console.log(response.data);
    return response.data
}

export const getOneApi = async (apiUrl) => {
    const { data } = await axios.get(`http://localhost:5047/api/${apiUrl}`)
    return data.data
}

// service 2
export const getApiService2 = async (apiUrl) => {
    const response = await axios.get(`https://localhost:60323/api/${apiUrl}`)
    return response.data
}