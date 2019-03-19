import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
 
@Injectable()
export class ChatApiService {
    constructor(private http: HttpService<any>) {
    }
 
    public addMessage(chatRoomID: string, senderID: string, message: string): Observable<any> {
        return this.http.post('chat/message/add/', {
                id: chatRoomID,
                data: {
                    sender: senderID,
                    message: message
                }
            }).map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }

    public getMessages(chatRoomID: string): Observable<any> {
        return this.http.get('chat/message/', [chatRoomID])
            .map((result: any) => {
                return result;
            }).catch(err => Observable.throw(err));
    }
}
