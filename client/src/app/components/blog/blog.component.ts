import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  isNewPost = false;
  isProcessing = false;
  isLoadingBlogs = true;
  username: String;
  form: FormGroup;

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(10000)
      ])]
    });
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.createForm();
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(p => {
      this.username = p.user.username;
    });
  }

  onBlogSubmit() {
    this.isProcessing = true;
    const blog = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy: this.username
    }
    console.log(blog);
  }

  newBlogForm() {
    this.isNewPost = true;
  }

  reloadBlogs() {

  }

  createComment() {

  }

  cancelBlogPost() {
    window.location.reload();
  }
}
