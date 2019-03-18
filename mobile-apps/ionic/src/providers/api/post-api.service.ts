import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Post, Constants } from '../../models';
 
@Injectable()
export class PostApiService {
    constructor(private http: HttpService<any>) {
    }
 
    public createPost(post: Post): Observable<any> {
        return this.http.post('api/post/create/', post)
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public updatePost(post: Post): Observable<any> {
        return this.http.put('api/post/', post)
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public removePost(id: string): Observable<any> {
        return this.http.delete('api/post/' + encodeURIComponent(id))
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public getPosts(by?: string, criteria?: string): Observable<any> {
        if (!by) {
            by = Constants.General.NoneString;
            criteria = by;
        }

        return this.http.get('api/post/', [by, criteria])
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }
}
