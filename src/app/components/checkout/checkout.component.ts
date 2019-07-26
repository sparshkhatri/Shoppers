import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(private cartService: CartService, private route: Router) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  saveShipping(shippingForm) {
    let shipping = shippingForm.value;
    //console.log(shipping);
    localStorage.setItem('shipping',JSON.stringify(shipping));
    this.route.navigate(['/payment']);
    
  }

}
