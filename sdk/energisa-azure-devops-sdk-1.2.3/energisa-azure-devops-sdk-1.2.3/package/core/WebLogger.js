/* istanbul ignore file */
const format = '%c{0} %c{1}';
const dateFormat = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}]';
const pad = (number, zeros) => {
    const zero = zeros || 2;
    return (new Array(zero + 1).join('0') + number).substr(-zero, zero);
};
const formatTimeZone = (minutesOffset) => {
    const m = Math.abs(minutesOffset);
    return `${minutesOffset >= 0 ? '-' : '+'}${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
};
const formatDate = (template, date) => {
    return template
        .replace('{y}', String(date.getFullYear()))
        .replace('{m}', pad(date.getMonth() + 1))
        .replace('{d}', pad(date.getDate()))
        .replace('{h}', pad(date.getHours()))
        .replace('{i}', pad(date.getMinutes()))
        .replace('{s}', pad(date.getSeconds()))
        .replace('{ms}', pad(date.getMilliseconds(), 3))
        .replace('{z}', formatTimeZone(date.getTimezoneOffset()))
        .replace('{iso}', date.toISOString());
};
const getTemplate = (level) => {
    const formattedDate = formatDate(dateFormat, new Date());
    return format.replace('{0}', formattedDate).replace('{1}', level);
};
/**
 * Provides a set of methods to log messages to the console.
 //TODO: On Energisa Environment, the console.log needs to be replaced by a monitoring service.
 */
export const WebLogger = {
    trace: (...params) => {
        // eslint-disable-next-line no-console
        console.log(getTemplate('TRACE'), 'color: green', 'color: orange', ...params);
    },
    information: (...params) => {
        // eslint-disable-next-line no-console
        console.log(getTemplate('INF'), 'color: green', 'color: aqua', ...params);
    },
    warning: (...params) => {
        // eslint-disable-next-line no-console
        console.warn(getTemplate('WARN'), 'color: green', 'color: yellow', ...params);
    },
    error: (...params) => {
        // eslint-disable-next-line no-console
        console.error(getTemplate('WARN'), 'color: green', 'color: red', ...params);
    },
    debug: (...params) => {
        if (process.env.NODE_ENV !== 'production') {
            console.log(getTemplate('DEBUG'), 'color: green', 'color: pink', ...params);
        }
    }
};
