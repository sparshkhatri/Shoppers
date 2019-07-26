import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {};
  errorMessage = "";
  successMessage = "";
  returnURL = "/";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  login(loginForm){
    let user = loginForm.value;
    let response = this.userService.login(user);
    this.returnURL = this.route.snapshot.queryParamMap.get('returnURL') || "/";

    response.then((result) => {
      if(result.user){
        this.successMessage = "You have logged in successfully.";
        loginForm.resetForm();
        //this.router.navigate(['/']);
        this.router.navigateByUrl(this.returnURL);
      }else if(result.code){
        this.errorMessage = result.message;
      }
    });

  }

}
