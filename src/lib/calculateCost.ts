export type Item = {
    /** A unique item ID*/
    id: string;
    /** A human-readable item name */
    displayName: string;
    /** The item price, in pence */
    price: number;
    /** An array listing multibuy offers */
    multiBuy?: [number, number];
};

/**
 * A function which calculates whether an item is valid
 *
 * @param item the item to validate
 * @returns a boolean representing whether the item is valid
 */
const checkItemValid = (item: Item): boolean =>
    item.price >= 0 &&
    (item.multiBuy ? item.multiBuy[0] > 0 && item.multiBuy[1] > 0 : true);

/**
 * A function to calculate the frequency of items by ID
 * ```js
 * const basket = [apple, apple, apple];
 * calculateItemFrequency(basket) // => { "apple": 3 }
 * ```
 *
 * @param basket a valid basket of items
 * @returns an object with a key of basket IDs and a value of the count of items with that ID in the basket
 */
const calculateItemFrequency = (basket: Item[]): Record<string, number> => {
    const itemCounts = {};

    basket
        .map((i) => i.id)
        .forEach(
            (id) => (itemCounts[id] = itemCounts[id] ? itemCounts[id] + 1 : 1)
        );

    return itemCounts;
};

/**
 * A function which calculates the cost of a basket of items.
 *
 * @param basket a basket of items
 * @returns the price of the basket in pence
 */
export const calculateCost = (basket: Item[]): number => {
    // For each item, if the item is not valid, throw an error
    basket.forEach((item) => {
        if (!checkItemValid(item)) {
            throw new Error(
                `The item "${item.displayName}" with ID "${item.id}" is invalid.`
            );
        }
    });

    // Calculate item frequency by ID
    const itemFrequencies = calculateItemFrequency(basket);

    // Calculate the total price of all items of the same ID
    const itemPrices = Object.entries(itemFrequencies).map(([id, quantity]) => {
        // Get the item's price and multiBuy status
        const { price, multiBuy } = basket.find((i) => i.id === id);

        // If there are no multiBuys, calculate price as normal
        if (multiBuy === undefined) {
            return quantity * price;
        }

        const x = multiBuy[0];
        const y = multiBuy[1];

        // Get number of multibuy offers for this item in the basket
        const multiBuyOffers = Math.floor(quantity / x);
        // Get number of remaining items not covered by multibuy
        const remainingItems = quantity - multiBuyOffers * x;

        // Add number of equivalent multibuy items and add remaining items
        const newQuantity = multiBuyOffers * y + remainingItems;

        // Calculate new price
        return newQuantity * price;
    });

    // Find the sum of all items by reducing
    return itemPrices.reduce((prev, curr) => prev + curr, 0);
};
