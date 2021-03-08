import {useState} from 'react'
import {
    PageContainer, LoginContainer
} from './styles'
import CommonInput from '../../components/CommonInput/index'
import {loginUser} from '../../services/api'
import {UserLoginData} from '../../services/types'
import {capitalize} from '../../utils/commonFunctions'

type UsableLogin = 'email' | 'cpf' | 'pis'


const LoginPage = () => {
    const [loginType, setLoginType] = useState<UsableLogin>('email')
    const [loginTypeValue, setLoginTypeValue] = useState('')
    const [password, setPassword] = useState('')
    

    const loginUser = () => {
        const loginData: UserLoginData = {
            cpf: '',
            email: '',
            pis: '',
            password: '',
            using: ''
        }
        let using: keyof UserLoginData = loginType.toLowerCase() as UsableLogin

        loginData[using] = loginTypeValue
        loginData.password = password
        loginData.using = loginType.toLowerCase()

        console.log(loginData)
    }

    const mountLoginTypeInput = () => {
        if (loginType === 'email') {
            return <CommonInput setValue={setLoginTypeValue} name={capitalize(loginType)} type='email'/>
        } else {
            return <CommonInput setValue={setLoginTypeValue} name={loginType.toUpperCase()} type='text'/>
        }
    }
    return (
        <PageContainer>
            <LoginContainer>
                <select name="loginType" id="" onChange={e => setLoginType(e.target.value as UsableLogin)}>
                    <option value="email">Email</option>
                    <option value="cpf">CPF</option>
                    <option value="pis">PIS</option>
                </select>
                {mountLoginTypeInput()}
                <CommonInput setValue={setPassword} name='Senha' type='password'/>
                <button onClick={loginUser}>Login</button>
            </LoginContainer>
        </PageContainer>
    )
}

export default LoginPage