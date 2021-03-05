import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import {getUserSession} from '../../utils/sessions'

const AccessLevelControl: FC = (props) => {
    const history = useHistory()
    const loadRoutes = () => {
        if (getUserSession() !== -1) {
            return props.children
        } else {
            history.push('/login')
        }
    }
    return (
        <>{loadRoutes()}</>
    )
}

export default AccessLevelControl