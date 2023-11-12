var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getClient } from 'azure-devops-extension-api/Common';
import { CoreRestClient } from 'azure-devops-extension-api/Core';
import { WorkItemTrackingRestClient } from 'azure-devops-extension-api/WorkItemTracking';
import { WorkItemTrackingProcessRestClient } from 'azure-devops-extension-api/WorkItemTrackingProcess';
import { getChildIds, getParentId } from '../core/WorkItemUtils';
import { ExtendedWorkItemTrackingRestClient } from '../WorkItemTracking/ExtendedWorkItemTrackingRestClient';
import { DevOpsService } from './DevOpsService';
/**
 * A service for interacting with work items in Azure DevOps.
 */
export class WorkItemService {
    constructor(devOpsService) {
        this._processTemplateTypeKey = 'System.ProcessTemplateType';
        this._devOpsService = devOpsService !== null && devOpsService !== void 0 ? devOpsService : new DevOpsService();
    }
    /**
     * Retrieves the area path for the current project.
     * @returns A Promise that resolves to a string representing the area path, or undefined if the project is not found.
     */
    getAreaPath() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this._devOpsService.getProject();
            if (project) {
                const props = yield this.getProjectProperties(project.id);
                const areaPath = (_a = props.find(x => x.name === 'System.AreaPath')) === null || _a === void 0 ? void 0 : _a.value;
                return areaPath;
            }
        });
    }
    /**
     * Sets the area path of a work item with the specified ID.
     * @param id The ID of the work item to update.
     * @param areaPath The new area path to set.
     * @returns A Promise that resolves to the updated WorkItem object.
     */
    setAreaPath(id, areaPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = getClient(WorkItemTrackingRestClient);
            const updated = yield client.updateWorkItem([
                {
                    op: 'add',
                    path: '/fields/System.AreaPath',
                    value: areaPath
                }
            ], id);
            return updated;
        });
    }
    /**
     * Retrieves the parent work item for a given work item ID.
     * @param id - The ID of the work item to retrieve the parent for.
     * @param workItem - Optional. The work item object to retrieve the parent for. If not provided, it will be fetched using the ID.
     * @param expand - Optional. The fields to expand on the work item object.
     * @returns A Promise that resolves to the parent work item object, or undefined if the work item has no parent.
     */
    getParentForWorkItem(id, workItem, expand) {
        return __awaiter(this, void 0, void 0, function* () {
            const wi = workItem || (yield this.getWorkItem(id, expand));
            const parentId = getParentId(wi);
            if (parentId === undefined)
                return undefined;
            const parentWi = yield this.getWorkItem(parentId, expand);
            return parentWi;
        });
    }
    /**
     * Retrieves the child work items for a given work item ID.
     * @param id - The ID of the work item to retrieve child work items for.
     * @param workItem - Optional. The work item to retrieve child work items for. If not provided, the work item will be retrieved using the provided ID.
     * @param expand - Optional. The fields to expand on the retrieved work items.
     * @returns A promise that resolves to an array of child work items, or undefined if there are no child work items.
     */
    getChildrenForWorkItem(id, workItem, expand) {
        return __awaiter(this, void 0, void 0, function* () {
            const wi = workItem || (yield this.getWorkItem(id, expand));
            const childIds = getChildIds(wi);
            if (childIds === undefined)
                return undefined;
            const wis = yield this.getWorkItems(childIds, expand);
            return wis;
        });
    }
    /**
     * Retrieves the properties of a project.
     * @param projectId The ID of the project to retrieve properties for.
     * @returns A promise that resolves to an array of project properties.
     */
    getProjectProperties(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const coreClient = getClient(CoreRestClient);
            const props = yield coreClient.getProjectProperties(projectId);
            return props;
        });
    }
    /**
     * Gets the name of the process template for the current project.
     * @returns A Promise that resolves to the name of the process template, or undefined if it could not be determined.
     */
    getProcessTemplateName() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this._devOpsService.getProject();
            if (project) {
                const props = yield this.getProjectProperties(project.id);
                const processClient = getClient(WorkItemTrackingProcessRestClient);
                const processId = (_a = props.find(x => x.name === this._processTemplateTypeKey)) === null || _a === void 0 ? void 0 : _a.value;
                if (processId) {
                    const process = yield processClient.getProcessByItsId(processId);
                    if (process.parentProcessTypeId !== undefined &&
                        process.parentProcessTypeId !== '00000000-0000-0000-0000-000000000000') {
                        const parentProcess = yield processClient.getProcessByItsId(process.parentProcessTypeId);
                        return parentProcess.name;
                    }
                    else {
                        return process.name;
                    }
                }
                return undefined;
            }
        });
    }
    /**
     * Retrieves the list of work item types for the current project.
     * @param fromProcess Optional flag to indicate whether to filter the work item types based on the current process.
     * @returns A promise that resolves to an array of WorkItemType objects.
     */
    getWorkItemTypes(fromProcess) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this._devOpsService.getProject();
            if (project) {
                const client = getClient(WorkItemTrackingRestClient);
                const types = yield client.getWorkItemTypes(project.name);
                if (fromProcess) {
                    const processClient = getClient(WorkItemTrackingProcessRestClient);
                    const props = yield this.getProjectProperties(project.id);
                    const processId = (_a = props.find(x => x.name === this._processTemplateTypeKey)) === null || _a === void 0 ? void 0 : _a.value;
                    if (processId === undefined) {
                        return types;
                    }
                    const wits = yield processClient.getProcessWorkItemTypes(processId);
                    return types.filter(x => wits.some(y => y.referenceName === x.referenceName));
                }
                else {
                    return types;
                }
            }
            return [];
        });
    }
    getWorkItem(id, expand, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = getClient(WorkItemTrackingRestClient);
            const wit = yield client.getWorkItem(id, undefined, fields, undefined, expand);
            return wit;
        });
    }
    getWorkItems(ids, expand, fields, errorPolicy) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = getClient(WorkItemTrackingRestClient);
            const wit = yield client.getWorkItems(ids, undefined, fields, undefined, expand, errorPolicy);
            return wit;
        });
    }
    setWorkItemState(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = getClient(WorkItemTrackingRestClient);
            const updated = yield client.updateWorkItem([
                {
                    op: 'add',
                    path: '/fields/System.State',
                    value: state
                }
            ], id);
            return updated;
        });
    }
    getWorkItemColumnValue(id, column) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = getClient(WorkItemTrackingRestClient);
            const wit = yield client.getWorkItem(id);
            return wit.fields[column];
        });
    }
    setWorkItemColumnValue(id, column, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = getClient(WorkItemTrackingRestClient);
            const updated = yield client.updateWorkItem([
                {
                    op: 'add',
                    path: `/fields/${column}`,
                    value: value
                }
            ], id);
            return updated;
        });
    }
    /**
     * Retrieves the tag definitions for the current project.
     * @returns A promise that resolves to an array of WorkItemTagDefinition objects, or undefined if the project cannot be retrieved.
     */
    getTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this._devOpsService.getProject();
            if (project) {
                const client = getClient(ExtendedWorkItemTrackingRestClient);
                const tags = yield client.getWorkItemTags('Xpace-Dev');
                return tags;
            }
        });
    }
    /**
     * Queries work items using the provided WIQL query string.
     * @param wiql - The WIQL query string to use for the work item query.
     * @returns A promise that resolves to a WorkItemQueryResult object, or undefined if the project is not found.
     */
    queryWorkItems(wiql) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this._devOpsService.getProject();
            if (project) {
                const client = getClient(WorkItemTrackingRestClient);
                const wit = client.queryByWiql({ query: wiql }, project.name);
                return wit;
            }
        });
    }
}
