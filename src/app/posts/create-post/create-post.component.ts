import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: string;

  constructor() { }

  ngOnInit() {
  }

  onSavePost(f: NgForm) {
    this.post = f.value.name;
    console.log(this.post);
  }

}
