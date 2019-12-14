import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl=environment.userUrl;
  constructor(public http: Http) { }
  public login(user: any): Observable<any> {
    return this.http.post(this.baseUrl + '/login', user);
  }
  public register(user: any): Observable<any> {
    return this.http.post(this.baseUrl + '/register', user);
  }
  
}
