import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnDestroy {
  orders: any;
  config: any;
  subscription: Subscription;

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.subscription = this.authService.user$.pipe(switchMap((user) => orderService.getOrdersByUsers(user!.uid)))
     .subscribe(orders => {
       console.log(orders);
      this.orders = orders;
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.orders.length,
      };
    });
  }

  pageChanged(event: number){
    this.config.currentPage = event;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
