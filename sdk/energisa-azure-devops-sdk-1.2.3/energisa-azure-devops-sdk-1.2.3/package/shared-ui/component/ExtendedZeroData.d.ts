/// <reference types="react" />
import { IButtonProps } from 'azure-devops-ui/Button';
import { IIconProps } from 'azure-devops-ui/Icon';
export interface ExtendedZeroDataProps {
    title: string;
    description?: string;
    buttons: IButtonProps[];
    icon?: IIconProps;
}
export declare const ExtendedZeroData: ({ buttons, icon, title, description }: ExtendedZeroDataProps) => JSX.Element;
