import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];

  private subject = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map((post) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(
        (response) => {
          this.posts = response;
          this.subject.next([...this.posts]);
        }
    );
  }

  getPostById(id: string) {
    return this.httpClient.get<{message: string, post: any}>('http://localhost:3000/api/posts/' + id);
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = new Post(id, title, content);
    this.httpClient.put<{message: string}>('http://localhost:3000/api/posts/' + id, post)
      .subscribe(
        () => {
          const updatedPosts = [...this.posts];
          const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
          updatedPosts[oldPostIndex] = post;
          this.posts = updatedPosts;
          this.subject.next([...this.posts]);
        }
      );

  }

  getUpdatedPosts() {
    return this.subject.asObservable();
  }

  addNewPost(title: string, content: string) {
    const post = new Post(null, title, content);

    this.httpClient.post<{message: string, id: string}>('http://localhost:3000/api/posts', post)
      .subscribe(
      (response) => {
        post.id = response.id;
      });
    this.posts.push(post);
    this.subject.next([...this.posts]);
  }

  detelePost(id: string, index: number) {
    this.httpClient.delete('http://localhost:3000/api/posts/' + id)
      .subscribe();
    this.posts.splice(index, 1);
    this.subject.next([...this.posts]);
  }

  editPost(id: string) {

  }

}
