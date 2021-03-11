import styled from "styled-components"

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 32px;
    width: 100%;
    height: 100%;
`

export const InputsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 60%;
    height: auto;
`

export const InputsListsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    margin-bottom: 16px;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 8px;
    height: fit-content;
`

export const CommonButton = styled.button`
    width: 20rem;
    height: 4rem;
    border: 1px solid white;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    background-color: #FF7B00;
    color: white;
    font-size: 2rem;
    :hover {
        background-color: #B85900;
        color: lightgray;
    }
`