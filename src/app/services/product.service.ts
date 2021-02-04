import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    return this.db.list('/product').push(product);
  }

  getAll() {
    return this.db.list('/product',
      ref => ref.orderByChild('title'))
  }

  get(productId: string) {
    return this.db.object('/product/' + productId).valueChanges();
  }

  update(productId: string, product: Partial<any>) {
    return this.db.object('/product/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/product/' + productId).remove();
  }
}
