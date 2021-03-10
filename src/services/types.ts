export interface UserData {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    profile: Profile;
    password: string;
}

export interface Profile {
    country: string;
    state: string;
    city: string;
    cep: number | string;
    street: string;
    houseNumber: number | string;
    complement: string;
    cpf: number | string;
    pis: number | string;
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