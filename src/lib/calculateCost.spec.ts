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

test('basket of one item with multibuys returns correct price', (t) => {
    const apple: Item = {
        id: 'apple',
        displayName: 'Apple',
        price: 60,
        multiBuy: [2, 1],
    };

    const appleBasket = [apple, apple];
    const applePrice = calculateCost(appleBasket);
    t.is(applePrice, 60);

    const orange: Item = {
        id: 'orange',
        displayName: 'Orange',
        price: 25,
        multiBuy: [3, 2],
    };

    const orangeBasket = [orange, orange, orange];
    const orangePrice = calculateCost(orangeBasket);
    t.is(orangePrice, 50);
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

test('item with unused multibuy returns correct price', (t) => {
    const apple: Item = {
        id: 'apple',
        displayName: 'Apple',
        price: 60,
    };

    const multipleAppleBasket = [apple, apple];
    const multipleApplePrice = calculateCost(multipleAppleBasket);
    t.is(multipleApplePrice, 120);
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

test('basket with invalid item price throws error', (t) => {
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

test('basket with invalid multibuy price throws error', (t) => {
    const apple: Item = {
        id: 'apple',
        displayName: 'Apple',
        price: 60,
        multiBuy: [2, 1],
    };

    const antiApple: Item = {
        id: 'anti-apple',
        displayName: 'Apple made of anti-matter',
        price: -60,
        multiBuy: [-2, 1],
    };

    const invalidBasket = [apple, apple, antiApple, apple];
    t.throws(() => calculateCost(invalidBasket), {
        message:
            'The item "Apple made of anti-matter" with ID "anti-apple" is invalid.',
    });
});

test('basket with one type of multibuy returns correct value', (t) => {
    const apple: Item = {
        id: 'apple',
        displayName: 'Apple',
        price: 60,
        multiBuy: [2, 1],
    };

    const orange: Item = {
        id: 'orange',
        displayName: 'Orange',
        price: 25,
        multiBuy: [3, 2],
    };

    const multiBuyBasket = [apple, apple, apple, orange];
    const multiBuyBasketPrice = calculateCost(multiBuyBasket);
    t.is(multiBuyBasketPrice, 145);
});

test('basket with multiple multibuys returns correct value', (t) => {
    const apple: Item = {
        id: 'apple',
        displayName: 'Apple',
        price: 60,
        multiBuy: [2, 1],
    };

    const orange: Item = {
        id: 'orange',
        displayName: 'Orange',
        price: 25,
        multiBuy: [3, 2],
    };

    const multiBuyBasket = [
        apple,
        apple,
        apple,
        apple,
        orange,
        orange,
        orange,
        orange,
    ];
    const multiBuyBasketPrice = calculateCost(multiBuyBasket);
    t.is(multiBuyBasketPrice, 195);
});
