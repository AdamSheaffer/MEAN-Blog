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
}
