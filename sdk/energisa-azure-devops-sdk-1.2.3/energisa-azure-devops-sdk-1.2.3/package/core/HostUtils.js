var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CoreRestClient } from 'azure-devops-extension-api/Core';
import * as DevOps from 'azure-devops-extension-sdk';
export const getHostUrl = (localStorageKey, includeOrg) => __awaiter(void 0, void 0, void 0, function* () {
    if (localStorageKey !== undefined) {
        const storedUrl = localStorage.getItem(localStorageKey);
        if (storedUrl !== null) {
            return storedUrl;
        }
    }
    const navService = yield DevOps.getService('ms.vss-features.location-service');
    if (navService === undefined)
        return undefined;
    const hostBaseUrl = yield navService.getResourceAreaLocation(CoreRestClient.RESOURCE_AREA_ID);
    if (hostBaseUrl === undefined)
        return undefined;
    const returnUrl = includeOrg ? hostBaseUrl : new URL(hostBaseUrl).origin;
    if (localStorageKey !== undefined) {
        localStorage.setItem(localStorageKey, returnUrl);
    }
    return returnUrl;
});
