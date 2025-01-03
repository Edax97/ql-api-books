/**
 * Resolves all items from an AsyncGenerator into an array.
 * @param i - The AsyncGenerator to resolve.
 * @returns A promise that resolves to an array of items.
 */
export default function resolveIterator<T>(i: AsyncGenerator<T>): Promise<T[]>;
