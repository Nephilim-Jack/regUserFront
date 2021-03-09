import {useContext, createContext, FC, useState} from 'react'
import api, {refreshToken} from '../services/api'
import axios from 'axios'

const ContextWrapper = createContext(
    {
        userName: 'Visitante', 
        setUserName: (value: string) => {},
        accessToken: '',
        setAccessToken: (value: string) => {},
    }
    )

const PageContext: FC = (props) => {
    const [userName, setUserName] = useState('Visitante')
    const [accessToken, setAccessToken] = useState('')

    const setAapiInterceptors = async () => {
        api.interceptors.request.use((config) => {
            if (accessToken !== '') {
                config.headers['Authorization'] = `Bearer ${accessToken}`
            }
            return config
        }, (err) => {Promise.reject(err)}
        )
        
        api.interceptors.response.use(
            response => response,
            async (err) => {
                if (err.config && err.response && err.response.status === 401) {
                    const token = (await refreshToken())?.access
                    if (token) {
                        setAccessToken(token)
                    }
                    return axios.request(err.config)
                }
            }
        )
    }
    setAapiInterceptors()
    return (
        <ContextWrapper.Provider
        value={
            {
                userName, setUserName, 
                accessToken, setAccessToken
            }
        }
        >
            {props.children}
        </ContextWrapper.Provider>
    )
}

export const useNameContext = () => {
    const {userName, setUserName} = useContext(ContextWrapper)
    return {userName, setUserName}
}

export const useAccessToken = () => {
    const {accessToken, setAccessToken} = useContext(ContextWrapper)
    return {accessToken, setAccessToken}
}

export default PageContext