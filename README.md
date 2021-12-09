# checkout

The LEO Learning Developer Pre-interview Exercise

This repo has been generated using `typescript-starter`.

To use this code

1. Import `Item` type and `calculateCost` function from `src/lib/calculateCost.ts`
2. Use the `Item` type to create an item for checkout, with an `id`, `displayName`, `price` in pence and `multiBuy` array. Multibuys are in the form `[x, y]`, where a basket can purchase `x` items for the price of `y`.
3. Construct a `basket`, which is an array of `Item`s
4. Pass your `basket` to `calculateCost` to find your total price

A sample has been provided in `src/index.ts`. To run the code, install dependencies using `yarn install` and then run with `yarn start`.

The attributes of an `Item` are

- The `id`, which allows unique identification of a particular item,
- The `displayName`, which provides a human-readable name for the item,
- The `price` in pence which sets the price of the item. This value is stored as an integer (whole number of pence) and not a decimal (pounds and pence) as JavaScript uses floating point numbers to store decimals. Floating point numbers are not exact, can't represent some decimals properly (such as 0.1 + 0.2 not equalling 0.3), and can introduce rounding errors.
- `multiBuy`, which defines a multibuy deal for that particular item. Note that an item's ID should be unique for multibuys to be calculated correctly.

Defining items using the `Item` type instead of hard-coding apples and oranges allows easy extension of the code to support other groceries in a basket, and allows for extending each item with additional information as necessary.

Each item in the basket is checked for a negative price. Obviously, you don't want an item with a negative price! If there is an item with a negative price in the basket, an error is thrown with the item's ID and display name.

This code has been unit tested with valid, extreme and invalid test data using `ava`. Run the tests using `yarn test`.
