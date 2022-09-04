import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = authService.isLoggedIn()
  }

  ngOnInit(): void {

  }

  // כאשר המשתמש מחובר יהיה כתוב על הכפתור יציאה
  public loginWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  // כאשר המשתמש מנותק יהיה כתוב על הכפתור כניסה
  public signOut(): void {
    this.authService.signOut();
  }

}
