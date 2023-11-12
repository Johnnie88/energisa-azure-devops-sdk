import { getService } from 'azure-devops-extension-sdk';
import { mapAbsoluteImageUrl } from '../utils/IdentityUtils';
import { getHostUrl } from './HostUtils';
export class ExtensionPeoplePickerProvider {
    constructor(localStorageKey) {
        this.addIdentitiesToMRU = (identities) => {
            return this.identityService.then(identityService => {
                return identityService.addMruIdentitiesAsync(identities);
            });
        };
        this.getEntityFromUniqueAttribute = (entityId) => {
            return getHostUrl(this.localStorageKey).then(hostUrl => {
                const url = hostUrl || '';
                return this.identityService.then(identityService => {
                    return identityService
                        .searchIdentitiesAsync(entityId, ['user'], ['ims', 'source'], 'uid')
                        .then(function (x) {
                        return mapAbsoluteImageUrl(url, x[0]);
                    });
                });
            });
        };
        this.onEmptyInputFocus = () => {
            return getHostUrl(this.localStorageKey).then(hostUrl => {
                const url = hostUrl || '';
                return this.identityService.then(identityService => {
                    return identityService.getIdentityMruAsync().then(identities => {
                        return identities.map(id => mapAbsoluteImageUrl(url, id));
                    });
                });
            });
        };
        this.onFilterIdentities = (filter, selectedItems) => {
            return this._onSearchPersona(filter, selectedItems ? selectedItems : []);
        };
        this.onRequestConnectionInformation = (entity, getDirectReports) => {
            return this.identityService.then(identityService => {
                return identityService.getConnections(entity, getDirectReports);
            });
        };
        this.removeIdentitiesFromMRU = (identities) => {
            return this.identityService.then(identityService => {
                return identityService.removeMruIdentitiesAsync(identities);
            });
        };
        this._onSearchPersona = (searchText, items) => {
            return getHostUrl(this.localStorageKey).then(hostUrl => {
                const url = hostUrl || '';
                const searchRequest = { query: searchText };
                return this.identityService.then(identityService => {
                    return identityService
                        .searchIdentitiesAsync(searchRequest.query, searchRequest.identityTypes, searchRequest.operationScopes, searchRequest.queryTypeHint, searchRequest.options)
                        .then((identities) => {
                        return identities
                            .filter(identity => !items.some(selectedIdentity => selectedIdentity.entityId === identity.entityId))
                            .map(id => mapAbsoluteImageUrl(url, id));
                    });
                });
            });
        };
        this.identityService = getService('ms.vss-features.identity-service');
        this.localStorageKey = localStorageKey;
    }
}
