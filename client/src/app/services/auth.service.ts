import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {

  domain = "http://localhost:8080";

  constructor(private http: Http) { }

  registerUser(user): Observable<any> {
    return this.http.post(`${this.domain}/authentication/register`, user).map(res => res.json());
  }

  checkUsername(username: String): Observable<any> {
    return this.http.get(`${this.domain}/authentication/checkUsername/${username}`).map(res => res.json());
  }
}
