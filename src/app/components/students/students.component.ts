import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/users/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

  displayedColumns: string[] = ['name', 'subject', 'degree'];
  dataSource:any[] = []

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.getAllStudents()
  }

  getAllStudents() {
    this.auth.getUsers('students').subscribe(res => {
      console.log(res)
      const stdData = res.map(std => {
        if('subjects' in std) {
          return std.subjects?.flatMap(sub => {
            return {
              studentName: std.name,
              subjectName: sub.subjectName,
              degree: sub.degree
            }
          })
        } else {
          return {
            studentName: std.name,
            subjectName: '_',
            degree: '_'
          }
        }
      })
      this.dataSource = stdData.flat()
      // console.log('x ==>>/n', x)
    })
  }
}
