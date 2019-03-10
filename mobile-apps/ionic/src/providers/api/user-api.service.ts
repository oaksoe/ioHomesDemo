import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { User, Constants } from '../../models';
 
@Injectable()
export class UserApiService {
    constructor(private http: HttpService<any>) {
    }
 
    public updateUser(user: User): Observable<any> {
        return this.http.put('api/user/', user)
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public getUsers(by?: string, criteria?: string): Observable<any> {
        if (!by) {
            by = Constants.General.NoneString;
            criteria = by;
        }
        
        return this.http.get('api/user/', [by, criteria])
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public getUser(id: string): Observable<any> {
        return this.getUsers('id', id)
            .map((result:any) => {
                if (result.data && result.data.length === 1) {
                    result.data = result.data[0];
                }
                
                return result;
            }).catch(err => Observable.throw(err));
    }
}
