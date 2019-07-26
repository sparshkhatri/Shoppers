import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  async placeOrder(shipping, cart, userId) {
    return this.db.list('/orders').push({
      dateCreated: new Date().getTime(),
      items: cart.items,
      shipping: shipping,
      userId: userId
    });
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUserId(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId));
  }
}
