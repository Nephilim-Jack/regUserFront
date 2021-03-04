export interface UserData {
    first_name: string;
    last_name: string;
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
