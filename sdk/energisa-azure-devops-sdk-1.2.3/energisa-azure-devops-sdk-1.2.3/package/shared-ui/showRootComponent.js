/* istanbul ignore file */
import { render } from 'react-dom';
export function showRootComponent(component, target) {
    render(component, document.getElementById(target));
}
