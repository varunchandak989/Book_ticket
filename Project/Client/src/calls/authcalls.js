import axios from 'axios'
import { API_BASE_URL } from './config.js'

const api = axios.create({
    baseURL : API_BASE_URL,
    withCredentials: true
})

export const register = async(values)=>{
    try {
       const response = await api.post('/api/auth/register' , values)
       return response.data
    } catch (error) {
        console.log(error)
    }
}

export const login = async(values)=>{
    try {
       const response = await api.post('/api/auth/login' , values)
       return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getCurrentUser = async()=>{
    try {
    // endpoint uses server route '/current-user' and axios instance already sets withCredentials
    const response = await api.get('/api/auth/curren-user')
       if (response.data && typeof response.data === 'object') {
         return {
           _id: response.data._id,
           name: response.data.name,
           email: response.data.email,
           role: response.data.role,
         };
       }
       return response.data
    } catch (error) {
        console.log('Error getting current user:', error.response?.data || error.message)
        // Return null instead of undefined when there's an error
        return null
    }
}

export const logout = async()=>{
    try {
    // axios instance is configured with withCredentials: true so no extra config/body needed
    const response = await api.post('/api/auth/logout')
       return response.data
    } catch (error) {
        console.log('Error logging out:', error.response?.data || error.message)
        return { success: false, message: 'Logout failed' }
    }
}