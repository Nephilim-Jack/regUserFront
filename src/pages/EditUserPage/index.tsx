import {
    PageContainer, RegisterContainer,
} from './styles'
import CreateOrEditModal from '../../components/CreateOrEditModal/index'

const EditUserPage = () => {
    return (
        <PageContainer>
            <RegisterContainer>
                <CreateOrEditModal mode='edit'/>
            </RegisterContainer>
        </PageContainer>
    )
}

export default EditUserPage