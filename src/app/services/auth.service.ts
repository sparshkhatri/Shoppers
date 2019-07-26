import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AppUser } from '../models/AppUser';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.user$ = this.afAuth.authState;
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.switchMap(user => {
      if(user){
        return this.userService.getAppUser(user.uid).valueChanges();
      }else{
        return Observable.of(null);
      }
      
    })
  }
}
