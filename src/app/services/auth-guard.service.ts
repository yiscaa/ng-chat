import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  //בודק האם המשתמש מחובר או לא
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return this.authService.isLoggedIn().pipe(
      tap((userIsLoggedIn) => {
        if(!userIsLoggedIn) this.router.navigate(['/']);
      })
    );
  }
}
