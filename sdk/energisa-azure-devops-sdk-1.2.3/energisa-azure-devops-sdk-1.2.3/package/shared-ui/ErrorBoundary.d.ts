import { IIconProps } from 'azure-devops-ui/Icon';
import { Component, ErrorInfo, ReactNode } from 'react';
interface Props {
    children: ReactNode;
    className?: string;
    title?: string;
    description?: string;
    iconProps?: IIconProps;
}
interface State {
    hasError: boolean;
}
export declare class ErrorBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(_: Error): State;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): ReactNode;
}
export {};
