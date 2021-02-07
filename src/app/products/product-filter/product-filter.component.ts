import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {

  @Input('category') category: any;
  categories$: Observable<unknown[]>;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll().snapshotChanges().pipe(map(value => value))
  }


}
