import { Component, OnInit, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoryService } from '../services/category-service';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { QuizeService } from '../services/quize-service';
import { MatButton } from '@angular/material/button';

export interface Category {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-add-quize',
  imports: [MatCard, MatInput, MatFormField,MatButton, MatLabel, MatSlideToggleModule, MatSelect, MatOption, FormsModule],
  templateUrl: './add-quize.html',
  styleUrl: './add-quize.css',
})
export class AddQuize implements OnInit {

  constructor(private _categoryservice: CategoryService, private _quizeService: QuizeService) { }

  categories = signal<Category[]>([]);

  quize = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestion: '',
    active: true,
    category: {
      id: ''
    }
  }

  ngOnInit(): void {
    this._categoryservice.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories.set(response);
      }, error: (err) => {
        alert(err);
      }
    })

  }


  fromSubmit() {

    if (this.quize.title.trim() == '' || this.quize.title == null) {
      alert("enter a title");
      return;
    }
    if (this.quize.description.trim() == '' || this.quize.description == null) {
      alert("enter a description")
      return;

    }

    if (this.quize.maxMarks.trim() == '' || this.quize.maxMarks == null) {
      alert("enter a maxMarks")
      return;

    }

    if (this.quize.numberOfQuestion.trim() == '' || this.quize.numberOfQuestion == null) {
      alert("enter a numberOfQuestion")
      return;

    }

    if (this.quize.category.id == '' || this.quize.category.id == null) {
      alert("enter a Category")
      return;

    }

    this._quizeService.addQuize(this.quize).subscribe({
      next: (response: any) => {
        this.quize.title = '',
        this.quize.description = '',
        this.quize.maxMarks = '',
        this.quize.numberOfQuestion = '',
        this.quize.category.id = '',
        this.quize.description = '',
        alert("Quize Add Successfully")
      }, error: (err) => {
        alert(err);
      }
    })
  }
  
}
