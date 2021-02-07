import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  subscription: Subscription;
  config: any;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().snapshotChanges().subscribe(products => this.filteredProducts = this.products = products)
    // .pipe(map(items => {            // <== new way of chaining
    //   return items.map(a => {
    //     const data = a.payload.val();
    //     console.log(data)
    //     const key = a.payload.key;
    //     return {key, data};           // or {key, ...data} in case data is Obj
    //   });
    // }));
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.products.length,
    };
  }

  pageChanged(event: number){
    this.config.currentPage = event;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(productId: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(productId);
  }

  filter(query: string) {
    // console.log(this.products)
    this.filteredProducts = (query) ?
      this.products.filter(product => product.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.config.currentPage = 1;
  }

  ngOnInit(): void {
  }

}
