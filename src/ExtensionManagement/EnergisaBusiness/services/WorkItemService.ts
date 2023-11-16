import { getClient } from '../../../Common';
import { CoreRestClient, ProjectProperty } from '../../../Core';
import {
  WorkItem,
  WorkItemErrorPolicy,
  WorkItemExpand,
  WorkItemQueryResult,
  WorkItemTagDefinition,
  WorkItemTrackingRestClient,
  WorkItemType
} from '../../../WorkItemTracking';
import { WorkItemTrackingProcessRestClient } from '../../../WorkItemTrackingProcess';
import { string } from 'yup';import { getChildIds, getParentId } from '../core/WorkItemUtils';
import { ExtendedWorkItemTrackingRestClient } from '../WorkItemTracking/ExtendedWorkItemTrackingRestClient';
import { DevOpsService, IDevOpsService } from './DevOpsService';

export interface IWorkItemService {
  getParentForWorkItem(
    id: number,
    workItem?: WorkItem,
    expand?: WorkItemExpand
  ): Promise<WorkItem | undefined>;
  getChildrenForWorkItem(
    id: number,
    workItem?: WorkItem,
    expand?: WorkItemExpand
  ): Promise<WorkItem[] | undefined>;
  getWorkItemTypes(fromProcess?: boolean): Promise<WorkItemType[]>;
  getWorkItem(id: number, expand?: WorkItemExpand, fields?: string[]): Promise<WorkItem>;
  getWorkItems(
    ids: number[],
    expand?: WorkItemExpand,
    fields?: string[],
    errorPolicy?: WorkItemErrorPolicy
  ): Promise<WorkItem[]>;
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
export class WorkItemService implements IWorkItemService {
  private _devOpsService: IDevOpsService;
  private _processTemplateTypeKey = 'System.ProcessTemplateType';
  constructor(devOpsService?: IDevOpsService) {
    this._devOpsService = devOpsService ?? new DevOpsService();
  }

  /**
   * Retrieves the area path for the current project.
   * @returns A Promise that resolves to a string representing the area path, or undefined if the project is not found.
   */
  public async getAreaPath(): Promise<string | undefined> {
    const project = await this._devOpsService.getProject();

    if (project) {
      const props = await this.getProjectProperties(project.id);
      const areaPath = props.find(x => x.name === 'System.AreaPath')?.value;
      return areaPath;
    }
  }

  /**
   * Sets the area path of a work item with the specified ID.
   * @param id The ID of the work item to update.
   * @param areaPath The new area path to set.
   * @returns A Promise that resolves to the updated WorkItem object.
   */
  public async setAreaPath(id: number, areaPath: string): Promise<WorkItem> {
    const client = getClient(WorkItemTrackingRestClient);
    const updated = await client.updateWorkItem(
      [
        {
          op: 'add',
          path: '/fields/System.AreaPath',
          value: areaPath
        }
      ],
      id
    );
    return updated;
  }

  /**
   * Retrieves the parent work item for a given work item ID.
   * @param id - The ID of the work item to retrieve the parent for.
   * @param workItem - Optional. The work item object to retrieve the parent for. If not provided, it will be fetched using the ID.
   * @param expand - Optional. The fields to expand on the work item object.
   * @returns A Promise that resolves to the parent work item object, or undefined if the work item has no parent.
   */
  public async getParentForWorkItem(
    id: number,
    workItem?: WorkItem,
    expand?: WorkItemExpand
  ): Promise<WorkItem | undefined> {
    const wi = workItem || (await this.getWorkItem(id, expand));
    const parentId = getParentId(wi);
    if (parentId === undefined) return undefined;
    const parentWi = await this.getWorkItem(parentId, expand);
    return parentWi;
  }

  /**
   * Retrieves the child work items for a given work item ID.
   * @param id - The ID of the work item to retrieve child work items for.
   * @param workItem - Optional. The work item to retrieve child work items for. If not provided, the work item will be retrieved using the provided ID.
   * @param expand - Optional. The fields to expand on the retrieved work items.
   * @returns A promise that resolves to an array of child work items, or undefined if there are no child work items.
   */
  public async getChildrenForWorkItem(
    id: number,
    workItem?: WorkItem,
    expand?: WorkItemExpand
  ): Promise<WorkItem[] | undefined> {
    const wi = workItem || (await this.getWorkItem(id, expand));
    const childIds = getChildIds(wi);
    if (childIds === undefined) return undefined;
    const wis = await this.getWorkItems(childIds, expand);
    return wis;
  }

  /**
   * Retrieves the properties of a project.
   * @param projectId The ID of the project to retrieve properties for.
   * @returns A promise that resolves to an array of project properties.
   */
  private async getProjectProperties(projectId: string): Promise<ProjectProperty[]> {
    const coreClient = getClient(CoreRestClient);
    const props = await coreClient.getProjectProperties(projectId);
    return props;
  }

