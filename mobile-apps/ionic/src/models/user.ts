import { Home } from "./home";
export interface User {
    id: string;
    email: string;
    phone: string;
    password: string;
    name: string;
    gender: string;
    ic: string;
    education: string;
    jobTitle: string;
    homes: Home[];
}
