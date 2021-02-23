import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-carts';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent {
  @Input('cart') cart!: ShoppingCart;


}
