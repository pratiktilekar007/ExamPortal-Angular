import { Component, signal } from '@angular/core';
import { QuizeService } from '../../admin/services/quize-service';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CommonModule, LocationStrategy } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

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
  selector: 'app-user-welcome',
  imports: [MatCard, CommonModule, MatCardHeader, MatCardTitle, MatCardContent],
  templateUrl: './user-welcome.html',
  styleUrl: './user-welcome.css',
})
export class UserWelcome {
  constructor(private _quizeservice: QuizeService,private localtionst : LocationStrategy) { }

  quize = signal<Quize[]>([]);


  ngOnInit(): void {
    
    this.getQuize();
    this.preventBackButton();
    
  }

  preventBackButton(){
    history.pushState(null, '', location.href)
    this.localtionst.onPopState(()=>{
      history.pushState(null,'');
    })
  }
  public getQuize()
  {
    this._quizeservice.getActiveQuize().subscribe({
      next: (response: any) => {
        this.quize.set(response);
      }, error: (err) => {
        alert(err);
      }
    })
  }
}
