import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";
import { MatAnchor, MatButton } from "@angular/material/button";
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CategoryService } from '../services/category-service';

@Component({
  selector: 'app-add-categories',
  imports: [MatCard, MatCardContent, MatFormField, MatLabel, MatInput, MatAnchor, MatButton, FormsModule],
  templateUrl: './add-categories.html',
  styleUrl: './add-categories.css',
})
export class AddCategories {

  constructor(private _categoryService: CategoryService) { }

  category = {
    title: '',
    description: ''
  }

  fromSubmit() {

    if (this.category.title.trim() == '' || this.category.title == null) {
      alert("enter a title");
      return;
    }
    if (this.category.description.trim() == '' || this.category.description == null) {
      alert("enter a description")
      return;

    }

    this._categoryService.addCategories(this.category).subscribe({
      next: (response: any) => {
        this.category.title = '',
          this.category.description = '',
          console.log(response);
        alert("Product Add Successfully")
      }, error: (err) => {
        alert(err);
      }
    })

  }


}
