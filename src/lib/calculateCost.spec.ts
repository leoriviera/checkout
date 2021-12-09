import test from 'ava';

import { calculateCost, Item } from './calculateCost';

test('empty basket returns zero', (t) => {
    const total = calculateCost([]);
    t.is(total, 0);
});

test('basket of one item returns correct price', (t) => {
    const apple: Item = {
        id: 'apple',
        displayName: 'Apple',
        price: 60,
    };

    const appleBasket = [apple];
    const applePrice = calculateCost(appleBasket);
    t.is(applePrice, 60);

    const orange: Item = {
        id: 'orange',
        displayName: 'Orange',
        price: 25,
    };

    const orangeBasket = [orange];
    const orangePrice = calculateCost(orangeBasket);
    t.is(orangePrice, 25);
});

test('basket of only one item type returns correct price', (t) => {
    const apple: Item = {
        id: 'apple',
        displayName: 'Apple',
        price: 60,
    };

    const multipleAppleBasket = [apple, apple, apple, apple];
    const multipleApplePrice = calculateCost(multipleAppleBasket);
    t.is(multipleApplePrice, 240);
});

test('mixed basket returns correct price', (t) => {
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

    const mixedBasket = [apple, apple, orange, apple];
    const mixedBasketPrice = calculateCost(mixedBasket);
    t.is(mixedBasketPrice, 205);
});

test('basket with invalid item throws error', (t) => {
    const apple: Item = {
        id: 'apple',
        displayName: 'Apple',
        price: 60,
    };

    const antiApple: Item = {
        id: 'anti-apple',
        displayName: 'Apple made of anti-matter',
        price: -60,
    };

    const invalidBasket = [apple, apple, antiApple, apple];
    t.throws(() => calculateCost(invalidBasket), {
        message:
            'The item "Apple made of anti-matter" with ID "anti-apple" is invalid.',
    });
});
