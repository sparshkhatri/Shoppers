import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  products = [];
  subscription: Subscription;
  cartSubscription: Subscription;
  cart;
  constructor(private productService: ProductService, private cartService: CartService) { }

  async ngOnInit() {
    this.subscription = this.productService.getAll().snapshotChanges().subscribe(productList => {
      this.products = productList.map(product => {
          let productObj = product.payload.val();
          productObj['key'] = product.payload.key;
          return productObj;
      });
    });

    this.cartSubscription = (await this.cartService.getCart()).subscribe(cart => {
        this.cart = cart;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

}
