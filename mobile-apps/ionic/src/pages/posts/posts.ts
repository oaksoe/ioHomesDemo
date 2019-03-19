import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants, Post } from '../../models';
import { ToastService, TranslatorService, AuthService, PostApiService, PostService } from '../../providers';

/**
 * Generated class for the PostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-posts',
    templateUrl: 'posts.html',
})
export class PostsPage {

    public posts: Post[];
    public post: Post;
    private fetchPostsError: string;
    private addPostError: string;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private toastService: ToastService,
        private translateService: TranslatorService,
        private postApiService: PostApiService,
        private postService: PostService,
        private authService: AuthService,
    ) {
        this.fetchPostsError = this.translateService.instance('FETCH_POSTS_ERROR');
        this.addPostError = this.translateService.instance('ADD_POST_ERROR');

        this.posts = [];
        this.post = this.postService.initPost();
        this.fetchPosts();
    }

    public ionViewDidLoad() {
        console.log('ionViewDidLoad ChatPage');      
    }

    public addPost() {
        const currentUser = this.authService.getLoggedInUser();
        this.post.author = {
            id: currentUser.id,
            name: currentUser.name
        }

        this.postApiService.createPost(this.post).subscribe(result => {
            if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                if (result.data) {
                    this.post.id = result.data.id;                    
                    this.posts.push(this.postService.updatePost(this.post));
                    this.post = this.postService.initPost();
                }
            } else {
                this.toastService.show(this.addPostError);
            }
        }, err => {
            console.log('error when adding post: ', err);
            this.toastService.show(this.addPostError);
        });
    }
    
    private fetchPosts() {
        this.postApiService.getPosts().subscribe(result => {
            if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                this.posts = result.data;
            } else {
                this.toastService.show(this.fetchPostsError);
            }
        }, err => {
            console.log('error when fetching posts: ', err);
            this.toastService.show(this.fetchPostsError);
        });
    }
}
