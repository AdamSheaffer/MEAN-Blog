import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { IBlog } from '../../shared/blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  isNewPost = false;
  isProcessing = false;
  isLoadingBlogs = true;
  username: String;
  form: FormGroup;
  blogs: IBlog[] = [];

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService,
    private msgService: FlashMessagesService) {
    this.createForm();
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(p => {
      this.username = p.user.username;
      this.reloadBlogs();
    });
  }

  onBlogSubmit() {
    this.isProcessing = true;
    const blog = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy: this.username
    }
    this.blogService.postBlog(blog).subscribe(data => {
      if (!data.success) {
        this.msgService.show(data.message, { cssClass: 'alert alert-danger' });
      } else {
        this.reloadBlogs();
        this.msgService.show(data.message, { cssClass: 'alert alert-success' });
        this.form.reset();
        this.isNewPost = false;
      }
    });
  }

  newBlogForm() {
    this.isNewPost = true;
  }

  reloadBlogs() {
    this.isLoadingBlogs = true;
    this.blogService.getBlogs().subscribe(res => {
      if (!res.success) {
        this.msgService.show(res.message, { cssClass: 'alert alert-danger' });
      } else {
        this.blogs = res.blogs;
      }
      this.isLoadingBlogs = false;
    });
  }

  createComment() {

  }

  deleteBlog(blog) {
    this.blogService.deleteBlog(blog).subscribe(res => {
      if (!res.success) {
        this.msgService.show(res.message, { cssClass: 'alert alert-danger' });
      } else {
        this.msgService.show(res.message, { cssClass: 'alert alert-success' });
        this.reloadBlogs();
      }
    });
  }

  cancelBlogPost() {
    window.location.reload();
  }
}
