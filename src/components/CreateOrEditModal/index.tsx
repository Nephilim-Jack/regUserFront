import {useState, useEffect} from 'react'
import {useInfoContext, useNameContext} from '../../context/index'
import {
    InputsListsWrapper, InputsWrapper,
    PageContainer, CommonButton
} from './styles'
import CommonInput from '../CommonInput/index'
import {Profile, UserData} from '../../services/types'
import {createUser, getUserByUserName, updateUser} from '../../services/api'
import {useHistory} from 'react-router-dom'

interface CreateOrEditModalProps {
    mode: 'edit' | 'create'
}

const CreateOrEditModal = (props: CreateOrEditModalProps) => {
    const history = useHistory()
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
    const {updateInfoModalStateForTime} = useInfoContext()
    const {userName} = useNameContext()

    const updateValueInUserData = (valueKey: keyof UserData, value: any) => {
        userData[valueKey] = value
        setUserData(userData)
    }
    const updateValueInUserDataProfile = (valueKey: keyof Profile, value: any) => {
        userAddress[valueKey] = value
        setUserAddress({...userAddress})
    }

    const registerUser = async () => {
        if (userData && userAddress){
            userData.profile = userAddress
            userData.username = userData.first_name.toLowerCase().replaceAll(' ', '_')
            setUserData({...userData})
        }
        const verifyAll = Object.entries(userData).map(listObject => {
            return {
                [listObject[0]]: listObject[1]? true : listObject[0] === 'last_name' || listObject[0] === 'username'? true : false
            }
        })
        const isAllOk = verifyAll.map((value) => {
            return Object.values(value)[0]
        })
        const validated = isAllOk.every((bool, index, array) => {
            return bool === true
        })

        if (validated) {
            try {
                await createUser(userData)
                updateInfoModalStateForTime({
                    data: 'Usuário criado, use os dados cadastrados para logar',
                    visible: true
                }, 5000)
                history.push('login')
            } catch (err) {
                updateInfoModalStateForTime({
                    data: `Algum dado incorreto(verifique o cpf email ou pis)`,
                    visible: true
                }, 5000)
            }
        } else {
            updateInfoModalStateForTime({
                data: 'Com exceção dos campos pis e complemento, todos são necessários',
                visible: true
            }, 5000)
        }
    }
    const updateUserHandler = async () => {
        try {
            await updateUser(userData)
            updateInfoModalStateForTime({
                data: 'Usuário modificado com sucesso',
                visible: true
            }, 5000)
        } catch (err) {
            updateInfoModalStateForTime({
                data: `Error desconhecido: ${err}`,
                visible: true
            }, 5000)
        }
    }
    const inputsUserDataList = [
        {
            name: 'Nome',
            setValue: (value: any) => updateValueInUserData('first_name', value),
            type: 'text',
            placeHolder: 'Insira o seu nome',
            required: true,
            valueRef: userData.username
        },
        {
            name: 'Email',
            setValue: (value: any) => updateValueInUserData('email', value),
            type: 'email',
            placeHolder: 'Insira o seu email',
            required: true,
            valueRef: userData.email
        },
        {
            name: 'CPF',
            setValue: (value: any) => updateValueInUserDataProfile('cpf', value),
            type: 'text',
            placeHolder: 'Insira o seu cpf',
            required: true,
            valueRef: userData.profile.cpf
        },
        {
            name: 'PIS',
            setValue: (value: any) => updateValueInUserDataProfile('pis', value),
            type: 'text',
            placeHolder: 'Insira o seu pis',
            required: false,
            valueRef: userData.profile.pis
        },
        {
            name: 'Senha',
            setValue: (value: any) => updateValueInUserData('password', value),
            type: 'password',
            placeHolder: 'Insira a sua senha',
            required: true,
            valueRef: userData.password
        }
    ]
    const inputsAddressList = [
        {
            name: 'País',
            setValue: (value: any) => updateValueInUserDataProfile('country', value),
            type: 'text',
            placeHolder: 'Insira o seu país',
            required: true,
            valueRef: userData.profile.country
        },
        {
            name: 'Estado',
            setValue: (value: any) => updateValueInUserDataProfile('state', value),
            type: 'text',
            placeHolder: 'Insira o seu estado',
            required: true,
            valueRef: userData.profile.state
        },
        {
            name: 'Município',
            setValue: (value: any) => updateValueInUserDataProfile('city', value),
            type: 'text',
            placeHolder: 'Insira o seu município',
            required: true,
            valueRef: userData.profile.city
        },
        {
            name: 'CEP',
            setValue: (value: any) => updateValueInUserDataProfile('cep', value),
            type: 'text',
            placeHolder: 'Insira o seu cep',
            required: true,
            valueRef: userData.profile.cep
        },
        {
            name: 'Rua',
            setValue: (value: any) => updateValueInUserDataProfile('street', value),
            type: 'text',
            placeHolder: 'Insira a sua rua',
            required: true,
            valueRef: userData.profile.street
        },
        {
            name: 'Número',
            setValue: (value: any) => updateValueInUserDataProfile('houseNumber', value),
            type: 'text',
            placeHolder: 'Número de seu endereço',
            required: true,
            valueRef: userData.profile.houseNumber
        },
        {
            name: 'Complemento',
            setValue: (value: any) => updateValueInUserDataProfile('complement', value),
            type: 'text',
            placeHolder: 'Insira o complemento',
            required: false,
            valueRef: userData.profile.complement
        },
    ]

    useEffect(() => {
        const updateModalValues = async () => {
            const user = await getUserByUserName(userName)
            setUserData({...user})
        }
        if (props.mode === 'edit') {
            updateModalValues()
        }
    }, [props.mode, userName])  
    return (
        <PageContainer>
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
                        value={inp.valueRef}
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
                        value={inp.valueRef}
                    />
                })}
            </InputsListsWrapper>
            </InputsWrapper>
            {props.mode === 'edit'?
            <CommonButton onClick={updateUserHandler} type="button">
                Modificar
            </CommonButton>:
            <CommonButton onClick={registerUser} type="button">
                Cadastrar
            </CommonButton>}
        </PageContainer>
    )
}

export default CreateOrEditModal