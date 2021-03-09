import axios from 'axios';
import { UserData, UserLoginData, TokenData } from './types'
import { 
    getUserSession, createUserSession, 
    accessCookieName, refreshCookieName
 } from '../utils/sessions'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

export const createUser = async (userData: UserData) => {
    await api.post('v1/users/', userData).then(response => {
        console.log(response.status);
    })
}

const getUsername = async (userLogin: UserLoginData) => {
    return await api.post<UserData>('v1/users/getUserLogin/', userLogin).then(response => {
        return response.data.username
    })
}

export const loginUser = async (userLogin: UserLoginData) => {
    const loginData = {
        username: await getUsername(userLogin),
        password: userLogin.password,
    }
    return await api.post<TokenData>('token/login/', loginData).then(response => {
        if (accessCookieName && refreshCookieName){
            createUserSession(accessCookieName, response.data.access)
            createUserSession(refreshCookieName, response.data.refresh)
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