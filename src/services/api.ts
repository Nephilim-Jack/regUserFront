import axios from 'axios';
import { UserData, UserLoginData } from './types'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

export const createUser = async (userData: UserData) => {
    await api.post('v1/users/', userData).then(response => {
        console.log(response.status);
    })
}

export const getUsername = async (userLogin: UserLoginData) => {
    await api.post<UserData>('v1/users/getUserLogin/', userLogin).then(response => {
        return response.data.username
    })
}