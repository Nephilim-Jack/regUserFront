import {
    ModalContainer
} from './styles'
import {useInfoContext} from '../../context/index'


const InfoModal = () => {
    const {infoModalData} = useInfoContext()
    return (
        <>
        {infoModalData.visible? 
        <ModalContainer>
            {infoModalData.data}
        </ModalContainer>:
        null}
        </>
    )
}

export default InfoModal