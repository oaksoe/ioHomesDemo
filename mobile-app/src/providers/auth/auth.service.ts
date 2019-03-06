import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../api/http.service';
import { User, ServerResponseCodes } from '../../models';
 
@Injectable()
export class AuthService {
    private user: User;

    constructor(private http: HttpService<any>) {
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }
    
    public getLoggedInUser(): User {
        return this.user;
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();

        //check token here
        return true;
    }
    
    public login(user: User) {
        this.http.post('/auth/login/', { email: user.email, password: user.password })
            .subscribe((result: any) => {
                if (result.status === ServerResponseCodes.SUCCESS) {
                    if (result.data && result.data.credentials) {
                        this.setToken(result.data.credentials);
                        this.setUser(result.data);
                    } else {
                        console.log('Error at login. ', result.error);
                    }
                }
            });
    }

    public logout() {
        this.removeToken();
    }

    private setToken(value: string) {
        localStorage.setItem('token', value);
    }

    private setUser(user: User) {
        if (user.password) {
            user.password = '';
        }
        
        this.user = user;
    }

    private removeToken() {
        localStorage.removeItem('token');
    }
}