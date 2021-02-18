import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products',
      ref => ref.orderByChild('title'))
  }

  get(productId: string): Observable<any> {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId: string, product: Partial<Product>) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
