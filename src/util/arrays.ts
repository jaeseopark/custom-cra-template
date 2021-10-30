export function insertAt<T>(arr: T[], newItem: T, index: number) {
    arr.splice(index, 0, newItem);
}

export function initializeWithLength<T>(getElement: (i: number) => T, length: number) {
    return Array.from({ length }, (_, i) => getElement(i));
}
