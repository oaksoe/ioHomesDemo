import { Injectable } from '@angular/core';
import { Post } from '../../models';
 
@Injectable()
export class PostService {
    constructor() {}

    public initPost(): Post {        
        return {
            id: '',
            author: null,
            content: '',
            images: [],
            createdAt: '',
            updatedAt: ''
        }
    }

    public updatePost(post): Post {
        return {
            id: post.id,
            author: post.author,
            content: post.content,
            images: post.images,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        }
    }
}
