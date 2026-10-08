import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../admin/services/category-service';

export interface Category {
  id:number,
  title: string;
  description: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [MatCardModule, MatListModule, MatIconModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private _categoryservice:CategoryService){}

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
