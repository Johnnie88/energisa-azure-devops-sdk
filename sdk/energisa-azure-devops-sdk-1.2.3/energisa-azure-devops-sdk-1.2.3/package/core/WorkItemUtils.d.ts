import { WorkItem, WorkItemType } from 'azure-devops-extension-api/WorkItemTracking';
/**
 *
 * Get work item id from url
 *
 * @param url Url of work item
 * @returns id of work item
 */
export declare const getIdFormWorkItemUrl: (url: string) => number | undefined;
/**
 * Get id of parent work item
 *
 *  @param workItem
 * @returns
 */
export declare const getParentId: (workItem: WorkItem) => number | undefined;
/**
 * Get ids of child work items
 *
 * @param workItem
 * @returns
 */
export declare const getChildIds: (workItem: WorkItem) => number[] | undefined;
/**
 * Get work item type
 * @param workItem
 * @returns Work item type display name. E.g "User Story"
 */
export declare const getWorkItemTypeDisplayName: (workItem: WorkItem) => string;
/**
 * Get work item state
 * @param workItem
 * @returns Work item state
 */
export declare const getWorkItemState: (workItem: WorkItem) => string;
/**
 * Get work item type reference name. E.g "User Story" => "Microsoft.VSTS.WorkItemTypes.UserStory"
 * @param workItem
 * @returns work item type reference name. E.g "Microsoft.VSTS.WorkItemTypes.UserStory"
 */
export declare const getWorkItemReferenceName: (workItem: WorkItem, workItemTypes: WorkItemType[]) => string | undefined;
/**
 * Get work item type reference name. E.g "User Story" => "Microsoft.VSTS.WorkItemTypes.UserStory"
 *
 * @param name Work item display name. E.g "User Story"
 * @param workItemTypes
 * @returns work item reference name. E.g "Microsoft.VSTS.WorkItemTypes.UserStory"
 */
export declare const getWorkItemReferenceNameFromDisplayName: (name: string, workItemTypes: WorkItemType[]) => string | undefined;
/**
 * Get work item title
 *
 * @param workItem
 * @returns
 */
export declare const getWorkItemTitle: (workItem: WorkItem) => string;
export declare const getWorkTypeFromReferenceName: (referenceName: string, workItemTypes: WorkItemType[]) => WorkItemType | undefined;
/**
 * Get work item column
 *
 * @param workItem
 * @returns
 */
export declare const getWorkItemColumn: (workItem: WorkItem) => string;
/**
 * Get work item area path
 *
 * @param workItem
 * @returns
 */
export declare const getWorkItemAreaPath: (workItem: WorkItem) => string;
