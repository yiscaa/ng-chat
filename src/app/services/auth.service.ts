import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //האם המשתמש קיים
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  //אתחול ריק של פרטי המשתמש כי אנחנו לא יודעים בהתחלה מי יהיה המשתמש
  private userDetails$: Subject<User> = new Subject<User>();

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {
    //בדיקה על ההתחלה האם היוזר מחובר, כי לפעמים צריך את המידע הזה בשלוף
    const savedUserString = localStorage.getItem('user')
    if (savedUserString) {
      this.isLoggedIn$.next(true);
    }
    //בדיקה האם המשתמש מחובר, המקום הנכון לבדוק זאת זה בתוך הקונסטרקטור כי נרצה לדעת זאת מהרגע שהאפליקציה מונעתת מהרגע שהסרוויס מונע בפעם הראשונה
    afAuth.authState.subscribe(user => {
      if (user) {
        //הצגת פרטי המשתמש
        this.userDetails$.next(<User>user)
        //שמירת המשתמש בלוקל סטורג
        const userString: string = JSON.stringify(user)
        localStorage.setItem('user', userString)
        this.isLoggedIn$.next(true);
      }
      else {
        //אם המשתמש לא מחובר נרצה למחוק אותו מהלוקל סטורג
        localStorage.removeItem('user')
        this.isLoggedIn$.next(false);
      }
    })
  }

  //אותנטיקציה של לוגין עם גוגל
  public signInWithGoogle() {
    this.authLogin(new firebase.default.auth.GoogleAuthProvider())
  }
  private authLogin(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider).then((res) => {
      this.isLoggedIn$.next(true);
      this.setUserData(<User>res.user);
      this.router.navigate(['chat']);
    });
  }

  //יציאה
  public signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      //מחיקת המשתמש מהלוקל סטורז אחרי שיצא
      localStorage.removeItem('user')
      //ניווט לראוט שלא מחייב אותנו באותנטיקציה
      //לוקח אותנו לדף הבית
      this.router.navigate(["/"])
      //אחרי שהמשתמש יצא אז אין פרטים להצגה
      this.userDetails$.next(undefined)
    })
  }

  //האם המשתמש קיים
  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable()
  }

  //הצהרת דיוקומנט
  //הצהרנו על קןלקשיין של יוזר שהדוק בתוכו יהיה ה uid של היוזר
  //פונקציה שמראה לנו שהמשתמש חדש עובד לנו
  private setUserData(user?: User): Promise<void> | void {

    if (!user) return;
    //ref הוא יוזר בדאטה בייס
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(userData, {
      merge: true
    });

  }


}

