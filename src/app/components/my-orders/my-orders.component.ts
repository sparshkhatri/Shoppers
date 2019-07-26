import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(private orderService: OrderService, private auth: AuthService) { }

  ngOnInit() {
    this.orders$ = this.auth.user$.switchMap(user => {
      return this.orderService.getOrdersByUserId(user.uid).valueChanges()
    });
  }

}
