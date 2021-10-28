export function insertAt<T>(arr: T[], newItem: T, index: number) {
    arr.splice(index, 0, newItem);
}