  /**
   * Gets the name of the process template for the current project.
   * @returns A Promise that resolves to the name of the process template, or undefined if it could not be determined.
   */
  public async getProcessTemplateName(): Promise<string | undefined> {
    const project = await this._devOpsService.getProject();

    if (project) {
      const props = await this.getProjectProperties(project.id);
      const processClient = getClient(WorkItemTrackingProcessRestClient);
      const processId = props.find(x => x.name === this._processTemplateTypeKey)?.value;
      if (processId) {
        const process = await processClient.getProcessByItsId(processId);
        if (
          process.parentProcessTypeId !== undefined &&
          process.parentProcessTypeId !== '00000000-0000-0000-0000-000000000000'
        ) {
          const parentProcess = await processClient.getProcessByItsId(process.parentProcessTypeId);
          return parentProcess.name;
        } else {
          return process.name;
        }
      }

      return undefined;
    }
  }

  /**
   * Retrieves the list of work item types for the current project.
   * @param fromProcess Optional flag to indicate whether to filter the work item types based on the current process.
   * @returns A promise that resolves to an array of WorkItemType objects.
   */
  public async getWorkItemTypes(fromProcess?: boolean): Promise<WorkItemType[]> {
    const project = await this._devOpsService.getProject();
    if (project) {
      const client = getClient(WorkItemTrackingRestClient);
      const types = await client.getWorkItemTypes(project.name);
      if (fromProcess) {
        const processClient = getClient(WorkItemTrackingProcessRestClient);
        const props = await this.getProjectProperties(project.id);
        const processId = props.find(x => x.name === this._processTemplateTypeKey)?.value;
        if (processId === undefined) {
          return types;
        }

        const wits = await processClient.getProcessWorkItemTypes(processId);

        return types.filter(x => wits.some(y => y.referenceName === x.referenceName));
      } else {
        return types;
      }
    }
    return [];
  }

  /**
   * Retrieves a work item by ID.
   * @param id The ID of the work item to retrieve.
   * @param expand The level of detail to return in the work item.
   * @param fields The list of fields to retrieve for the work item.
   * @returns A Promise that resolves to the retrieved work item.
   */
  public async getWorkItem(
    id: number,
    expand?: WorkItemExpand,
    fields?: string[]
  ): Promise<WorkItem> {
    const client = getClient(WorkItemTrackingRestClient);
    const wit = await client.getWorkItem(id, undefined, fields, undefined, expand);
    return wit;
  }

  /**
   * Retrieves work items by their IDs.
   * @param ids - The IDs of the work items to retrieve.
   * @param expand - The level of detail to return for each work item.
   * @param fields - The fields to include in the results.
   * @param errorPolicy - The error policy to apply when retrieving the work items.
   * @returns A promise that resolves to an array of work items.
   */
  public async getWorkItems(
    ids: number[],
    expand?: WorkItemExpand,
    fields?: string[],
    errorPolicy?: WorkItemErrorPolicy
  ): Promise<WorkItem[]> {
    const client = getClient(WorkItemTrackingRestClient);
    const wit = await client.getWorkItems(ids, undefined, fields, undefined, expand, errorPolicy);
    return wit;
  }

  /**
   * Sets the state of a work item with the specified ID.
   * @param id The ID of the work item to update.
   * @param state The new state to set for the work item.
   * @returns A Promise that resolves to the updated WorkItem object.
   */
  public async setWorkItemState(id: number, state: string): Promise<WorkItem> {
    const client = getClient(WorkItemTrackingRestClient);
    const updated = await client.updateWorkItem(
      [
        {
          op: 'add',
          path: '/fields/System.State',
          value: state
        }
      ],
      id
    );
    return updated;
  }

  /**
   * Retrieves the value of a specific column for a given work item.
   * @param id The ID of the work item to retrieve.
   * @param column The name of the column to retrieve the value from.
   * @returns A Promise that resolves to the value of the specified column for the given work item.
   */
  public async getWorkItemColumnValue(id: number, column: string): Promise<string> {
    const client = getClient(WorkItemTrackingRestClient);
    const wit = await client.getWorkItem(id);
    return wit.fields[column];
  }

  /**
   * Sets the value of a specified column for a work item.
   * @param id - The ID of the work item.
   * @param column - The name of the column to set the value for.
   * @param value - The value to set for the specified column.
   * @returns A Promise that resolves to the updated WorkItem object.
   */
  public async setWorkItemColumnValue(
    id: number,
    column: string,
    value: string
  ): Promise<WorkItem> {
    const client = getClient(WorkItemTrackingRestClient);
    const updated = await client.updateWorkItem(
      [
        {
          op: 'add',
          path: `/fields/${column}`,
          value: value
        }
      ],
      id
    );
    return updated;
  }

  /**
   * Retrieves the tag definitions for the current project.
   * @returns A promise that resolves to an array of WorkItemTagDefinition objects, or undefined if the project cannot be retrieved.
   */
  public async getTags(): Promise<WorkItemTagDefinition[] | undefined> {
    const project = await this._devOpsService.getProject();

    if (project) {
      const client = getClient(ExtendedWorkItemTrackingRestClient);
      const tags = await client.getWorkItemTags('Energisa');
      return tags;
    }
  }

  /**
   * Queries work items using the provided WIQL query string.
   * @param wiql - The WIQL query string to use for the work item query.
   * @returns A promise that resolves to a WorkItemQueryResult object, or undefined if the project is not found.
   */
  public async queryWorkItems(wiql: string): Promise<WorkItemQueryResult | undefined> {
    const project = await this._devOpsService.getProject();

    if (project) {
      const client = getClient(WorkItemTrackingRestClient);
      const wit = client.queryByWiql({ query: wiql }, project.name);
      return wit;
    }
  }
}
