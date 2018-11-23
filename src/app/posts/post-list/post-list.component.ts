import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  subscription: Subscription;

  constructor(private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.postService.getPosts();
    this.subscription = this.postService.getUpdatedPosts().subscribe(
      (posts) => this.posts = posts
    );
  }

  onEdit(id: string, index: number) {
    this.router.navigate(['edit', id]);
  }

  onDelete(id: string, index: number) {
    this.postService.detelePost(id, index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
