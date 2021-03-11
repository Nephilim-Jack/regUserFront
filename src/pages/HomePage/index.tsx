import {
    PageContainer, CustomButton, PresentationText
} from './styles'
import {deleteUserSession, accessCookieName, refreshCookieName} from '../../utils/sessions'
import {useHistory} from 'react-router-dom'
import {useNameContext} from '../../context/index'

const HomePage = () => {
    const history = useHistory()
    const {setUserName} = useNameContext()
    const logoutUser = () => {
        if (accessCookieName && refreshCookieName){
            deleteUserSession(accessCookieName)
            deleteUserSession(refreshCookieName)
            history.push('login')
            setUserName('Visitante')
        }
    }
    return (
        <PageContainer>
            <PresentationText>Infelizmente nosso sistema ainda não está concluido por isso só temos esses dois Botões</PresentationText>
            <CustomButton onClick={logoutUser}>
                Logout
            </CustomButton>
            <CustomButton onClick={() => history.push('editUser')}>
                Alterar dados cadastrais
            </CustomButton>
        </PageContainer>
    )
}

export default HomePage