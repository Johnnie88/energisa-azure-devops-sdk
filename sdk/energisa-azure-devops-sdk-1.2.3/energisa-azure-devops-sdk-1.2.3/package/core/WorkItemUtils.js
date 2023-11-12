import { isDefined } from './CoreUtils';
const titleField = 'System.Title';
const parentField = 'System.LinkTypes.Hierarchy-Reverse';
const childField = 'System.LinkTypes.Hierarchy-Forward';
const workItemType = 'System.WorkItemType';
const state = 'System.State';
const columnField = 'System.BoardColumn';
const areaPath = 'System.AreaPath';
/**
 *
 * Get work item id from url
 *
 * @param url Url of work item
 * @returns id of work item
 */
export const getIdFormWorkItemUrl = (url) => {
    const idString = url.split('/').pop();
    if (idString === undefined)
        return undefined;
    const id = parseInt(idString);
    if (isNaN(id))
        return undefined;
    return id;
};
/**
 * Get id of parent work item
 *
 *  @param workItem
 * @returns
 */
export const getParentId = (workItem) => {
    const parent = workItem.relations.find(x => x.rel === parentField);
    if (parent === undefined)
        return undefined;
    return getIdFormWorkItemUrl(parent.url);
};
/**
 * Get ids of child work items
 *
 * @param workItem
 * @returns
 */
export const getChildIds = (workItem) => {
    const children = workItem.relations.filter(x => x.rel === childField);
    if (children === undefined)
        return undefined;
    if (children.length === 0)
        return undefined;
    return children.map(c => getIdFormWorkItemUrl(c.url)).filter(isDefined);
};
/**
 * Get work item type
 * @param workItem
 * @returns Work item type display name. E.g "User Story"
 */
export const getWorkItemTypeDisplayName = (workItem) => workItem.fields[workItemType];
/**
 * Get work item state
 * @param workItem
 * @returns Work item state
 */
export const getWorkItemState = (workItem) => workItem.fields[state];
/**
 * Get work item type reference name. E.g "User Story" => "Microsoft.VSTS.WorkItemTypes.UserStory"
 * @param workItem
 * @returns work item type reference name. E.g "Microsoft.VSTS.WorkItemTypes.UserStory"
 */
export const getWorkItemReferenceName = (workItem, workItemTypes) => {
    const type = getWorkItemTypeDisplayName(workItem);
    return getWorkItemReferenceNameFromDisplayName(type, workItemTypes);
};
/**
 * Get work item type reference name. E.g "User Story" => "Microsoft.VSTS.WorkItemTypes.UserStory"
 *
 * @param name Work item display name. E.g "User Story"
 * @param workItemTypes
 * @returns work item reference name. E.g "Microsoft.VSTS.WorkItemTypes.UserStory"
 */
export const getWorkItemReferenceNameFromDisplayName = (name, workItemTypes) => { var _a; return (_a = workItemTypes.find(x => x.name === name)) === null || _a === void 0 ? void 0 : _a.referenceName; };
/**
 * Get work item title
 *
 * @param workItem
 * @returns
 */
export const getWorkItemTitle = (workItem) => workItem.fields[titleField];
export const getWorkTypeFromReferenceName = (referenceName, workItemTypes) => workItemTypes.find(x => x.referenceName === referenceName);
/**
 * Get work item column
 *
 * @param workItem
 * @returns
 */
export const getWorkItemColumn = (workItem) => workItem.fields[columnField];
/**
 * Get work item area path
 *
 * @param workItem
 * @returns
 */
export const getWorkItemAreaPath = (workItem) => workItem.fields[areaPath];
