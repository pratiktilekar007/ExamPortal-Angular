import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  ApiURL ="http://localhost:8080";

  constructor(private _http : HttpClient){}

  public getQuestionofQuize(qid:any){
    return this._http.get(`${this.ApiURL}/question/quiz/${qid}`)
  }

  public addQuestion(Question:any)
  {
    return this._http.post(`${this.ApiURL}/question/`,Question);
  }

  public deleteQuestion(qid:number)
  {
    return this._http.delete(`${this.ApiURL}/question/${qid}`);
  }

  public loadQuestions(qid:number){
     return this._http.get(`${this.ApiURL}/question/quiz/${qid}`)
  }

}
