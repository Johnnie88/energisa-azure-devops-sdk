import { useState } from 'react';
export function useBooleanToggle(initialValue = false) {
    const [state, setState] = useState(initialValue);
    const toggle = (value) => {
        if (typeof value !== 'undefined') {
            setState(value);
        }
        else {
            setState(current => !current);
        }
    };
    return [state, toggle];
}
