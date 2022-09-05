import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IChatRoom } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _db: AngularFirestore) { }

  public getRooms(): Observable<Array<IChatRoom>> {
    return this._db.collection('rooms')
      .snapshotChanges()
      .pipe(
        map((snap) => {
          return snap.map((snap) => {
            const id = snap.payload.doc.id;
            const data: IChatRoom = <IChatRoom>snap.payload.doc.data();
            return <IChatRoom>{
              ...data,
              id,
            };
          })
        })
      );
  }
}
