import { Component } from '@angular/core';
import { AuthService } from './services/users/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mcq_front_end';
  constructor(private authUser: AuthService) {}
  ngOnInit() {
    this.getLoggedInUser()
  }
  getLoggedInUser() {
    this.authUser.getRole().subscribe(res => {
      this.authUser.crtUser.next(res)
      console.log(res)
    })
  }
}
