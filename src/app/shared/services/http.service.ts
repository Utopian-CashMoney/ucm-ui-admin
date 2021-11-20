import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { getAllJSDocTags } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getAll(url) {
    return this.http.get(url);
  }

  post(url, payload){
    return this.http.post(url, payload);
  }

  put(url, payload){
    return this.http.get(url, payload);
  }

  delete(url){
    return this.http.delete(url);
  }

}
