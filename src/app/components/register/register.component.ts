import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {};
  errorMessage = "";
  successMessage = "";
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

  }

  register(registerForm){
    let user = registerForm.value;
    let response = this.userService.register(user);
    response.then((result) => {
      if(result.user){
        let uid = result.user.uid;
        this.userService.createUser(uid, user);
        this.successMessage = "You have registered successfully.";
        registerForm.resetForm();
        this.router.navigate(['/']);
      }else if(result.code){
        this.errorMessage = result.message;
      }
    });
    
  }

}
