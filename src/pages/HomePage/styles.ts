import styled from 'styled-components'

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

export const CustomButton = styled.button`
    margin-top: 40px;
    width: fit-content;
    padding: 8px;
    border: 1px solid white;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    background-color: #FF7B00;
    color: white;
    font-size: 1.4rem;
    :hover {
        background-color: #B85900;
        color: lightgray;
    }
`

export const PresentationText = styled.h2`
    text-align: center;
`