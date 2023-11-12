import { WorkItem, WorkItemErrorPolicy, WorkItemExpand, WorkItemQueryResult, WorkItemTagDefinition, WorkItemType } from 'azure-devops-extension-api/WorkItemTracking';
import { IDevOpsService } from './DevOpsService';
export interface IWorkItemService {
    getParentForWorkItem(id: number, workItem?: WorkItem, expand?: WorkItemExpand): Promise<WorkItem | undefined>;
    getChildrenForWorkItem(id: number, workItem?: WorkItem, expand?: WorkItemExpand): Promise<WorkItem[] | undefined>;
    getWorkItemTypes(fromProcess?: boolean): Promise<WorkItemType[]>;
    getWorkItem(id: number, expand?: WorkItemExpand, fields?: string[]): Promise<WorkItem>;
    getWorkItems(ids: number[], expand?: WorkItemExpand, fields?: string[], errorPolicy?: WorkItemErrorPolicy): Promise<WorkItem[]>;
    setWorkItemState(id: number, state: string): Promise<WorkItem>;
    setWorkItemColumnValue(id: number, column: string, value: string): Promise<WorkItem>;
    getWorkItemColumnValue(id: number, column: string): Promise<string>;
    getProcessTemplateName(): Promise<string | undefined>;
    getTags(): Promise<WorkItemTagDefinition[] | undefined>;
    queryWorkItems(wiql: string): Promise<WorkItemQueryResult | undefined>;
    getAreaPath(): Promise<string | undefined>;
    setAreaPath(id: number, areaPath: string): Promise<WorkItem>;
}
/**
 * A service for interacting with work items in Azure DevOps.
 */
export declare class WorkItemService implements IWorkItemService {
    private _devOpsService;
    private _processTemplateTypeKey;
    constructor(devOpsService?: IDevOpsService);
    /**
     * Retrieves the area path for the current project.
     * @returns A Promise that resolves to a string representing the area path, or undefined if the project is not found.
     */
    getAreaPath(): Promise<string | undefined>;
    /**
     * Sets the area path of a work item with the specified ID.
     * @param id The ID of the work item to update.
     * @param areaPath The new area path to set.
     * @returns A Promise that resolves to the updated WorkItem object.
     */
    setAreaPath(id: number, areaPath: string): Promise<WorkItem>;
    /**
     * Retrieves the parent work item for a given work item ID.
     * @param id - The ID of the work item to retrieve the parent for.
     * @param workItem - Optional. The work item object to retrieve the parent for. If not provided, it will be fetched using the ID.
     * @param expand - Optional. The fields to expand on the work item object.
     * @returns A Promise that resolves to the parent work item object, or undefined if the work item has no parent.
     */
    getParentForWorkItem(id: number, workItem?: WorkItem, expand?: WorkItemExpand): Promise<WorkItem | undefined>;
    /**
     * Retrieves the child work items for a given work item ID.
     * @param id - The ID of the work item to retrieve child work items for.
     * @param workItem - Optional. The work item to retrieve child work items for. If not provided, the work item will be retrieved using the provided ID.
     * @param expand - Optional. The fields to expand on the retrieved work items.
     * @returns A promise that resolves to an array of child work items, or undefined if there are no child work items.
     */
    getChildrenForWorkItem(id: number, workItem?: WorkItem, expand?: WorkItemExpand): Promise<WorkItem[] | undefined>;
    /**
     * Retrieves the properties of a project.
     * @param projectId The ID of the project to retrieve properties for.
     * @returns A promise that resolves to an array of project properties.
     */
    private getProjectProperties;
    /**
     * Gets the name of the process template for the current project.
     * @returns A Promise that resolves to the name of the process template, or undefined if it could not be determined.
     */
    getProcessTemplateName(): Promise<string | undefined>;
    /**
     * Retrieves the list of work item types for the current project.
     * @param fromProcess Optional flag to indicate whether to filter the work item types based on the current process.
     * @returns A promise that resolves to an array of WorkItemType objects.
     */
    getWorkItemTypes(fromProcess?: boolean): Promise<WorkItemType[]>;
    getWorkItem(id: number, expand?: WorkItemExpand, fields?: string[]): Promise<WorkItem>;
    getWorkItems(ids: number[], expand?: WorkItemExpand, fields?: string[], errorPolicy?: WorkItemErrorPolicy): Promise<WorkItem[]>;
    setWorkItemState(id: number, state: string): Promise<WorkItem>;
    getWorkItemColumnValue(id: number, column: string): Promise<string>;
    setWorkItemColumnValue(id: number, column: string, value: string): Promise<WorkItem>;
    /**
     * Retrieves the tag definitions for the current project.
     * @returns A promise that resolves to an array of WorkItemTagDefinition objects, or undefined if the project cannot be retrieved.
     */
    getTags(): Promise<WorkItemTagDefinition[] | undefined>;
    /**
     * Queries work items using the provided WIQL query string.
     * @param wiql - The WIQL query string to use for the work item query.
     * @returns A promise that resolves to a WorkItemQueryResult object, or undefined if the project is not found.
     */
    queryWorkItems(wiql: string): Promise<WorkItemQueryResult | undefined>;
}
