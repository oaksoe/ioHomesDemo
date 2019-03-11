import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Home } from '../../models';
 
@Injectable()
export class HomeApiService {
    constructor(private http: HttpService<any>) {
    }
 
    public createHome(home: Home): Observable<any> {
        return this.http.post('api/home/create/', home)
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public updateHome(home: Home): Observable<any> {
        return this.http.put('api/home/', home)
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public removeHome(id: string): Observable<any> {
        return this.http.delete('api/home/' + encodeURIComponent(id))
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public getHomes(by: string, criteria: string): Observable<any> {
        return this.http.get('api/home/', [by, criteria])
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public togglePlug(): Observable<any> {
        const deviceData = {
            type: 'Plug',
            name: 'ioHomes smart plug'
        };

        return this.http.post('iot/device/toggle/', deviceData)
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public getToggleState(): Observable<any> {
        return this.http.get('iot/device/toggle/state/', ['Plug', 'ioHomes smart plug'])
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }
}
