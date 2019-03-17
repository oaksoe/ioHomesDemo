import { UserMini } from './user.model';

export interface ChatRoom {
    id: string;
    participants: UserMini[];
    name: string;
    type: string;
    createdAt: string;
    messages: ChatMessage[];
}

export interface ChatMessage {
    content: string;
    sender: UserMini;
    sentAt: string;
}
