import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-spec-roulette-header',
  templateUrl: './spec-roulette-header.component.html',
  styleUrls: ['./spec-roulette-header.component.css']
})
export class SpecRouletteHeaderComponent {
  
  isMenuOpen = false;
  username = '';
  password = '';
  isToken: boolean = false;
  isAdmin: boolean = false;

  
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.isAdmin$.subscribe(status => {
      this.isAdmin = status;
    });
    this.authService.isToken$.subscribe(status => {
      this.isToken = status;
  });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.toggleMenu(); // Close the menu after logging in
    }, error => {
      console.error('Login failed', error);
    });
  }
  logout() {
    this.authService.logout();
  }

  goHome() {

  }

}
