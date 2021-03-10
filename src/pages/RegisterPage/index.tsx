import {useState} from 'react'
import {
    PageContainer, RegisterContainer,
    InputsWrapper, InputsListsWrapper,
    RegisterButton
} from './styles'
import CommonInput from '../../components/CommonInput/index'
import {UserData, Profile} from '../../services/types'
import {useInfoContext} from '../../context/index'

const RegisterPage = () => {
    const [userAddress, setUserAddress] = useState<Profile>({
        cep: 0,
        city: '',
        country: '',
        complement: '',
        cpf: 0,
        houseNumber: 0,
        pis: 0,
        state: '',
        street: ''
    })
    const [userData, setUserData] = useState<UserData>({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        profile: userAddress,
        username: ''
    })
    const {infoModalData, updateInfoModalStateForTime} = useInfoContext()

    const updateValueInUserData = (valueKey: keyof UserData, value: any) => {
        userData[valueKey] = value
        setUserData(userData)
    }
    const updateValueInUserDataProfile = (valueKey: keyof Profile, value: any) => {
        userAddress[valueKey] = value
        setUserAddress({...userAddress})
    }

    const createRequiredInfo = () => {
        return (
            <>
                <p>Todos os campos são necessários</p>
            </>
        )
    }
    const registerUser = () => {
        if (userData && userAddress){
            userData.profile = userAddress
            setUserData({...userData})
        }
        console.log(infoModalData)
        console.log(userData)
        updateInfoModalStateForTime({
            data: createRequiredInfo(),
            visible: true
        }, 5000)
    }
    const inputsUserDataList = [
        {
            name: 'Nome',
            setValue: (value: any) => updateValueInUserData('first_name', value),
            type: 'text',
            placeHolder: 'Insira o seu nome',
            required: true
        },
        {
            name: 'Email',
            setValue: (value: any) => updateValueInUserData('email', value),
            type: 'email',
            placeHolder: 'Insira o seu email',
            required: true
        },
        {
            name: 'CPF',
            setValue: (value: any) => updateValueInUserDataProfile('cpf', value),
            type: 'text',
            placeHolder: 'Insira o seu cpf',
            required: true
        },
        {
            name: 'PIS',
            setValue: (value: any) => updateValueInUserDataProfile('pis', value),
            type: 'text',
            placeHolder: 'Insira o seu pis',
            required: false
        },
        {
            name: 'Senha',
            setValue: (value: any) => updateValueInUserData('password', value),
            type: 'password',
            placeHolder: 'Insira a sua senha',
            required: true
        }
    ]
    const inputsAddressList = [
        {
            name: 'País',
            setValue: (value: any) => updateValueInUserDataProfile('country', value),
            type: 'text',
            placeHolder: 'Insira o seu país',
            required: true
        },
        {
            name: 'Estado',
            setValue: (value: any) => updateValueInUserDataProfile('state', value),
            type: 'text',
            placeHolder: 'Insira o seu estado',
            required: true
        },
        {
            name: 'Município',
            setValue: (value: any) => updateValueInUserDataProfile('city', value),
            type: 'text',
            placeHolder: 'Insira o seu município',
            required: true
        },
        {
            name: 'CEP',
            setValue: (value: any) => updateValueInUserDataProfile('cep', value),
            type: 'text',
            placeHolder: 'Insira o seu cep',
            required: true
        },
        {
            name: 'Rua',
            setValue: (value: any) => updateValueInUserDataProfile('street', value),
            type: 'text',
            placeHolder: 'Insira a sua rua',
            required: true
        },
        {
            name: 'Número',
            setValue: (value: any) => updateValueInUserDataProfile('houseNumber', value),
            type: 'text',
            placeHolder: 'Número de seu endereço',
            required: true
        },
        {
            name: 'Complemento',
            setValue: (value: any) => updateValueInUserDataProfile('complement', value),
            type: 'text',
            placeHolder: 'Insira o complemento',
            required: false
        },
    ]
    return (
        <PageContainer>
            <RegisterContainer>
                <InputsWrapper>
                    <InputsListsWrapper>
                        {inputsUserDataList.map(inp => {
                            return <CommonInput 
                                key={inp.name}
                                type={inp.type}
                                name={inp.name}
                                setValue={inp.setValue}
                                placeHolder={inp.placeHolder}
                                required={inp.required}
                            />
                        })}
                    </InputsListsWrapper>
                    <InputsListsWrapper>
                        {inputsAddressList.map(inp => {
                            return <CommonInput 
                                key={inp.name}
                                type={inp.type}
                                name={inp.name}
                                setValue={inp.setValue}
                                placeHolder={inp.placeHolder}
                                required={inp.required}
                            />
                        })}
                    </InputsListsWrapper>
                </InputsWrapper>
                <RegisterButton onClick={registerUser} type="button">
                    Cadastrar
                </RegisterButton>
            </RegisterContainer>
        </PageContainer>
    )
}

export default RegisterPage