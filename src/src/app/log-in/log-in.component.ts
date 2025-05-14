import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent {
  isLogin: boolean = false;
  isRegister: boolean = false;
  username: string = "";
  password: string = "";

  
  constructor(private authService: AuthenticationService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(() => {
      alert("Log in successful");
      this.router.navigate(['/roulette']);
    });
  }

  Register(): void {
    this.authService.register(this.username, this.password).subscribe(() => {
      alert("New User Created");
      this.login();
    });
  }
  setLogin() {
    this.isLogin = true;
    this.isRegister = false;
  }

  setRegister() {
    this.isRegister = true;
    this.isLogin = false;
  }
}
