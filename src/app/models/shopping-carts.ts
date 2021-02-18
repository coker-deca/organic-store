export class ShoppingCart{
  items: any[] = [];

  constructor(public itemsMap: { [productId: string]: any }) {
    for (const productId in itemsMap) this.items.push(itemsMap[productId]);
  }

  get productIds() {
    return Object.keys(this.itemsMap)
  }

  get totalItemsCount() {
    let count = 0;
    for (const productId in this.itemsMap) {
      count += this.itemsMap[productId].quantity;
    }
    return count;
  }
}
