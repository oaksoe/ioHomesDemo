import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
 
@Injectable()
export class ChatService {
    constructor(private socket: Socket) {
    }

    public connect() {        
        this.socket.connect(); 
        this.socket.on('chat', (data) => {
            console.log(data);
        });
    }

    public emitMessage(message) {
        this.socket.emit('ionic', message);
    }
}
