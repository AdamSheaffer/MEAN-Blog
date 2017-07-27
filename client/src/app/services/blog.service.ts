import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class BlogService {

  constructor(private http: Http, private authService: AuthService) { }

  postBlog(blog) {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.post(`${this.authService.domain}/api/newBlog`, blog, headers).map(data => data.json());
  }

  getBlogs() {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.get(`${this.authService.domain}/api/blogs`, headers).map(data => data.json());
  }

  getBlogById(id) {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.get(`${this.authService.domain}/api/blogs/${id}`, headers).map(data => data.json());
  }

  updateBlog(blog) {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.put(`${this.authService.domain}/api/edit`, blog, headers).map(data => data.json());
  }

  deleteBlog(blog) {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.delete(`${this.authService.domain}/api/delete/${blog._id}`, headers).map(data => data.json());
  }

  likeBlog(id) {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.put(`${this.authService.domain}/api/likeBlog`, { id }, headers).map(data => data.json());
  }

  dislikeBlog(id) {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.put(`${this.authService.domain}/api/dislikeBlog`, { id }, headers).map(data => data.json());
  }

  postComment(blogId, comments) {
    const headers = this.authService.createAuthenticationHeaders();
    const requestBody = { id: blogId, comments };
    return this.http.post(`${this.authService.domain}/api/comment`, requestBody, headers).map(data => data.json());
  }
}
