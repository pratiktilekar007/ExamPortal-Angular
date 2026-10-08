import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuizeService } from '../../admin/services/quize-service';
import { CategoryService } from '../../admin/services/category-service';
import { QuestionService } from '../../admin/services/question-service';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

export interface Quize {
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

@Component({
  selector: 'app-load-quiz',
  imports: [MatCard, CommonModule, MatCardHeader, MatCardTitle, MatCardContent,MatButton,RouterLink],
  templateUrl: './load-quiz.html',
  styleUrl: './load-quiz.css',
})
export class LoadQuiz implements OnInit {

  constructor(private _route: ActivatedRoute, private _quizeService: QuizeService,
    private _categoryservice: CategoryService, private _questionService: QuestionService) { }

    
    catId = signal<number>(0);
    quize = signal<Quize[]>([]);

    ngOnInit(): void {
    
    this._route.paramMap.subscribe((params) => {
      
      // 1. Get ID from URL string and convert to Number using '+'
      const idFromUrl = params.get('catId'); 
      
      if (idFromUrl) {
        const numericId = +idFromUrl;
        this.catId.set(numericId);
        this.getQuizeofCategory(this.catId());
      }
    });
  }

  public getQuizeofCategory(cid:any)
  {
    this._quizeService.getQuezesofCategories(cid).subscribe({
      next: (response: any) => {
        this.quize.set(response);
      }, error: (err) => {
        alert(err);
      }
    })
  }

}
