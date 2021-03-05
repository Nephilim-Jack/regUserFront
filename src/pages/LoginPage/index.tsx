import {
    PageContainer, LoginContainer
} from './styles'
import CommonInput from '../../components/CommonInput/index'

const LoginPage = () => {
    return (
        <PageContainer>
            <LoginContainer>
                <CommonInput name='Email' type='email'/>
                <CommonInput name='CPF' type='number'/>
                <CommonInput name='PIS' type='number'/>
                <CommonInput name='Senha' type='password'/>
            </LoginContainer>
        </PageContainer>
    )
}

export default LoginPage