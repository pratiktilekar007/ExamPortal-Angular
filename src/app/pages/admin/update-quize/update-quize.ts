import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizeService } from '../services/quize-service';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category-service';

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
export interface Category {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-update-quize',
  imports: [MatCard, MatInput, MatFormField,MatButton, MatLabel, MatSlideToggleModule, MatSelect, MatOption, FormsModule],
  templateUrl: './update-quize.html',
  styleUrl: './update-quize.css',
})
export class UpdateQuize {

  constructor(private _route:ActivatedRoute,private _quizeService:QuizeService,private _categoryservice: CategoryService){}

  qid=0;

  quize = signal<any>({
  title: '',
  description: '',
  maxMarks: '',
  numberOfQuestions: '',
  active: true,
  category: {
    id: null // Or 'id' depending on your model
  }
});
  
  categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this._quizeService.getSingleQuize(this.qid).subscribe({
      next: (response: any) => {
        this.quize.set(response);
      }, error: (err) => {
        alert(err);
      }
    })

    this._categoryservice.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories.set(response);
      }, error: (err) => {
        alert(err);
      }
    })
  }

  public updateData(){
    this._quizeService.updateQuize(this.quize()).subscribe({
      next: (response: any) => {
        this.quize.set(response);
        alert("Quize Successfully Update..")
      }, error: (err) => {
        alert(err);
      }
    })
  }

}
