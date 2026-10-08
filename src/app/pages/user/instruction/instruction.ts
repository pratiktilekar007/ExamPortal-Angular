import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizeService } from '../../admin/services/quize-service';
import { QuestionService } from '../../admin/services/question-service';
import { CategoryService } from '../../admin/services/category-service';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDivider, MatList, MatListItem } from '@angular/material/list';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-instruction',
  imports: [MatCard,MatList,MatCardHeader,MatCardTitle,MatCardContent,MatListItem,MatDivider,MatCardActions,MatButton],
  templateUrl: './instruction.html',
  styleUrl: './instruction.css',
})
export class Instruction implements OnInit {

  constructor(private _route: ActivatedRoute, private _router:Router, private _quizeService: QuizeService,
    private _categoryservice: CategoryService, private _questionService: QuestionService) { }

  qId = signal<number>(0);
  quize = signal<any>({
    qid:'',
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      id: null // Or 'id' depending on your model
    }
  });

  ngOnInit(): void {

    this._route.paramMap.subscribe((params) => {

      // 1. Get ID from URL string and convert to Number using '+'
      const idFromUrl = params.get('qId');

      if (idFromUrl) {
        const numericId = +idFromUrl;
        this.qId.set(numericId);
        this.getquizeDetails(this.qId());
      }
    });
  }

  getquizeDetails(Qid: any) {
    this._quizeService.getSingleQuize(Qid).subscribe({
      next: (response: any) => {
        this.quize.set(response);
      }, error: (err) => {
        alert(err);
      }
    })
  }

  stratQuize(){

    this._router.navigate(['/start/'+ this.quize().qid])
  }

}
