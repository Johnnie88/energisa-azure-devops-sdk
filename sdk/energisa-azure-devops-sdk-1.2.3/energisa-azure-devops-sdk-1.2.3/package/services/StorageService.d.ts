import { IExtensionDataService } from 'azure-devops-extension-api';
import { ScopeType } from '../CommonTypes';
export interface IStorageService {
    getAll<T>(collectionName: string, scope: ScopeType): Promise<T[] | undefined>;
    getById<T>(collectionName: string, id: string, scope: ScopeType): Promise<T | undefined>;
}
export declare class StorageService implements IStorageService {
    private dataService?;
    private _devOpsServive;
    constructor();
    protected getDataService(): Promise<IExtensionDataService>;
    getAll<T>(collectionName: string, scope?: ScopeType): Promise<T[] | undefined>;
    getById<T>(collectionName: string, id: string, scope?: ScopeType): Promise<T | undefined>;
}
