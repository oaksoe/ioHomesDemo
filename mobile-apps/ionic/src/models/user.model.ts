import { Home } from "./home.model";
export interface User {
    id: string;
    email: string;
    phone: string;
    password: string;
    name: string;
    gender: string;
    dob: string;
    ic: string;
    education: string;
    jobTitle: string;
}

export interface UserMini {
    id: string;
    name: string;
}
