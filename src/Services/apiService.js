import axios from "axios"
const apiService2 = import.meta.env.VITE_API_URL_ADMIN
const apiServiceCompany = import.meta.env.VITE_API_URL_COMPANY
const apiServiceDriver = import.meta.env.VITE_API_URL_DRIVER


// service company
export const getCompanyService = async (apiUrl) => {
    const response = await axios.get(`${apiServiceCompany}/${apiUrl}`)
    return response.data
}

export const postCompanyService = async ({ url, data }) => {
    const response = await axios.post(`${apiServiceCompany}/${url}`, data)
    return response.data
}

export const getOneCompanyService = async (apiUrl) => {
    const { data } = await axios.get(`${apiServiceCompany}/${apiUrl}`)
    return data
}

export const putCompanyService = async ({ url, data }) => {
    const response = await axios.put(`${apiServiceCompany}/${url}`, data)
    return response.data
}

export const deleteCompanyService = async ({ url }) => {
    const { data } = await axios.delete(`${apiServiceCompany}/${url}`)
    return data
}

// service driver
export const getDriverService = async (apiUrl) => {
    const response = await axios.get(`${apiServiceDriver}/${apiUrl}`)
    return response.data.data
}

export const postDriverService = async ({ url, data }) => {
    const response = await axios.post(`${apiServiceDriver}/${url}`, data)
    return response.data
}

export const getOneDriverService = async (apiUrl) => {
    const { data } = await axios.get(`${apiServiceDriver}/${apiUrl}`)
    return data ?? {}
}

export const putDriverService = async ({ url, data }) => {
    const response = await axios.put(`${apiServiceDriver}/${url}`, data)
    return response.data
}

export const deleteDriverService = async ({ url }) => {
    const { data } = await axios.delete(`${apiServiceDriver}/${url}`)
    return data
}

// service admin
export const getAdminService = async (apiUrl) => {
    const response = await axios.get(`${apiService2}/${apiUrl}`)
    return response.data
}

export const postAdminService = async ({ url, data }) => {
    const response = await axios.post(`${apiService2}/${url}`, data)
    return response.data
}

export const putAdminService = async ({ url, data }) => {
    const response = await axios.put(`${apiService2}/${url}`, data)
    return response.data
}

export const deleteAdminService = async ({ url }) => {
    const response = await axios.delete(`${apiService2}/${url}`)
    return response.data
}