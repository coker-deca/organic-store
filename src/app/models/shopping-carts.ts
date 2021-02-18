import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart{
  items: any[] = [];

  constructor(public itemsMap: { [productId: string]: any }) {
    this.itemsMap = itemsMap || {};
    for (const productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({...item, $key: productId}));
    }
  }

  get productIds() {
    return Object.keys(this.itemsMap)
  }

  getQuantity(product: any) {
    let item = this.itemsMap[product.$key || product.key];
    return item ? item.quantity : 0;
  }

  totalPrice(){
    let sum=0;
    for (const productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (const productId in this.itemsMap) {
      count += this.itemsMap[productId].quantity;
    }
    return count;
  }
}
