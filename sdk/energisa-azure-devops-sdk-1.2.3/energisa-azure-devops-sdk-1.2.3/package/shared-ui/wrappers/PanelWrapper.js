import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from 'azure-devops-ui/Button';
import { ButtonGroup } from 'azure-devops-ui/ButtonGroup';
import * as cx from 'classnames';
import { VersionDisplay } from '../component/VersionDisplay';
export const PanelWrapper = ({ children, cancelButton, okButton, showVersion = true, moduleVersion, showExtensionVersion, rootClassName, contentClassName }) => {
    return (_jsxs("div", Object.assign({ className: cx('flex-column flex-grow', rootClassName) }, { children: [_jsx("div", Object.assign({ className: cx('flex-grow', contentClassName) }, { children: children })), _jsxs(ButtonGroup, Object.assign({ className: "justify-space-between flex-center margin-bottom-16" }, { children: [cancelButton && _jsx(Button, Object.assign({}, cancelButton)), showVersion && (_jsx(VersionDisplay, { showExtensionVersion: showExtensionVersion, moduleVersion: moduleVersion })), okButton && _jsx(Button, Object.assign({}, okButton))] }))] })));
};
