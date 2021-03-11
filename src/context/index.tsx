import {useContext, createContext, FC, useState, useEffect} from 'react'
import {getUserSession, refreshCookieName} from '../utils/sessions'

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
    useEffect(() => {
        if(refreshCookieName){
            if (userName === 'Visitante' && getUserSession(refreshCookieName) !== -1) {
                if (localStorage.getItem('username')) {
                    setUserName(localStorage.getItem('username') as string)
                } else {
                    setUserName('Visitante')
                }
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