export class SubscriptionType {
    type: string;
    capacity: number;
    price: number;

    constructor(type: string, price: number, capacity: number) {
        this.type = type;
        this.price = price;
        this.capacity = capacity;
    }
}
