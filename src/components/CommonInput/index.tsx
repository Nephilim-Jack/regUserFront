import {useState} from 'react'
import {
    InputContainer, DefaultInput,
    InputLabel, InputBottomLine,
    InputWrapper
} from './styles'

interface CommonInputProps {
    name: string;
    placeHolder?: string;
    setValue?: (value: string) => void;
    type: string;
}

const CommonInput = (props: CommonInputProps) => {
    const [inputFocused, setInputFocused] = useState(false)
    const inputName = 'commonInput_' + props.name.toLowerCase()
    return (
        <InputContainer>
            <InputLabel expand={inputFocused} htmlFor={inputName}>{props.name}</InputLabel>
            <InputWrapper>
                <DefaultInput 
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    name={inputName}
                    placeholder={props.placeHolder? props.placeHolder : `Insira o ${props.name}`}
                    type={props.type}
                    expand={inputFocused}
                />
                <InputBottomLine expand={inputFocused}/>
            </InputWrapper>
        </InputContainer>
    )
}

export default CommonInput