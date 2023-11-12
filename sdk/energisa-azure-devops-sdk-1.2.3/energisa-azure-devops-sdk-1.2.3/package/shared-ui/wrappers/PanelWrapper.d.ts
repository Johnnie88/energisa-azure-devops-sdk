/// <reference types="react" />
import { IButtonProps } from 'azure-devops-ui/Button';
import { VersionDisplayProps } from '../component/VersionDisplay';
export interface PanelWrapperProps extends VersionDisplayProps {
    children: React.ReactNode;
    cancelButton?: IButtonProps;
    okButton?: IButtonProps;
    showVersion?: boolean;
    rootClassName?: string;
    contentClassName?: string;
}
export declare const PanelWrapper: ({ children, cancelButton, okButton, showVersion, moduleVersion, showExtensionVersion, rootClassName, contentClassName }: PanelWrapperProps) => JSX.Element;
