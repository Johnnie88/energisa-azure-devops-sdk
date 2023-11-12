var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as DevOps from 'azure-devops-extension-sdk';
export const isSameIdentity = (first, second) => {
    if (first.id === second.id)
        return true;
    if (first.descriptor !== undefined && second.descriptor !== undefined) {
        if (first.descriptor === second.descriptor)
            return true;
    }
    return false;
};
export const isLoggedInUser = (identity) => {
    const loggedIn = DevOps.getUser();
    if (identity.id === loggedIn.id)
        return true;
    if (identity.descriptor !== undefined && loggedIn.descriptor !== undefined) {
        if (identity.descriptor === loggedIn.descriptor)
            return true;
    }
    return false;
};
export const getLoggedInUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const loggedIn = DevOps.getUser();
    const client = yield DevOps.getService('ms.vss-features.identity-service');
    const identityResult = yield client.searchIdentitiesAsync(loggedIn.id, ['user'], ['ims', 'source'], 'uid');
    if (identityResult === undefined || identityResult.length < 1)
        return undefined;
    const user = identityResult[0];
    const id = {
        id: user.localId || user.entityId,
        descriptor: user.subjectDescriptor,
        entityId: user.entityId,
        displayName: user.displayName || 'Unknown User',
        image: user.image,
        entityType: user.entityType
    };
    return id;
});
export const mapAbsoluteImageUrl = (baseUrl, identity) => {
    return Object.assign(Object.assign({}, identity), { image: identity.image === undefined
            ? undefined
            : baseUrl === undefined
                ? ''
                : `${baseUrl}${identity.image}` });
};
