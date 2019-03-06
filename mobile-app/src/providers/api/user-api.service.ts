import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { User } from '../../models';
 
@Injectable()
export class UserApiService {
    constructor(private http: HttpService<any>) {
    }
 
    public createUser(user: User): Observable<any> {
        return this.http.post('/user/create/', user)
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public updateUser(user: User): Observable<any> {
        return this.http.put('/user/', user)
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public getUsers(by: string, criteria: string): Observable<any> {
        return this.http.get('/user/', [by, criteria])
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }
}
