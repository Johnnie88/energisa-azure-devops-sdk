import { IVssRestClientOptions } from 'azure-devops-extension-api';
import { RestClientBase } from 'azure-devops-extension-api/Common/RestClientBase';
import { WorkItemTagDefinition } from 'azure-devops-extension-api/WorkItemTracking';
export declare class ExtendedWorkItemTrackingRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID = "5264459e-e5e0-4bd8-b118-0985e68a4ec5";
    /**
     * Returns a single work item tag
     *
     * @param tagIdOrName - Name or Id of tag
     * @param project - Project ID or project name
     */
    getWorkItemTag(tagIdOrName: number, project: string): Promise<WorkItemTagDefinition>;
    /**
     * Returns all work item tagd
     *
     * @param project - Project ID or project name
     */
    getWorkItemTags(project: string): Promise<WorkItemTagDefinition[]>;
}
