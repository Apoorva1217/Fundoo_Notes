import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  postService(data,url){
    return this.http.post(url,data);
  }
  getService(url){
    return this.http.get(url);
  }
  deleteService(url){
    return this.http.delete(url)
  }
}
