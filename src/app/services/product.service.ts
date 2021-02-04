import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    return this.db.list('/product/products').push(product);
  }

  getAll() {
    return this.db.list('/product/products',
      ref => ref.orderByChild('title'))
  }

  get(productId: string) {
    return this.db.object('/product/products/' + productId).valueChanges();
  }

  update(productId: string, product: Partial<Product>) {
    return this.db.object('/product/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/product/products/' + productId).remove();
  }
}
