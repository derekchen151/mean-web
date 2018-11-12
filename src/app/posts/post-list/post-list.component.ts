import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  subscription: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.subscription = this.postService.getUpdatedPosts().subscribe(
      (posts) => this.posts = posts
    );
  }

  onEdit(id: string, index: number) {

  }

  onDelete(id: string, index: number) {
    this.postService.detelePost(id, index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
