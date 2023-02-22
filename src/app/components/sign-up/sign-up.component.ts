import { AuthService, IUser } from './../../services/users/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  newUser: FormGroup;
  students: IUser[]=[]
  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router){
    this.newUser= fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.getAllStudents()
  }

  getAllStudents() {
    this.auth.getUsers('students').subscribe(res =>{
      this.students = res
      console.log(res)
    })
  }

  submit() {
    // console.log(this.newUser)
    if(this.newUser.valid && this.newUser.value.password === this.newUser.value.confirmPassword) {
      const model = {
        name: this.newUser.value.fullName,
        email: this.newUser.value.email,
        password: this.newUser.value.password,
      }
      // this.auth.getUsers().subscribe(res =>this.students = res)
      // console.log(this.students)
      let userIdx = this.students.findIndex((user) => user.email == this.newUser.value.email)
      console.log(userIdx)
      if(userIdx !== -1) {
        alert('user is already exist!')
      } else {
        this.auth.createUser(model).subscribe(res => {
          const model = {
            email: res.email,
            password: res.password,
            role: 'students',
            name: res.name
          }
          this.auth.logInUser(model).subscribe(res => this.auth.crtUser.next(res))
        })
        
        this.router.navigate(['/'])
      }
    } else {
      alert('something is invalid!')
    }

  }
}
