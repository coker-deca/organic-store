import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-carts';
import { OrderService } from '../services/order.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  shippingDetails: any = {};
  cart!: ShoppingCart;

  constructor(
    private cartServices: ShoppingCartService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    let cart$ = this.cartServices.getCart();
    this.subscription = cart$.subscribe(result =>{
      this.cart = result;
    })
  }

  save() {
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shippingDetails,
      items: this.cart.items.map(item=>{
        return {
          product:{
            title: item.title,
            imageUrl: item.imageUrl,
            price: item.price,
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      }
      })
    }
    this.orderService.storeOrder(order);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
