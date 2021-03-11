import axios from 'axios';
import { UserData, UserLoginData, TokenData } from './types'
import { 
    getUserSession, createUserSession, 
    accessCookieName, refreshCookieName
 } from '../utils/sessions'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

const setApiInterceptors = async () => {
    if (accessCookieName){
        const accessCookieValue = getUserSession(accessCookieName)
        if (accessCookieValue !== -1) {
            api.interceptors.request.use((config) => {
                config.headers['Authorization'] = `Bearer ${accessCookieValue}`
                return config
            }, (err) => {Promise.reject(err)}
            )
        }
    }
    
    api.interceptors.response.use(
        response => response,
        async (err) => {
            if (err.config && err.response && err.response.status === 401) {
                await refreshToken()
                return axios.request(err.config)
            }
        }
    )
}
setApiInterceptors()

export const getUserByUserName = async (userName: string) => {
    return await api.get<UserData>(`v1/users/byUsername/${userName}`).then(response => {
        return response.data
    })
}

export const createUser = async (userData: UserData) => {
    return await api.post<UserData>('v1/users/', userData).then(response => {
        return response.data
    })
}

export const updateUser = async (userData: UserData) => {
    await api.patch('v1/users/', userData)
}

const getUsername = async (userLogin: UserLoginData) => {
    return await api.post<UserData>('v1/users/getUserLogin/', userLogin).then(response => {
        if (response) {
            return response.data.username
        } else {
            return ''
        }
    })
}

export const loginUser = async (userLogin: UserLoginData) => {
    const loginData = {
        username: await getUsername(userLogin),
        password: userLogin.password,
    }
    return await api.post<TokenData>('token/login/', loginData).then(response => {
        if (accessCookieName && refreshCookieName && response){
            createUserSession(accessCookieName, response.data.access)
            createUserSession(refreshCookieName, response.data.refresh)
            localStorage.setItem('username', loginData.username)
        }
        return {
            username: loginData.username
        }
    })
}

export const refreshToken = async () => {
    let refresh = ''
    if (refreshCookieName){
        const refreshValue = getUserSession(refreshCookieName)
        refresh = refreshValue !== -1? refreshValue : ''
    }
    if (refresh !== '') {
        await api.post<TokenData>('token/refresh/', {refresh}).then(response => {
            if (accessCookieName) {
                createUserSession(accessCookieName, response.data.access)
            }
        })
    }
}

export default api