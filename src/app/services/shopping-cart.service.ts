import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-carts';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  clearCart(){
    let cartId = this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  getCart() {
    let cartId = this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .valueChanges().pipe(map((item: any) => new ShoppingCart(item.items!)))
  }

  addToCart(product: any){
    this.updateItem(product,1)
  }

  removeFromCart(product: any) {
    this.updateItem(product, -1)
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key!;
  }

  private updateItem(product: any, change: number){
    let cartId = this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.exists()) {
        let quantity = item.payload.val().quantity;
        (quantity === 0) ? item$.remove() : item$.update({ quantity: quantity  + change});
      }
      else item$.set({
        title: product.payload.val().title,
        imageUrl: product.payload.val().imageUrl,
        price: product.payload.val().price,
        quantity: 1 });
    });
  }
}
