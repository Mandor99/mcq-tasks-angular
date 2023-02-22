import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, IUser } from 'src/app/services/users/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  crtUser: FormGroup;
  roleVal: string = 'students'
  
  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router){
    this.crtUser= fb.group({
      role: [this.roleVal, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  getRole(eve:any) {
    this.roleVal = eve.value
  }

  submit() {
    this.auth.getUsers(this.roleVal).subscribe(res =>{
      const crtIdx = res.findIndex(user => (user.email === this.crtUser.value.email && user.password === this.crtUser.value.password))
      if(crtIdx !== -1) {
        const model = {
          email: this.crtUser.value.email,
          password: this.crtUser.value.password,
          role: this.crtUser.value.role,
          name: res[crtIdx].name,
          userId: res[crtIdx].id
        }
        this.auth.logInUser(model).subscribe(res =>{
          console.log("login success!")
          this.auth.crtUser.next(res)
          this.router.navigate(['/'])
        })
      } else {
        alert('user is not exist!')
      }

    })

  }
}
