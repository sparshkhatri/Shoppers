import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Observable, Subscription } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  shipping;
  cart$: Observable<Cart>;
  cart;
  cartSubscription: Subscription;
  user$;
  userSubscription: Subscription;
  userId: string;

  constructor(private orderService: OrderService,private cartService: CartService, private auth: AuthService,private router: Router) { }

  async ngOnInit() {
    let shippingString = localStorage.getItem('shipping');
    this.shipping = JSON.parse(shippingString);
    this.cart$ = await this.cartService.getCart();
    this.cartSubscription = this.cart$.subscribe(cart => {
      this.cart = cart;
    });
    this.userSubscription = this.auth.user$.subscribe(user => {
      this.userId = user.uid;
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  paynow() {
    //let paymentData = paymentForm.value;
    let response = this.orderService.placeOrder(this.shipping, this.cart, this.userId);

    response.then(result => {
      localStorage.removeItem('cartId');
      localStorage.removeItem('shipping');
      this.router.navigate(['thank-you']);
    });

  }

}
