import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
// import { user } from 'firebase-functions/v1/auth';
import * as firebase from 'firebase/compat/app';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

//אותנטיקציה של לוגין עם גוגל
  public signInWithGoogle() {
    this.authLogin(new firebase.default.auth.GoogleAuthProvider())
  }
  private authLogin(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider).then((res) => {
      this.setUserData(<User>res.user);
    });
  }

  //הצהרת דיוקומנט
  //הצהרנו על קןלקשיין של יוזר שהדוק בתוכו יהיה ה uid של היוזר
  //פונקציה שמראה לנו שהמשתמש חדש עובד לנו
  private setUserData(user?: User): Promise<void> | void {

    if (!user) return;
    //ref הוא יוזר בדאטה בייס
    const userRef: AngularFirestoreDocument<User> =this.afs.doc(
      `users/${user.uid}`
    )

    const userData:User= {
      uid:user.uid,
      email:user.email,
      displayName:user.displayName,
      photoURL:user.photoURL
    }
    return userRef.set(userData,{
      merge:true
    })
  }
}
