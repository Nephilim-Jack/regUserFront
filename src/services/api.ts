import axios from 'axios';
import { UserData, UserLoginData, TokenData } from './types'

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
    return await api.post<TokenData>('v1/token/login/', loginData).then(response => {
        return {
            access: response.data.access,
            refresh: response.data.refresh
        } as TokenData
    })
}