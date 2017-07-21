import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  domain = "http://localhost:8080";
  redirectUrl: String;
  authToken: String;
  user: any;

  constructor(private http: Http) { }

  createAuthenticationHeaders<RequestOptions>() {
    this.loadToken();
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: this.authToken
      })
    });
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  registerUser(user): Observable<any> {
    return this.http.post(`${this.domain}/authentication/register`, user).map(res => res.json());
  }

  checkUsername(username: String): Observable<any> {
    return this.http.get(`${this.domain}/authentication/checkUsername/${username}`).map(res => res.json());
  }

  login(user) {
    return this.http.post(`${this.domain}/authentication/login`, user).map(res => res.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    const options = this.createAuthenticationHeaders();
    return this.http.get(`${this.domain}/authentication/profile`, options).map(res => res.json());
  }

}
