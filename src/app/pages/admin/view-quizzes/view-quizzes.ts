import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { QuizeService } from '../services/quize-service';
import { MatButton } from '@angular/material/button';
import { RouterLink } from "@angular/router";

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
  selector: 'app-view-quizzes',
  imports: [MatCard, CommonModule, MatCardHeader, MatCardTitle, MatCardContent, MatButton, RouterLink],
  templateUrl: './view-quizzes.html',
  styleUrl: './view-quizzes.css',
})
export class ViewQuizzes implements OnInit {

  constructor(private _quizeservice: QuizeService) { }

  quize = signal<Quize[]>([]);

  ngOnInit(): void {
    
    this.getQuize();
  }

  public getQuize()
  {
    this._quizeservice.getAllQuizes().subscribe({
      next: (response: any) => {
        this.quize.set(response);
      }, error: (err) => {
        alert(err);
      }
    })
  }

  deleteQuize(qid: number) {

    this._quizeservice.deleteQuize(qid).subscribe({
      next: (response: any) => {
        alert("Quize Deleted");
        this.getQuize();
      }, error: (err) => {
        alert(err);
      }
    })
  }


}
