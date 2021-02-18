import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-carts';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  getCart() {
    let cartId = this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId)
    .valueChanges().pipe(map((item: any) => new ShoppingCart(item.items)))
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
  }
  private getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key!;
  }

  addToCart(product: any){
    this.updateItemQuantity(product,1)
  }

  removeFromCart(product: any) {
    this.updateItemQuantity(product, -1)
  }

  private updateItemQuantity(product: any, change: number){
    let cartId = this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.exists()) item$.update({ quantity: item.payload.val().quantity + change });
      else item$.set({ product: product.payload.val(), quantity: 1 });
    });
  }
}
