import {useContext, createContext, FC, useState, useEffect} from 'react'
import api, {refreshToken} from '../services/api'
import axios from 'axios'
import {getUserSession, accessCookieName, refreshCookieName} from '../utils/sessions'

interface ModalData {
    visible: boolean,
    data: any
}

const ContextWrapper = createContext(
    {
        userName: 'Visitante',
        setUserName: (value: string) => {},
        infoModalData: {
            visible: false,
            data: []
        },
        setInfoModalData: (value: ModalData) => {},
        updateInfoModalStateForTime: (value: ModalData, ms: number) => {},
    }
)

const PageContext: FC = (props) => {
    const [userName, setUserName] = useState('Visitante')
    const [infoModalData, setInfoModalData] = useState<ModalData>({
        visible: false,
        data: []
    })

    const updateInfoModalStateForTime = (value: ModalData, ms: number) => {
        setInfoModalData({
            visible: value.visible,
            data: value.data
        })
        setTimeout(() => {
            setInfoModalData({
                visible: false,
                data: []
            })
        }, ms)
    }

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
    useEffect(() => {
        if(refreshCookieName){
            if (userName === 'Visitante' && getUserSession(refreshCookieName) !== -1) {
                setUserName('NOME QUALQUER')
            }
        }
    }, [userName])
    return (
        <ContextWrapper.Provider
        value={
            {
                userName, setUserName,
                infoModalData, setInfoModalData,
                updateInfoModalStateForTime
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

export const useInfoContext = () => {
    const {infoModalData, setInfoModalData, updateInfoModalStateForTime} = useContext(ContextWrapper)
    return {infoModalData, setInfoModalData, updateInfoModalStateForTime}
}

export default PageContext