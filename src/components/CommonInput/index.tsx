import { useState } from 'react'
import {
    InputContainer, DefaultInput,
    InputLabel, InputBottomLine,
    InputWrapper
} from './styles'

interface CommonInputProps {
    name: string;
    placeHolder?: string;
    setValue: (value: string) => void;
    type: string;
    required?: boolean;
    value?: any
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
                    placeholder={props.value? props.value: props.placeHolder? props.placeHolder : `Insira o(a) ${props.name}`}
                    type={props.type}
                    expand={inputFocused}
                    onChange={(e) => props.setValue(e.target.value)}
                    required={props.required}
                />
                <InputBottomLine expand={inputFocused}/>
            </InputWrapper>
        </InputContainer>
    )
}

export default CommonInput