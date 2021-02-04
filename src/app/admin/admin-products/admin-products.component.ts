import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products$: any;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll().snapshotChanges()
    .pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        console.log(data)
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }

  delete(productId: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(productId);
  }

  ngOnInit(): void {
  }

}
