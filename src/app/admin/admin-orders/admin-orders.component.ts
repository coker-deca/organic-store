import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnDestroy                           {
  orders: any;
  config: any;
  subscription: Subscription;

  constructor(private orderService: OrderService) {
    this.subscription = orderService.getOrders().snapshotChanges().subscribe(orders => {
      this.orders = orders
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
