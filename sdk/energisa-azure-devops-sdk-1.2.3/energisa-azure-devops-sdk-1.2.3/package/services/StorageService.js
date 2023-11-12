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
import { ScopeType } from '../CommonTypes';
import { DevOpsService } from './DevOpsService';
export class StorageService {
    constructor() {
        this._devOpsServive = new DevOpsService();
    }
    getDataService() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.dataService === undefined) {
                this.dataService = yield DevOps.getService('ms.vss-features.extension-data-service');
            }
            return this.dataService;
        });
    }
    getAll(collectionName, scope = ScopeType.Default) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataService = yield this.getDataService();
            if (collectionName === undefined) {
                throw new Error('Failed to initialize ');
            }
            const dataManager = yield dataService.getExtensionDataManager(DevOps.getExtensionContext().id, yield DevOps.getAccessToken());
            const document = yield dataManager.getDocuments(collectionName, {
                scopeType: scope,
                defaultValue: undefined
            });
            return document;
        });
    }
    getById(collectionName, id, scope = ScopeType.Default) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataService = yield this.getDataService();
            if (collectionName === undefined) {
                throw new Error('Failed to initialize ');
            }
            const dataManager = yield dataService.getExtensionDataManager(DevOps.getExtensionContext().id, yield DevOps.getAccessToken());
            const document = yield dataManager.getDocument(collectionName, id, {
                scopeType: scope,
                defaultValue: undefined
            });
            return document;
        });
    }
}
