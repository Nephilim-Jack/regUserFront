import styled, {keyframes} from 'styled-components'

const slideAnimation = keyframes`
    0%{
        top: -16px;
        opacity: 0;
    }
    100%{
        top: 16px;
        opacity: 1;
    }
`

export const ModalContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
    top: 32px;
    left: 32px;
    width: 12rem;
    min-height: 8rem;
    height: fit-content;
    text-align: center;
    border-radius: 8px;
    overflow: hidden;
    animation: ${slideAnimation} 0.5s linear both;
`