import styled, {keyframes, css} from 'styled-components'

const updatedColor = '#FF7B00'

interface InuptBottomProps {
    expand?: boolean
}

const expandAnimation = keyframes`
    0%{
        width: 0%;
    }
    100%{
        width: 100%;
    }
`
const contractAnimation = keyframes`
    0%{
        width: 100%;
    }
    100%{
        width: 0%;
    }
`

const setCorrectAnimation = (expand: boolean | undefined) => {
    if (expand) {
        return css`animation: ${expandAnimation} 0.2s linear both;`
    } else {
        return css`animation: ${contractAnimation} 0.2s linear both;`
    }
}

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    font-size: 1.1rem;
`

export const DefaultInput = styled.input<InuptBottomProps>`
    text-align: center;
    background: transparent;
    outline: none;
    border: None;
    width: 14rem;
    font-size: 1rem;
    ::-webkit-outer-spin-button, ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    };
    ::placeholder {
        color: ${props => props.expand? updatedColor: ''};
    };
    color: ${props => props.expand? updatedColor: ''};
`

export const InputWrapper = styled(InputContainer)`
    justify-content: center;
    align-items: center;
    margin-top: 4px;
`

export const InputBottomLine = styled.div<InuptBottomProps>`
    border-bottom: 1px solid ${props => props.expand? updatedColor: 'lightgray'};
    ${props => setCorrectAnimation(props.expand)};
`

export const InputLabel = styled.label<InuptBottomProps>`
    display: inline-block;
    margin-top: 8px;
    border-bottom: 1px solid ${props => props.expand? updatedColor: 'lightgray'};
    width: fit-content;
    left: 0;
    color: ${props => props.expand? updatedColor: ''};
`