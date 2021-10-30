export const isSometimesTrue = (probability: number): boolean => Math.random() >= probability;

export function randomInt(min: number, maxExclusive: number) {
    min = Math.ceil(min);
    maxExclusive = Math.floor(maxExclusive);
    return Math.floor(Math.random() * (maxExclusive - min)) + min;
}
