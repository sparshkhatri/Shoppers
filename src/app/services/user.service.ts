import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppUser } from '../models/AppUser';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  async register(user){
    try{
      let result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      return result;
    }catch(error){
      return error;
    }
  }

  createUser(uid, user){
    this.db.database.ref('users/'+uid).set(user);
  }

  async login(user){
    try{
      let result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      return result;
    }catch(error){
      return error;
    }
  }

  getAppUser(uid: string): AngularFireObject<AppUser>{
    return this.db.object('/users/'+uid);
  }

  getAll() : AngularFireList<AppUser>{
    return this.db.list('/users');
  }
}
