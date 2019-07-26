import { CartItem } from './CartItem';

export class Cart {
    dateCreated: string;
    items: { [key: string]: CartItem }
    cartItems: CartItem[] = [];

    constructor(dateCreated, items: { [key: string]: CartItem }) {
        this.dateCreated = dateCreated;
        this.items = items;

        for (let productId in items) {
            let item = items[productId];
            this.cartItems.push(new CartItem(item.product, item.quantity, productId));
        }
    }

    get totalPrice() {
        let sum = 0;
        for (let cartItem of this.cartItems) {
            sum += cartItem.totalPrice;
        }
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }
}