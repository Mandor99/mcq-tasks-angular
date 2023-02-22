import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService, IExam } from 'src/app/services/doctor/exam.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {

  subjectForm: FormGroup;
  examForm: FormGroup;
  isEditable:boolean = true
  subName: string = ''
  questions:any[]=[]
  correctAnswer:string=''
  crtId:number = 0;
  isStep1:boolean=false
  isStep2:boolean=false
  // stepperIndex:number = 0

  constructor(private fb: FormBuilder, private examService: ExamService) {
    this.subjectForm = fb.group({
      subjectName: ['', Validators.required]
    })
    this.examForm = fb.group({
      question:['', Validators.required],
      answer1:['', Validators.required],
      answer2:['', Validators.required],
      answer3:['', Validators.required],
      answer4:['', Validators.required],
    })
  }

  addSubName(stepper: MatStepper) {
    this.isStep1 = true
    this.subName = this.subjectForm.value.subjectName
    setTimeout(()=> stepper.next(), 10)
  }

  getChosen(eve:any) {
    this.correctAnswer = eve.value
  }

  saveQuestion() {
   if(this.correctAnswer) {
    const model = {
      question: this.examForm.value.question,
      answer1: this.examForm.value.answer1,
      answer2: this.examForm.value.answer2,
      answer3: this.examForm.value.answer3,
      answer4: this.examForm.value.answer4,
      correctAnswer: this.examForm.value[this.correctAnswer],
    }
    this.questions.push(model)
    this.examForm.reset()
    this.correctAnswer = ''
    console.log(this.questions)
   } else {
    alert('need the correct answer!!')
   }
  }

  cancelExam(eve:any) {
    this.examForm.reset()
    this.questions = []
    this.subName = ''
    this.correctAnswer = ''
    eve.reset()
  }

  deleteQuestion() {
    this.correctAnswer = ''
    this.examForm.reset()
  }

  submit(stepper: MatStepper) {
    const model = {
      subjectName: this.subName,
      questions: this.questions
    }
    this.examService.addQuestion(model).subscribe(res => {
      if(res?.id) {this.crtId = res?.id}
      console.log(res)
    })
    this.isStep2 = true
    this.isEditable = false
    setTimeout(()=> stepper.next(), 10)

  }

  deleteQs(idx:any) {
    this.questions.splice(idx, 1)
    const updatedModel = {
      subjectName: this.subName,
      questions: this.questions
    }
    this.examService.updatedQuestion(this.crtId, updatedModel).subscribe(res => console.log(res))
  }
}
