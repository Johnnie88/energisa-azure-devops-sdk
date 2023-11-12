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
/**
 * DevOpsService class provides methods to interact with Azure DevOps services.
 */
export class DevOpsService {
    getProject() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectService = yield DevOps.getService('ms.vss-tfs-web.tfs-page-data-service');
            const project = yield projectService.getProject();
            return project;
        });
    }
    /**
     * Displays a toast message with the given text.
     * @param message The text to display in the toast message.
     * TODO: Verify on Energisa Environment if the 2500 duration is enough.
     */
    showToast(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageService = yield DevOps.getService('ms.vss-tfs-web.tfs-global-messages-service');
            messageService.addToast({
                duration: 2500,
                message: message
            });
        });
    }
    showDialog(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialogService = yield DevOps.getService('ms.vss-features.host-page-layout-service');
            dialogService.openCustomDialog(`${DevOps.getExtensionContext().id}.${id}`, options);
        });
    }
    showPanel(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialogService = yield DevOps.getService('ms.vss-features.host-page-layout-service');
            dialogService.openPanel(`${DevOps.getExtensionContext().id}.${id}`, options);
        });
    }
    /**
     * Opens a new window with the specified URL using the DevOps host navigation service.
     * @param url The URL to open in the new window.
     */
    openLink(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const navigationService = yield DevOps.getService('ms.vss-features.host-navigation-service');
            navigationService.openNewWindow(url, '');
        });
    }
    /**
     * Retrieves the ID of the current work item.
     * @returns The ID of the current work item, or undefined if there is no current work item.
     */
    getCurrentWorkItemId() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formService = yield DevOps.getService('ms.vss-work-web.work-item-form');
                const id = yield formService.getId();
                return id;
            }
            catch (_a) {
                return undefined;
            }
        });
    }
    getQueryParameters() {
        return __awaiter(this, void 0, void 0, function* () {
            const navService = yield DevOps.getService('ms.vss-features.host-navigation-service');
            const params = yield navService.getQueryParams();
            if (Object.keys(params).length === 0)
                return undefined;
            return params;
        });
    }
}
