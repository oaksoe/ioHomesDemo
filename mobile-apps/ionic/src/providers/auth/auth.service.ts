import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../api/http.service';
import { User, Constants } from '../../models';
 
@Injectable()
export class AuthService {
    private user: User;

    constructor(
        private http: HttpService<any>
    ) {
    }

    public initUser(): User {
        return {
            id: null,
            email: '',
            phone: '',
            password: '',
            name: '',
            gender: '',
            ic: '',
            education: '',
            jobTitle: '',
            homes: [],
        }
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }
    
    public getLoggedInUser(): User {
        return this.user || this.initUser();
    }

    public setLoggedInUser(user: User) {
        this.user = {
            id: user.id,
            email: user.email,
            phone: user.phone,
            password: '',
            name: user.name,
            gender: user.gender,
            ic: user.ic,
            education: user.education,
            jobTitle: user.jobTitle,
            homes: user.homes
        };
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();

        //check token here
        return true;
    }
    
    public login(user: User): Observable<any> {
        return this.http.post('login/', { email: user.email, password: user.password })
            .map((result: any) => {
                if (result.status === Constants.Api.ServerResponseCodes.SUCCESS
                    && result.data && result.data.token) {
                    this.setToken(result.data.token);
                    result.data.token = '';
                }                

                return result;
            }).catch(err => Observable.throw(err));
    }

    public logout() {
        this.removeToken();
    }

    private setToken(value: string) {
        localStorage.setItem('token', value);
    }

    private removeToken() {
        localStorage.removeItem('token');
    }
}