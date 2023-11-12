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
export class ExtendedWikiRestClient extends RestClientBase {
    constructor(options) {
        super(options);
    }
    getPageMetadata(project, wikiIdentifier, id, recursionLevel, includeContent) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.beginRequest({
                apiVersion: '5.2-preview.1',
                httpResponseType: 'application/json',
                routeTemplate: '{project}/_apis/wiki/wikis/{wikiIdentifier}/pages/{id}',
                routeValues: {
                    project: project,
                    wikiIdentifier: wikiIdentifier,
                    id: id
                },
                queryParams: {
                    recursionLevel: recursionLevel,
                    includeContent: includeContent
                }
            });
        });
    }
}
ExtendedWikiRestClient.RESOURCE_AREA_ID = 'bf7d82a0-8aa5-4613-94ef-6172a5ea01f3';
