import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
token:any;
baseUrl=environment.orderurl;
  constructor(public http: Http) { }
  headerWithToken() {
    this.token = localStorage.getItem('token');
    const header = new Headers({ 'x-access-token': this.token });
    header.append('Authorization', this.token);
    const options = new RequestOptions({ headers: header });
    return options;
  }
  onlyHeader() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  public getOrderData(): Observable<any> {
    return this.http.get(this.baseUrl + '/getOrderList', this.headerWithToken());
  }
  public newOrder(data:any): Observable<any> {
    return this.http.post(this.baseUrl + '/newOrder', data, this.headerWithToken());
  }
  public editOrder(data:any): Observable<any> {
    return this.http.put(this.baseUrl + '/editOrder',data,  this.headerWithToken());
  }
  public deleteOrder(data:any): Observable<any> {
    return this.http.post(this.baseUrl + '/deleteOrder' ,data, this.headerWithToken());
  }


}
