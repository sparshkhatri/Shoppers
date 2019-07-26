import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService, private router: Router) { }

  canActivate(){
    
    return this.auth.user$.switchMap(user => {
      return this.userService.getAppUser(user.uid).valueChanges();
    }).map(appUser => {
      if(appUser.isAdmin){
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    })
  }
}

