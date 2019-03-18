import { UserMini } from './user.model';

export interface Post {
    id: string;
    author: UserMini;
    content: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
}
