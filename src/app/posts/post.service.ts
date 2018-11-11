import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];

  private subject = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe(
      (response) => {
        this.posts = response.posts;
        this.subject.next([...this.posts]);
      }
    );
  }

  getUpdatedPosts() {
    return this.subject.asObservable();
  }

  addNewPost(title: string, content: string) {
    const post = new Post(null, title, content);
    this.posts.push(post);
    this.httpClient.post<{message: string}>('http://localhost:3000/api/posts', post).subscribe(
      (response) => {
        console.log(response.message);
      });
    this.subject.next([...this.posts]);
  }

}
