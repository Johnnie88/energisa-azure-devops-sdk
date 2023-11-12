import { jsx as _jsx } from "react/jsx-runtime";
import { ConditionalChildren } from 'azure-devops-ui/ConditionalChildren';
import { Spinner, SpinnerOrientation, SpinnerSize } from 'azure-devops-ui/Spinner';
export const LoadingSection = ({ isLoading, text }) => {
    return (_jsx(ConditionalChildren, Object.assign({ renderChildren: isLoading }, { children: _jsx(Spinner, { size: SpinnerSize.large, label: text, orientation: SpinnerOrientation.column }) })));
};
