import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../../shared/blog.model';
import { BlogService } from '../../../services/blog.service';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms/';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  @Input() username: any;
  @Input() blog: Blog;

  isCommenting: boolean;
  isProcessingComment: boolean;
  hasLiked: boolean;
  hasDisliked: boolean;
  commentForm: FormGroup;

  constructor(
    private blogService: BlogService,
    private msgService: FlashMessagesService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
    this.createCommentForm();
  }

  ngOnInit() {
    this.hasLiked = this.blog.likedBy.includes(this.username);
    this.hasDisliked = this.blog.dislikedBy.includes(this.username);
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comments: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000)
      ])]
    });
  }

  likeBlog() {
    this.blogService.likeBlog(this.blog._id).subscribe(res => {
      if (!res.success) {
        this.msgService.show(res.message, { cssClass: 'alert alert-danger' });
      } else {
        this.msgService.show(res.message, { cssClass: 'alert alert-success' });
        this.blog = res.blog;
        this.hasDisliked = false;
        this.hasLiked = true;
      }
    });
  }

  dislikeBlog() {
    this.blogService.dislikeBlog(this.blog._id).subscribe(res => {
      if (!res.success) {
        this.msgService.show(res.message, { cssClass: 'alert alert-danger' });
      } else {
        this.msgService.show(res.message, { cssClass: 'alert alert-success' });
        this.blog = res.blog;
        this.hasDisliked = true;
        this.hasLiked = false;
      }
    });
  }

  postComment() {
    this.isProcessingComment = true;
    const comments = this.commentForm.get('comments').value;
    this.blogService.postComment(this.blog._id, comments).subscribe(res => {
      if (!res.success) {
        this.msgService.show(res.message, { cssClass: 'alert alert-danger' });
      } else {
        this.msgService.show(res.message, { cssClass: 'alert alert-success' });
        this.blog = res.blog;
        debugger;
        this.isCommenting = false;
        this.commentForm.reset();
      }
      this.isProcessingComment = false;
    });
  }

}
