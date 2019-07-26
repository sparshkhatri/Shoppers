import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit, OnDestroy {
users = [];
subscription: Subscription;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.getAll().snapshotChanges().subscribe(appUserList => {
      this.users = appUserList.map(appUser => {
        let user = appUser.payload.val();
        user['key'] = appUser.payload.key;
        return user;
      });
  });
}

// removeUser(id){
//   if(confirm('Are you sure you want to delete this user?')){
//     this.userService.remove(id);
//   }}

ngOnDestroy(){
  this.subscription.unsubscribe();
}
}
