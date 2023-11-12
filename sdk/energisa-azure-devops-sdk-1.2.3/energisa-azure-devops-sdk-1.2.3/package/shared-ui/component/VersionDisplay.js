import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Displays the version of the module and optionally the extension.
 * @param showExtensionVersion - Whether to display the extension version or not.
 * @param moduleVersion - The version of the module to display.
 * @returns A JSX element that displays the version information.
 * @Energisa environment needs to set true when make big changes to work with the new version
 */
export const VersionDisplay = ({ showExtensionVersion = false, moduleVersion }) => {
    return (_jsxs("div", Object.assign({ className: "rhythm-horizontal-4" }, { children: [showExtensionVersion && (_jsxs(_Fragment, { children: [_jsx("span", { children: "Extension Version:" }), _jsx("span", Object.assign({ className: "font-weight-semibold" }, { children: process.env.EXTENSION_VERSION })), _jsx("span", { children: " | " })] })), _jsx("span", { children: "Module Version:" }), _jsx("span", Object.assign({ className: "font-weight-semibold" }, { children: moduleVersion }))] })));
};
