import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: Post;

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  onSavePost(f: NgForm) {
    const nPost = new Post(f.value.title, f.value.content);
    this.postService.addNewPost(nPost);
    f.reset();
  }

}
