import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { BehaviorSubject } from 'rxjs';
 
@Injectable()
export class ChatService {
    private socketSubject: BehaviorSubject<any>; 

    constructor(private socket: Socket) {
        this.socketSubject = new BehaviorSubject<any>(undefined);
    }

    public connect() {        
        this.socket.connect(); 
        this.socket.on('chat', (data) => {
            console.log(data);
            this.socketSubject.next(data);
        });
    }

    public emitMessage(message) {
        this.socket.emit('ionic', message);
    }

    public getChatSocketObservable() {
        return this.socketSubject.asObservable();
    }
}
