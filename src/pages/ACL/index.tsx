import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { getUserSession, refreshCookieName } from '../../utils/sessions'

const AccessLevelControl: FC = (props) => {
    const history = useHistory()
    const loadRoutes = () => {
        if (refreshCookieName){
            if (getUserSession(refreshCookieName) !== -1) {
                return props.children
            } else {
                history.push('/login')
            }
        }
    }
    return (
        <>{loadRoutes()}</>
    )
}

export default AccessLevelControl