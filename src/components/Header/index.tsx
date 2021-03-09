import {useNameContext} from '../../context/index'
import {
    HeaderContainer, HeaderMessage, PageWrapper
} from './styles'
import {getUserSession, refreshCookieName} from '../../utils/sessions'

const Header = () => {
    const {userName} = useNameContext()
    const loadUserMessage = () => {
        if (refreshCookieName){
            if (getUserSession(refreshCookieName) === -1) {
                return `Olá ${userName}, você precisa logar para visualizar o sistema!`
            } else {
                return `Olá ${userName}, bem vindo ao nosso sistema!`
            }
        }
    }
    return (
        <>
            <HeaderContainer>
                <HeaderMessage>{loadUserMessage()}</HeaderMessage>
            </HeaderContainer>
            <PageWrapper />
        </>
    )
}

export default Header