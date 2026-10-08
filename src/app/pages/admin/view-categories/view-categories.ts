import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CategoryService } from '../services/category-service';

 export interface Category {
  title: string;
  description: string;
}

@Component({
  selector: 'app-view-categories',
  imports: [MatCard, CommonModule, MatCardHeader,MatCardTitle, MatCardContent ],
  templateUrl: './view-categories.html',
  styleUrl: './view-categories.css',
})
export class ViewCategories implements OnInit {

  constructor(private _categoryservice:CategoryService){}

  //categories : Categories[]= [];
  categories = signal<Category[]>([]);

  ngOnInit(): void {
    this._categoryservice.getAllCategories().subscribe({
          next: (response: any) => {
            this.categories.set(response);
          },error:(err)=>{
            alert(err);
          }})

  }
}
