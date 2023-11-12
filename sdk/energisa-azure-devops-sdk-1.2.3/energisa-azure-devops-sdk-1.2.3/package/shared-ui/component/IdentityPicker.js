var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { IdentityPickerDropdown } from 'azure-devops-ui/IdentityPicker';
import { useEffect, useMemo, useState } from 'react';
import { ExtensionPeoplePickerProvider } from '../../core/ExtensionPeoplePickerProvider';
export const IdentityPicker = (_a) => {
    var { onChange, identity, localStorageKey } = _a, rest = __rest(_a, ["onChange", "identity", "localStorageKey"]);
    const [loading, setLoading] = useState(false);
    const identityProvider = useMemo(() => {
        return new ExtensionPeoplePickerProvider(localStorageKey);
    }, []);
    useEffect(() => {
        function loadIdentity() {
            return __awaiter(this, void 0, void 0, function* () {
                if (identity === undefined)
                    return;
                if ((intId === undefined || intId.entityId !== identity.entityId) && !loading) {
                    setLoading(true);
                    const identityResult = (yield identityProvider.getEntityFromUniqueAttribute(identity.entityId));
                    setIntId(identityResult);
                    setLoading(false);
                }
            });
        }
        loadIdentity();
    }, [identity]);
    const [intId, setIntId] = useState();
    return (_jsx(IdentityPickerDropdown, Object.assign({ pickerProvider: identityProvider, value: intId, onChange: identity => {
            if (identity) {
                setIntId(identity);
                const id = {
                    id: identity.localId || identity.entityId,
                    descriptor: identity.subjectDescriptor,
                    entityId: identity.entityId,
                    displayName: identity.displayName || 'Unknown User',
                    image: identity.image,
                    entityType: identity.entityType
                };
                onChange(id);
            }
        } }, rest)));
};
