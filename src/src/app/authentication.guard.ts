import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/logIn']);
    return false;
  }
}
