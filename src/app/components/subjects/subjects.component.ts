import { Component } from '@angular/core';
import { ExamService, ISubject } from 'src/app/services/doctor/exam.service';
import { AuthService, ICrtUser } from 'src/app/services/users/auth.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent {
  crtUser!: ICrtUser
  subjects!: ISubject[]
  constructor(private auth: AuthService, private exam: ExamService) {}

  ngOnInit() {
    this.getRole()
    this.getSubjects()
  }

  getRole() {
    this.auth.getRole().subscribe(res => {
      this.crtUser = res
    })
  }

  getSubjects() {
    this.exam.getSubjects().subscribe(res => {
      this.subjects = res
    })
  }

  removeSubject(idx:any) {
    let crtId = this.subjects[idx].id
    this.subjects.splice(idx, 1)
    this.exam.deleteSubject(crtId).subscribe(res => console.log(res))
  }
}
