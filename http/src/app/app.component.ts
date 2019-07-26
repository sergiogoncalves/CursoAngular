import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from './post.model';
import {PostsService} from './posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private  postService: PostsService) {}

  ngOnInit() {
    this.errorSub =  this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content)

    this.onFetchPosts();

  }

  onFetchPosts() {

    this.isFetching = true;

    this.postService.fetchPosts().subscribe(posts => {

      this.loadedPosts = posts;

      this.isFetching = false;
    }, error => {
        this.isFetching = false;
        console.log(error);
        this.error = error.status;
    });
  }

  onClearPosts() {

    this.postService.clearPosts().subscribe(() => {
      this.loadedPosts = [];
    }, error => {

      this.error = error.message;
    });

  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }


  onHandleError() {
    this.error = null;
  }
}
