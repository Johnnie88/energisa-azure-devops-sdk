import { IIdentity } from 'azure-devops-ui/IdentityPicker';
import { IInternalIdentity } from '../CommonTypes';
export declare const isSameIdentity: (first: IInternalIdentity, second: IInternalIdentity) => boolean;
export declare const isLoggedInUser: (identity: IInternalIdentity) => boolean;
export declare const getLoggedInUser: () => Promise<IInternalIdentity | undefined>;
export declare const mapAbsoluteImageUrl: (baseUrl: string, identity: IIdentity) => IIdentity;
