import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatRoom, ChatMessage, Constants, UserMini } from '../../models';
import { ToastService, TranslatorService, ChatApiService, ChatService, AuthService } from '../../providers';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage {

    public chatRoom: ChatRoom;
    public currentMessage: string;
    public sender: UserMini;
    private fetchMessagesError: string;
    private sendMessageError: string;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private toastService: ToastService,
        private translateService: TranslatorService,
        private chatApiService: ChatApiService,
        private chatService: ChatService,
        private authService: AuthService,
    ) {
        const currentUser = this.authService.getLoggedInUser();
        this.sender = {
            id: currentUser.id,
            name: currentUser.name
        }
        
        this.fetchMessagesError = this.translateService.instance('FETCH_MESSAGES_ERROR');
        this.sendMessageError = this.translateService.instance('SEND_MESSAGE_ERROR');

        this.initChatRoom();
        this.subscribeToChatSocket();
        this.fetchMessages();
    }

    public ionViewDidLoad() {
        console.log('ionViewDidLoad ChatPage');      
    }

    public sendMessage() {
        this.chatApiService.addMessage(this.chatRoom.id, this.sender.id, this.currentMessage).subscribe(result => {
            if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                console.log('sent data.');
            } else {
                this.toastService.show(this.sendMessageError);
            }
        }, err => {
            console.log('error when sending chat message: ', err);
            this.toastService.show(this.sendMessageError);
        });
    }

    private initChatRoom() {
        this.chatRoom = {
            id: 'chatABC',
            participants: [],
            name: '',
            type: 'private',
            createdAt: '',
            messages: []
        };
    }

    private subscribeToChatSocket() {
        this.chatService.getChatSocketObservable().subscribe(result => {
            if (result) {
                this.chatRoom.messages.push({
                    content: result.message.data.message,
                    sender: {
                        id: result.message.data.sender,
                        name: ''
                    },
                    sentAt: ''
                });
            }
        });
    }

    private fetchMessages() {
        this.chatApiService.getMessages(this.chatRoom.id).subscribe(result => {
            if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                const messages = result.data;
                messages.forEach(message => {
                    this.chatRoom.messages.push({
                        content: message.message,
                        sender: {
                            id: message.sender,
                            name: ''
                        },
                        sentAt: ''
                    });
                });
            } else {
                this.toastService.show(this.fetchMessagesError);
            }
        }, err => {
            console.log('error when fetching chat messages: ', err);
            this.toastService.show(this.fetchMessagesError);
        });
    }

}
