import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { CartItem } from '../models/CartItem';
import { Cart } from '../models/Cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<Cart>>{
    let cartId = await this.getCartId();
    return this.db.object('/carts/'+ cartId).valueChanges().map((cart: Cart) => {
      if(cart){
        return new Cart(cart.dateCreated, cart.items);
      }
    });
  }

  createCart() {
    return this.db.list('/carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCartId() {
    let cartId = localStorage.getItem('cartId');
    if(cartId){
      return cartId;
    }else{
      let result = await this.createCart();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
  }

  getItem(cartId, productKey): AngularFireObject<CartItem> {
    return this.db.object('/carts/'+cartId+'/items/'+productKey);
  }

  async addToCart(p: Product) {
    let cartId = await this.getCartId();
    let cartItem = this.getItem(cartId, p.key);
    cartItem.valueChanges().take(1).subscribe(item => {
      let quantity = 1;
      if(item !== null){
        quantity = item.quantity + 1;
      }
      cartItem.update({
        product: p,
        quantity: quantity
      });
    });
    
  }

  async removeFromCart(p: Product) {
    let cartId = await this.getCartId();
    let cartItem = this.getItem(cartId, p.key);
    cartItem.valueChanges().take(1).subscribe(item => {
      let quantity = 1;
      if(item !== null){
        quantity = item.quantity - 1;
      }
      if(quantity > 0) {
        cartItem.update({
          product: p,
          quantity: quantity
        });
      }else{
        cartItem.remove();
      }
      
    });
    
  }

  async removeCartItem(cartItemId) {
    let cartId = await this.getCartId();
    let cartItem = this.getItem(cartId, cartItemId);
    cartItem.remove();
  }
}
