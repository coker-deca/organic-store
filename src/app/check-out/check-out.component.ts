import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-carts';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  userSubscription!: Subscription;
  cartSubscription!: Subscription;
  shippingDetails: any = {};
  cart!: ShoppingCart;
  userId!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartServices: ShoppingCartService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    let cart$ = this.cartServices.getCart();
    this.cartSubscription = cart$.subscribe(result => this.cart = result);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user!.uid)
  }

  save() {
    let order = new Order(this.userId, this.shippingDetails, this.cart);
    let result = this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
