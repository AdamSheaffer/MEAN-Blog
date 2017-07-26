import { Component, OnInit, Input } from '@angular/core';
import { IBlog } from '../../shared/blog.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  @Input() blog: IBlog

  constructor() { }

  ngOnInit() {
  }

}
