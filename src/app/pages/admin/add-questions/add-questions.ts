import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizeService } from '../services/quize-service';
import { CategoryService } from '../services/category-service';
import { QuestionService } from '../services/question-service';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-add-questions',
  imports: [MatCard, MatInput, MatFormField,MatButton, MatLabel, MatSlideToggleModule, FormsModule],
  templateUrl: './add-questions.html',
  styleUrl: './add-questions.css',
})
export class AddQuestions {

  Questions = {
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
      qid: null,
    }
  }

  constructor(private _route: ActivatedRoute, private _quizeService: QuizeService,
    private _categoryservice: CategoryService, private _questionService: QuestionService) { }

  qid = 0;
  qtitle = '';

  ngOnInit(): void {
    this.Questions.quiz.qid = this._route.snapshot.params['id'];
    this.qtitle = this._route.snapshot.params['title'];
  }


  fromSubmit() {

    if (this.Questions.content.trim() == '' || this.Questions.content == null) {
      alert("enter a Question");
      return;
    }
    if (this.Questions.option1.trim() == '' || this.Questions.option1 == null) {
      alert("enter a option1")
      return;

    }

    if (this.Questions.option2.trim() == '' || this.Questions.option2 == null) {
      alert("enter a option2")
      return;

    }

    if (this.Questions.option3.trim() == '' || this.Questions.option3 == null) {
      alert("enter a option3")
      return;

    }

    if (this.Questions.option4 == '' || this.Questions.option4 == null) {
      alert("enter a option4")
      return;

    }

    if (this.Questions.answer == '' || this.Questions.answer == null) {
      alert("enter a answer")
      return;

    }

    this._questionService.addQuestion(this.Questions).subscribe({
      next: (response: any) => {
        this.Questions.content = '',
        this.Questions.option1 = '',
        this.Questions.option2 = '',
        this.Questions.option3 = '',
        this.Questions.option4 = '',
        this.Questions.answer = '',
        alert("Question Add Successfully")
      }, error: (err) => {
        alert(err);
      }
    })
  }
}
