import { jsx as _jsx } from "react/jsx-runtime";
import { ZeroData } from 'azure-devops-ui/ZeroData';
import * as css from 'classnames';
import { Component } from 'react';
export class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(_) {
        return { hasError: true };
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    render() {
        if (this.state.hasError) {
            return (_jsx("div", Object.assign({ className: css('flex-row flex-grow', this.props.className) }, { children: _jsx(ZeroData, { imageAltText: '', className: "flex-grow", iconProps: this.props.iconProps, primaryText: this.props.title || 'Error', secondaryText: this.props.description || 'An error occurred when showing this section' }) })));
        }
        return this.props.children;
    }
}
