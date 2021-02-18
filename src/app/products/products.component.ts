import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnDestroy {

  products: unknown[] = [];
  filteredProducts: unknown[] = [];
  category: string = '';
  cart: any;
  subscription: Subscription;

  constructor(productService: ProductService,
    route: ActivatedRoute,
    cartService: ShoppingCartService) {
    this.subscription = (cartService.getCart().subscribe(result=>this.cart=result));

    productService.getAll().snapshotChanges().pipe(switchMap(value => {
      this.products = value;
      return route.queryParamMap
    })).subscribe(params => {
      this.category = params.get('category')!;

      this.filteredProducts = (this.category) ?
        this.products.filter((p:any) => p.payload.val().category === this.category) :
        this.products;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
