import { IdentitiesGetConnectionsResponseModel, IPeoplePickerProvider } from 'azure-devops-extension-api/Identities';
import { IIdentity } from 'azure-devops-ui/IdentityPicker';
export declare class ExtensionPeoplePickerProvider implements IPeoplePickerProvider {
    private identityService;
    private localStorageKey;
    constructor(localStorageKey?: string);
    addIdentitiesToMRU: (identities: IIdentity[]) => Promise<boolean>;
    getEntityFromUniqueAttribute: (entityId: string) => IIdentity | PromiseLike<IIdentity>;
    onEmptyInputFocus: () => IIdentity[] | PromiseLike<IIdentity[]>;
    onFilterIdentities: (filter: string, selectedItems?: IIdentity[]) => Promise<IIdentity[]> | IIdentity[];
    onRequestConnectionInformation: (entity: IIdentity, getDirectReports?: boolean) => IdentitiesGetConnectionsResponseModel | PromiseLike<IdentitiesGetConnectionsResponseModel>;
    removeIdentitiesFromMRU: (identities: IIdentity[]) => Promise<boolean>;
    private _onSearchPersona;
}
