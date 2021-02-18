import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$:any;
  product!: Product;
  id: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getAll().snapshotChanges()
    .pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        // console.log(data)
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));

    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p)
  }

  save(product: Product) {
    this.id ? this.productService.update(this.id, product) :
    this.productService.create(product);
    this.router.navigate(['/admin/products'])
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {

  }
}
