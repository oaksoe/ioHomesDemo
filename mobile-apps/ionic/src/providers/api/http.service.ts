import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const headers = new HttpHeaders({
    'Content-Type':  'application/json'
});

@Injectable()
export class HttpService<T> {
    private url = 'http://localhost:8000/v1/ioh/';

    constructor(
        private http: HttpClient
    ) {
    }

    public post(endpoint: string, body: T, options?: any) {
        if (!options) {
            options = {
                headers: headers
            }
        }
        return this.http.post(this.url + endpoint, body, options);
    }

    public delete(endpoint: string, options?: any) {
        return this.http.delete(this.url + '/' + endpoint, options);
    }

    public put(endpoint: string, body: any, options?: any) {
        if (!options) {
            options = {
                headers: headers
            }
        }
        return this.http.put(this.url + endpoint, body, options);
    }

    public get(endpoint: string, params?: any, options?: any) {
        if (!options) {
            options = {
              params: new HttpParams()
            };
        }

        if (params) {
            options.params = new HttpParams();
            for (let k in params) {
                options.params = options.params.set(k, params[k]);
            }
        }

        return this.http.get(this.url + '/' + endpoint, options);
    }
}
