import { Component,  OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-carts';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  products: unknown[] = [];
  filteredProducts: unknown[] = [];
  category: string = '';
  cart$!: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService) {

  }

  ngOnInit(){
    this.cart$ = (this.cartService.getCart());
    this.populateProducts();
  }

  private populateProducts(){
    this.productService.getAll().snapshotChanges().pipe(switchMap(value => {
      this.products = value;
      return this.route.queryParamMap
    })).subscribe(params => {
      this.category = params.get('category')!;
      this.applyFilter();
    })

  }
  private applyFilter(){
    this.filteredProducts = (this.category) ?
      this.products.filter((p:any) => p.payload.val().category === this.category) :
      this.products;

  }

}
