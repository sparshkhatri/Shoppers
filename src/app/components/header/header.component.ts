import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/Cart';
import { AppUser } from 'src/app/models/AppUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Observable<firebase.User>;
  appUser$: Observable<AppUser>;
  cart$: Observable<Cart>;
  cartCount: number;

  constructor(private auth: AuthService, private router: Router, private cartService: CartService) { 
    this.user$ = this.auth.user$;
    this.appUser$ = this.auth.appUser$;
    this.cartCount = 0;
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
