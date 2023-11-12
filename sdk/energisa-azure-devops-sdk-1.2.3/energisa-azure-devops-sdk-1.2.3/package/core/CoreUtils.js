var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function asyncFilter(arr, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield Promise.all(arr.map(predicate));
        return arr.filter((_v, index) => results[index]);
    });
}
export function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        }
        else {
            collection.push(item);
        }
    });
    return map;
}
export const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
};
export const distinctBy = (array, key) => {
    return [...new Map(array.map(item => [item[key], item])).values()];
};
export const isDefined = (item) => {
    return !!item;
};
