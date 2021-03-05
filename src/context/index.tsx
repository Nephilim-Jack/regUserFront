import {useContext, createContext, FC, useState} from 'react'

const ContextWrapper = createContext(
    {
        userName: 'Visitante', 
        setUserName: (value: string) => {}}
    )

const PageContext: FC = (props) => {
    const [userName, setUserName] = useState('Visitante')
    return (
        <ContextWrapper.Provider
        value={{userName, setUserName}}
        >
            {props.children}
        </ContextWrapper.Provider>
    )
}

export const useNameContext = () => {
    const {userName, setUserName} = useContext(ContextWrapper)
    return {userName, setUserName}
}

export default PageContext