var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RestClientBase } from 'azure-devops-extension-api/Common/RestClientBase';
export class ExtendedWorkItemTrackingRestClient extends RestClientBase {
    constructor(options) {
        super(options);
    }
    /**
     * Returns a single work item tag
     *
     * @param tagIdOrName - Name or Id of tag
     * @param project - Project ID or project name
     */
    getWorkItemTag(tagIdOrName, project) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.beginRequest({
                apiVersion: '5.0',
                routeTemplate: '{project}/_apis/wit/tags/{tagIdOrName}',
                routeValues: {
                    project: project,
                    tagIdOrName: tagIdOrName
                }
            });
        });
    }
    /**
     * Returns all work item tagd
     *
     * @param project - Project ID or project name
     */
    getWorkItemTags(project) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.beginRequest({
                apiVersion: '5.0',
                routeTemplate: '{project}/_apis/wit/tags',
                routeValues: {
                    project: project
                }
            });
        });
    }
}
ExtendedWorkItemTrackingRestClient.RESOURCE_AREA_ID = '5264459e-e5e0-4bd8-b118-0985e68a4ec5';
