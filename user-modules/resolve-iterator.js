/**
 * Resolves all items from an AsyncGenerator into an array.
 * @param i - The AsyncGenerator to resolve.
 * @returns A promise that resolves to an array of items.
 */
export default async function resolveIterator(i) {
    const resolved = [];
    for await (const item of i) {
        resolved.push(item);
    }
    return resolved;
}
//# sourceMappingURL=resolve-iterator.js.map