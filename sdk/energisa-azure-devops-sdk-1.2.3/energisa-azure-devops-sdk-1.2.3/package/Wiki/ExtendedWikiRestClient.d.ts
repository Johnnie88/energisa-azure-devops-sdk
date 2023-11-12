import { IVssRestClientOptions } from 'azure-devops-extension-api';
import { RestClientBase } from 'azure-devops-extension-api/Common/RestClientBase';
import { VersionControlRecursionType } from 'azure-devops-extension-api/Git';
export interface WikiPageMeta {
    path: string;
    order: number;
    gitItemPath: string;
    subPages: any[];
    url: string;
    remoteUrl: string;
    id: number;
    content: string;
}
export declare class ExtendedWikiRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID = "bf7d82a0-8aa5-4613-94ef-6172a5ea01f3";
    getPageMetadata(project: string, wikiIdentifier: string, id: number, recursionLevel?: VersionControlRecursionType, includeContent?: boolean): Promise<WikiPageMeta>;
}
