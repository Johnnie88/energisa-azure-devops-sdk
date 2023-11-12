import { IDialogOptions, IPanelOptions, IProjectInfo } from 'azure-devops-extension-api';
export interface IDevOpsService {
    getProject(): Promise<IProjectInfo | undefined>;
    showToast(message: string): Promise<void>;
    showPanel<T, PanelIds>(id: PanelIds, options: IPanelOptions<T>): Promise<void>;
    openLink(url: string): Promise<void>;
    getCurrentWorkItemId(): Promise<number | undefined>;
    showDialog<T, DialogIds>(id: DialogIds, options: IDialogOptions<T>): Promise<void>;
}
/**
 * DevOpsService class provides methods to interact with Azure DevOps services.
 */
export declare class DevOpsService implements IDevOpsService {
    getProject(): Promise<IProjectInfo | undefined>;
    /**
     * Displays a toast message with the given text.
     * @param message The text to display in the toast message.
     * TODO: Verify on Energisa Environment if the 2500 duration is enough.
     */
    showToast(message: string): Promise<void>;
    showDialog<T, DialogIds>(id: DialogIds, options: IDialogOptions<T>): Promise<void>;
    showPanel<T, PanelIds>(id: PanelIds, options: IPanelOptions<T>): Promise<void>;
    /**
     * Opens a new window with the specified URL using the DevOps host navigation service.
     * @param url The URL to open in the new window.
     */
    openLink(url: string): Promise<void>;
    /**
     * Retrieves the ID of the current work item.
     * @returns The ID of the current work item, or undefined if there is no current work item.
     */
    getCurrentWorkItemId(): Promise<number | undefined>;
    getQueryParameters(): Promise<{
        [key: string]: string;
    } | undefined>;
}
