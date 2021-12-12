# checkout (The LEO Learning Developer Pre-interview Exercise)

## Project Task

Please complete the following exercise in Javascript/Typescript. Please use git to version control your exercise. Please create a README file with instructions that may be needed.

After completing the first step, please clearly tag the commit so that we can evaluate your approach. You may make other commits to further demonstrate your approach. Please compress your answers and submit them via your agent or send us a link to your Github (or similar) account. Do not send us binaries, they won't get through our firewalls.

Complete the steps in order. Don't read ahead. At each step build the simplest possible solution which meets our requirements. Tag a `git` commit after each step so that your approach is clear. Your answers will be used as part of our sifting and are likely to be discussed with your interviewer at later stages. 

### Step 1: Shopping Cart

You are building a checkout system for a shop which only sells apples and oranges. Apples cost 60p and oranges cost 25p. Build a checkout system which takes a list of items scanned at the till and outputs the total cost. For example, `[ Apple, Apple, Orange, Apple ] => £2.05`.

Make reasonable assumptions about the inputs to your solution; for example, many candidates take a list of strings as input 

### Step 2: Simple Offers

The shop decides to introduce two new offers.

- Buy one, get one free on apples
- 3 for the price of 2 on oranges

Update your checkout functions accordingly.

## Submission Notes

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

Each item in the basket is checked for a negative price and for a negative multibuy offer. Obviously, you don't want an item with a negative price, and you can't purchase -2 apples for the price of 1! If there is an item with a negative price in the basket, an error is thrown with the item's ID and display name.

This code has been unit tested with valid, extreme and invalid test data using `ava`. Run the tests using `yarn test`.
