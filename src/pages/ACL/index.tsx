import { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { getUserSession, refreshCookieName } from '../../utils/sessions'

const AccessLevelControl: FC = (props) => {
    const history = useHistory()
    const location = useLocation()
    const loadRoutes = () => {
        if (refreshCookieName){
            if (getUserSession(refreshCookieName) !== -1) {
                return props.children
            } else {
            }
        }
    }
    return (
        <>{loadRoutes()}</>
    )
}

export default AccessLevelControl