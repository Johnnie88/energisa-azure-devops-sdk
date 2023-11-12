/// <reference types="react" />
import { IIdentityPickerDropdownProps } from 'azure-devops-ui/IdentityPicker';
import { IInternalIdentity } from '../../CommonTypes';
export interface IdentityPickerProps extends Omit<IIdentityPickerDropdownProps, 'pickerProvider' | 'value' | 'onChange'> {
    identity?: IInternalIdentity;
    onChange: (item?: IInternalIdentity) => boolean | void;
    localStorageKey?: string;
}
export declare const IdentityPicker: ({ onChange, identity, localStorageKey, ...rest }: IdentityPickerProps) => JSX.Element;
