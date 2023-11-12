import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from 'azure-devops-ui/Button';
import { ButtonGroup } from 'azure-devops-ui/ButtonGroup';
import { Icon } from 'azure-devops-ui/Icon';
export const ExtendedZeroData = ({ buttons, icon, title, description }) => {
    return (_jsxs("div", Object.assign({ className: "flex-column flex-center margin-vertical-16" }, { children: [icon && _jsx(Icon, Object.assign({ className: "custom-zero-data-icon" }, icon)), _jsx("div", Object.assign({ className: "margin-horizontal-16 title-l" }, { children: title })), description && _jsx("div", Object.assign({ className: "margin-top-16" }, { children: description })), _jsx(ButtonGroup, Object.assign({ className: "margin-top-16" }, { children: buttons.map((button, index) => (_jsx(Button, Object.assign({ id: button.id }, button), button.id || `button-${index}`))) }))] })));
};
