import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  blog = {};
  blogId: String;
  isProcessing = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private location: Location,
    private msgService: FlashMessagesService) { }

  ngOnInit() {
    this.isProcessing = true;
    this.blogId = this.activatedRoute.snapshot.params['id'];
    this.blogService.getBlogById(this.blogId).subscribe(res => {
      if (!res.success) {
        this.msgService.show(res.message, { cssClass: 'alert alert-danger' });
      } else {
        this.blog = res.blog;
        this.isProcessing = false;
      }
    });
  }

  updateBlog() {
    this.blogService.updateBlog(this.blog).subscribe(res => {
      const cssClass = res.success ? 'alert alert-success' : 'alert alert-danger';
      this.msgService.show(res.message, { cssClass });
    });
  }

  cancel() {
    this.location.back();
  }
}
