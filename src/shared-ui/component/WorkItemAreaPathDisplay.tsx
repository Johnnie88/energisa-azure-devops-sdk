import { WorkItem } from 'azure-devops-extension-api/WorkItemTracking';

export interface WorkItemAreaPathDisplayProps {
    areaPath: string;
    workItem: WorkItem;
}

export const WorkItemAreaPathDisplay = ({
    areaPath,
    workItem
}: WorkItemAreaPathDisplayProps): React.ReactElement => {
    return (
        <div className="flex-row flex-center">
            <span className="margin-left-16">{areaPath}</span>
            <span className="margin-left-16">{workItem.fields['System.AreaLevel1']}</span>
        </div>
    );
}
