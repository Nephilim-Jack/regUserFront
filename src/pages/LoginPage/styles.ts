import styled from 'styled-components'

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 32px;
    width: 100%;
    height: 100%;
`

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 20rem;
    width: 24rem;
    margin-top: 32px;
`

export const StyledOption = styled.option`
`

export const StyledSelection = styled.select`
    color: #ffa200;
    font-size: 1.1rem;
    border: none;
    outline: none;
`

export const LoginButton = styled.button`
    width: 8rem;
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