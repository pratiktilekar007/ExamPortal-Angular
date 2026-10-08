import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  ApiURL ="http://localhost:8080";

  constructor(private _http : HttpClient){}

  public getAllCategories(){
    return this._http.get(`${this.ApiURL}/category/`);
  }

  public addCategories(Category:any)
  {
    return this._http.post(`${this.ApiURL}/category/`,Category);
  }
}
