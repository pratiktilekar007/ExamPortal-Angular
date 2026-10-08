import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizeService } from '../services/quize-service';
import { CategoryService } from '../services/category-service';
import { QuestionService } from '../services/question-service';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { MatButton } from '@angular/material/button';

export interface Questions {
  quesId : number,
  content: string,
  image:string,
  option1 :string,
  option2 :string,
  option3 :string,
  option4 :string,
  answer : string,
  quiz:{
  qid: number;
  title: string;
  description: string,
  maxMarks: string,
  numberOfQuestion: string,
  active: boolean,
  category: {
    id: number,
    title: string,
    description: string,
  }
  }
}

@Component({
  selector: 'app-view-questions',
  imports: [MatCard, MatCardContent, MatDivider,MatButton],
  templateUrl: './view-questions.html',
  styleUrl: './view-questions.css',
})
export class ViewQuestions {

  Questions = signal<Questions[]>([]);
  
  constructor(private _route:ActivatedRoute,private _quizeService:QuizeService,
    private _categoryservice: CategoryService,private _questionService:QuestionService){}

    qid=0;
    qtitle='';

    ngOnInit(): void {
    this.qid = this._route.snapshot.params['id'];
    this.qtitle = this._route.snapshot.params['title']; 
    this.getQuestions();
  }

  getQuestions(){
    this._questionService.getQuestionofQuize(this.qid).subscribe({
      next: (response: any) => {
        this.Questions.set(response);
      }, error: (err) => {
        alert(err);
      }
    })
  }

  deleteQuestion(questionid:number){
    this._questionService.deleteQuestion(questionid).subscribe({
      next: (response: any) => {
        alert("Question Deleted");
        this.getQuestions();
      }, error: (err) => {
        alert(err);
      }
    })

  }

}
