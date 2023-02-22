import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubject, ExamService } from 'src/app/services/doctor/exam.service';
import { AuthService, ICrtUser, IUser } from 'src/app/services/users/auth.service';

@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.css']
})
export class ViewExamComponent {

  subject: ISubject = {
    subjectName: '',
    questions: [{question: '', answer1: '', answer2: '', answer3: '', answer4: '', correctAnswer: ''}],
  }
  crtUser!: ICrtUser
  result: number = 0
  canChoose: boolean = true
  studentExams!: any[]

  constructor(private router: ActivatedRoute, private exam: ExamService, private auth: AuthService) {}

  ngOnInit() {
    this.getCrtUser()
    this.getSubject()
  }

  getCrtUser() {
    this.auth.getRole().subscribe(res => {
      this.crtUser = res
      this.getStudent()

    })
  }

  getStudent() {
    let userId = this.crtUser?.userId
    userId && this.auth.getUser(userId).subscribe(res => {
      this.studentExams = res?.subjects ? res?.subjects : []
      this.studentExams.forEach((sub) => {
        if(sub.subjectId === this.subject.id) {
          this.canChoose = false
          this.result = sub.degree
        }
      })
    })
  }

  getSubject() {
    let id = this.router.snapshot.paramMap.get('id')
    this.exam.getSubject(id).subscribe(res => {
      this.subject = res
      console.log(this.subject)
    })
  }

  getChosen(eve:any) {
    let idx = eve.source.name
    console.log(eve, idx)
    this.subject.questions[idx].studentAnswer = eve.value
  }

  getResult() {
    this.subject.questions.forEach((qs) => {
      if('studentAnswer' in qs) {
        if(qs.studentAnswer === qs.correctAnswer) {
          this.result+=1
        }else {
          this.result+=0
        }
      }
    })
    this.canChoose = false
    let userId = this.crtUser.userId
    const model:IUser = {
      name: this.crtUser.name,
      email: this.crtUser.email,
      password: this.crtUser.password,
      subjects: [{subjectName: this.subject.subjectName, degree: this.result, subjectId: this.subject.id}, ...this.studentExams]
    }
    this.auth.updateUser(userId, model).subscribe()
  }

  deleteQs(idx:any) {
    this.subject.questions.splice(idx, 1)
    const id = this.subject.id
    const model = {
      subjectName: this.subject.subjectName,
      questions: this.subject.questions
    }
    this.exam.updatedQuestion(id, model).subscribe()
  }
}
