import { CommonModule, JsonPipe, LocationStrategy } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../admin/services/question-service';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface Questions {
  quesId : number,
  content: string,
  image:string,
  option1 :string,
  option2 :string,
  option3 :string,
  option4 :string,
  answer : string,
  givenAnswer:string,
  quiz:{
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
}

@Component({
  selector: 'app-start',
  imports: [MatCard,MatCardContent,FormsModule,CommonModule,MatButton,MatProgressSpinnerModule,MatCardHeader,MatCardTitle],
  templateUrl: './start.html',
  styleUrl: './start.css',
})
export class Start  implements OnInit{

   qId = signal<number>(0);
  Questions = signal<Questions[]>([]);

    marksGot=0;
    correctAnswers =0;
    attempted = 0;
    timer:number=0;
    timerId: any;
   
  constructor(private cdr: ChangeDetectorRef,private localtionst : LocationStrategy,
    private _route: ActivatedRoute, private _router:Router, private _questionService:QuestionService){}
  ngOnInit(): void {

    this.preventBackButton();

    this._route.paramMap.subscribe((params) => {

      // 1. Get ID from URL string and convert to Number using '+'
      const idFromUrl = params.get('qId');

      if (idFromUrl) {
        const numericId = +idFromUrl;
        this.qId.set(numericId);
      }
    });

    this.getQuestions();

  }

  getQuestions(){
    this._questionService.loadQuestions(this.qId()).subscribe({
      next: (response: any) => {
        this.Questions.set(response);
         this.timer = this.Questions().length * 1 * 60 ;
         this.startTimer();
        
        console.log(this.Questions());
      }, error: (err) => {
        alert(err);
      }
    })
  }

  preventBackButton(){
    history.pushState(null, '', location.href)
    this.localtionst.onPopState(()=>{
      history.pushState(null,'');
    })
  }

  submitQueze(){

      this.evalQuiz();
  
  }

  evalQuiz()
  {
    const allQuestions = this.Questions();

  allQuestions.forEach(q => {
    console.log('Processing question:', q.content);
    // Your logic here

    if(q.givenAnswer==q.answer){
      this.correctAnswers++;
     let marksSingle = Number(q.quiz.maxMarks) / Number(q.quiz.numberOfQuestion);
      
      // 4. Add to the total score
      this.marksGot += marksSingle;
    }
    
  });

  alert("correct ans " + this.correctAnswers +"Marks got " + this.marksGot)
  console.log("correct ans " + this.correctAnswers);
  console.log("Marks got " + this.marksGot);

  this.correctAnswers=0;
  this.marksGot=0;

  this.endQuize();
  }

  endQuize(){
  this._router.navigate(['/user/'])
  }

    startTimer() {
  this.timerId = setInterval(() => { // 2. Capture the ID
    if (this.timer > 0) {
      this.timer--;
      this.cdr.detectChanges();
    } else {
      this.stopTimer(); // 3. Call a function to stop it
      this.evalQuiz();
    }
  }, 1000);
}

stopTimer() {
  if (this.timerId) {
    clearInterval(this.timerId);
  }
}

    getFormatedTime()
  {
    let mm = Math.floor(this.timer / 60)
    let ss = this.timer-mm*60;
    return `${mm} Min : ${ss} Sec`
  }

  
}
