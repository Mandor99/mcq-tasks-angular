import { ICrtUser, AuthService } from './../../services/users/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user:ICrtUser | null = null
  constructor(private authUser: AuthService, private router: Router) {}
  ngOnInit() {
    this.getCrtUser()
  }
  getCrtUser() {
    this.authUser.crtUser.subscribe(res => this.user = res)
  }

  logOut() {
    const emptyUser = {name: '', email: '', role: '', password: ''}
    this.authUser.logInUser(emptyUser).subscribe(res => {
      this.authUser.crtUser.next(res)
      this.getCrtUser()
      this.router.navigate(['/login'])
    })
  }
}
