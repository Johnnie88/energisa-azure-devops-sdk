import { capitalizeFirstLetter } from './StringUtils';
export const parseValidationError = (error) => {
    const data = error.inner
        .map((x) => {
        return {
            path: x.path,
            message: x.message
        };
    })
        .reduce((previousValue, currentValue) => {
        if (previousValue[currentValue.path] !== undefined) {
            return Object.assign(Object.assign({}, previousValue), { [currentValue.path]: [...previousValue[currentValue.path], currentValue.message] });
        }
        return Object.assign(Object.assign({}, previousValue), { [currentValue.path]: [currentValue.message] });
    }, {});
    return data;
};
export const getCombined = (errors, key, alternateKey) => {
    if (errors === undefined)
        return undefined;
    if (errors[key] === undefined)
        return undefined;
    return errors[key]
        .map(r => {
        return capitalizeFirstLetter(alternateKey === undefined ? r : r.replace(key, alternateKey));
    })
        .join('. ');
};
export const hasError = (errors, key) => {
    if (errors === undefined)
        return false;
    if (errors[key] === undefined)
        return false;
    return true;
};
export const getValidationCountByPattern = (errors, match) => {
    if (errors === undefined)
        return undefined;
    const count = Object.keys(errors).filter(x => x.match(match)).length;
    if (count > 0)
        return count;
    return undefined;
};
export const getValidationCount = (errors, fields) => {
    if (errors === undefined)
        return undefined;
    const count = Object.keys(errors).filter(x => fields.includes(x)).length;
    if (count > 0)
        return count;
    return undefined;
};
// TODO: Validate new rule to move when all the children are moved or all the parents are moved
