import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.css']
})
export class QuantitySelectorComponent implements OnInit {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  
  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if(this.shoppingCart){
      if(this.shoppingCart.items[this.product.key]){
        return this.shoppingCart.items[this.product.key].quantity;
      }else{
        return 0;
      }
    }else{
      return 0;
    }
  }

}
