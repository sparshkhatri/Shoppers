import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getQuantity() {
    if(this.shoppingCart){
      if(this.shoppingCart.items && this.shoppingCart.items[this.product.key]){
        return this.shoppingCart.items[this.product.key].quantity;
      }else{
        return 0;
      }
    }else{
      return 0;
    }
  }
}
