import {
    PageContainer, RegisterContainer,
} from './styles'
import CreateOrEditModal from '../../components/CreateOrEditModal/index'

const RegisterPage = () => {
    return (
        <PageContainer>
            <RegisterContainer>
                <CreateOrEditModal mode='create'/>
            </RegisterContainer>
        </PageContainer>
    )
}

export default RegisterPage