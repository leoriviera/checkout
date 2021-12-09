export type Item = {
    /** A unique item ID*/
    id: string;
    /** A human-readable item name */
    displayName: string;
    /** The item price, in pence */
    price: number;
};

/**
 * A function which calculates whether an item is valid
 *
 * @param item the item to validate
 * @returns a boolean representing whether the item is valid
 */
const checkItemValid = (item: Item): boolean => item.price >= 0;

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

    // Map prices of items to array, and find the sum by reducing
    return basket
        .map((item) => item.price)
        .reduce((prev, curr) => prev + curr, 0);
};
