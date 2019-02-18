import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Home } from '../../models';
 
@Injectable()
export class HomeApiService {
    constructor(private http: HttpService<any>) {
    }
 
    public createHome(home: Home): Observable<any> {
        return this.http.post('/home/create/', home)
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public updateHome(home: Home): Observable<any> {
        return this.http.put('/home/', home)
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public removeHome(id: string): Observable<any> {
        return this.http.delete('/home/' + encodeURIComponent(id))
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public getHomes(by: string, criteria: string): Observable<any> {
        return this.http.get('/home/', [by, criteria])
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }
}
