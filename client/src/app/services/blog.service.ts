import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class BlogService {

  constructor(private http: Http, private authService: AuthService) { }

  postBlog(blog) {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.post(`${this.authService.domain}/authentication/newBlog`, blog, headers).map(data => data.json());
  }

  getBlogs() {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.get(`${this.authService.domain}/authentication/blogs`, headers).map(data => data.json());
  }

  getBlogById(id) {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.get(`${this.authService.domain}/authentication/blogs/${id}`, headers).map(data => data.json());
  }

  updateBlog(blog) {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.put(`${this.authService.domain}/authentication/edit`, blog, headers).map(data => data.json());
  }

  deleteBlog(blog) {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.delete(`${this.authService.domain}/authentication/delete/${blog._id}`, headers).map(data => data.json());
  }
}
