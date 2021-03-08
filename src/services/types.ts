export interface UserData {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    profile: Profile;
    password: string;
}

interface Profile {
    country: string;
    state: string;
    city: string;
    cep: number;
    street: string;
    houseNumber: number;
    complement: string;
    cpf: number;
    pis: number;
}

export interface UserLoginData {
    email: string | undefined;
    cpf: number | string |undefined;
    pis: number | string |undefined;
    password: string;
    using: string;
}

export interface TokenData {
    access: string;
    refresh : string;
}