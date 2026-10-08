import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizeService {

  ApiURL ="http://localhost:8080";

  constructor(private _http : HttpClient){}

  public getAllQuizes(){
    return this._http.get(`${this.ApiURL}/quiz/`);
  }

  public addQuize(Quize:any)
  {
    return this._http.post(`${this.ApiURL}/quiz/`,Quize);
  }

  public deleteQuize(qid:number)
  {
    return this._http.delete(`${this.ApiURL}/quiz/${qid}`);
  }

  public getSingleQuize(qid:any){
    return this._http.get(`${this.ApiURL}/quiz/${qid}`)
  }

  public updateQuize(Quize:any){
    return this._http.put(`${this.ApiURL}/quiz/`,Quize);
  }
  
  public getActiveQuize(){
    return this._http.get(`${this.ApiURL}/quiz/active`);
  }


  public getQuezesofCategories(qid:any){
    return this._http.get(`${this.ApiURL}/quiz/category/${qid}`)
  }
}
