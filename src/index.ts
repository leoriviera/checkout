import { calculateCost, Item } from './lib/calculateCost';

const apple: Item = {
    id: 'apple',
    displayName: 'Apple',
    price: 60,
};

const orange: Item = {
    id: 'orange',
    displayName: 'Orange',
    price: 25,
};

const basket = [apple, apple, orange, apple];
const price = calculateCost(basket);

const priceString = price.toString().padStart(3, '0');
const pence = priceString.slice(priceString.length - 2);
const pounds = priceString.slice(0, priceString.length - 2);

console.log(`The total price of your basket is £${pounds}.${pence}.`);
