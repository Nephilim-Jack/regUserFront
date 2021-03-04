import axios from 'axios';
import { UserData } from './types'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/'
})

export const createUser = async (userData: UserData) => {
    await api.post('users/', userData).then(response => {
        console.log(response.status);
    })
}