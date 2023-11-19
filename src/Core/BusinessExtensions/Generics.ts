// Please document the following method

/**
 * @description Returns a random element from an array]
 * @param {T[]} arr
 * @returns {T}
 * @memberOf Array
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const random = arr.random();
 * console.log(random); // 4
 * console.log(arr); // [1, 2, 3, 5]
 * 
    * @memberOf Array
    * @example
    * const arr = [1, 2, 3, 4, 5];
    * const random = arr.random();
    * console.log(random); // 4
    * console.log(arr); // [1, 2, 3, 5]
*/
export async function asyncFilter<T>(
    arr: T[],
    predicate: (x: T) => Promise<boolean>
  ): Promise<T[]> {
    const results = await Promise.all(arr.map(predicate));
    return arr.filter((_v, index) => results[index]);
  }

/**
 * @description Returns a random element from an array
 * @param {T[]} arr
 * @returns {T}
 *
 * @memberOf Array
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const random = arr.random();
 * console.log(random); // 4
 * console.log(arr); // [1, 2, 3, 5]
*/
  export function groupBy<T>(list: T[], keyGetter: (value: T) => string): Map<string, T[]> {
    const map = new Map<string, T[]>();
    list.forEach(item => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  export const distinct = <T>(value: T, index: number, self: T[]): boolean => {
  return self.indexOf(value) === index;
};
interface DistinctByOptions {
    downIteration?: boolean;
}

export const distinctBy = <T>(array: T[], key: keyof T, options?: DistinctByOptions): T[] => {
    const map = new Map<T[keyof T], T>();
    const downIteration = isDefined(options) && options.downIteration;

    if (downIteration) {
        for (let i = array.length - 1; i >= 0; i--) {
            const item = array[i];
            const value = item[key];
            map.set(value, item);
        }
    } else {
        array.forEach(item => {
            const value = item[key];
            map.set(value, item);
        });
    }

    return Array.from(map.values());
};

export const isDefined = <T>(item: T | undefined): item is T => {
    return !!item;
};