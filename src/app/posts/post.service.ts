import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [
    new Post('First Post', 'This is the first post'),
    new Post('Second Post', 'This is the second post'),
    new Post('Third Post', 'This is the third post')
  ];

  private subject = new Subject<Post[]>();

  constructor() {}

  getPosts() {
    return [...this.posts];
  }

  getUpdatedPosts() {
    return this.subject.asObservable();
  }

  addNewPost(post: Post) {
    this.posts.push(post);
    this.subject.next([...this.posts]);
  }

}
