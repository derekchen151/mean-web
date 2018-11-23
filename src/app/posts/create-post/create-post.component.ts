import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post.model';

import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  private newMode = true;
  private id: string;
  post: Post;
  someAction = 'Save';
  isLoading = false;
  postForm: FormGroup;
  imgPreview: string;

  constructor(private postService: PostService,
              private activedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'content': new FormControl(null, [Validators.required]),
      'img': new FormControl(null, [Validators.required])
    });
    this.id = this.activedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.someAction = 'Update';
      this.newMode = false;
      this.isLoading = true;
      this.postService.getPostById(this.id).subscribe((response) => {
        this.isLoading = false;
        this.postForm.setValue({
          'title': response.post.title,
          'content': response.post.content,
          'img': null
        });
        this.post = {
          id: response.post._id,
          title: response.post.title,
          content: response.post.content
        };
      });
    }
  }

  onSavePost() {
    if (this.postForm.invalid) {
      return;
    }
    if (this.newMode) {
      this.postService.addNewPost(this.postForm.value.title, this.postForm.value.content);
      this.postForm.reset();
    } else {
      this.postService.updatePost(this.id, this.postForm.value.title, this.postForm.value.content);
      this.router.navigate(['/']);
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({
      'img': file
    });
    this.postForm.get('img').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result.toString();
    };
    reader.readAsDataURL(file);
    console.log(this.imgPreview);
  }

}
