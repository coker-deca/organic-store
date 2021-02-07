import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: unknown[] = [];
  filteredProducts: unknown[] = [];
  category: string = '';

  constructor(productService: ProductService, route: ActivatedRoute) {
    productService.getAll().valueChanges().pipe(switchMap(value => {
      this.products = value;
      return route.queryParamMap
    })).subscribe(params => {
      this.category = params.get('category')!;

      this.filteredProducts = (this.category) ?
        this.products.filter((p:any) => p.category === this.category) :
        this.products;
    })
  }

}
