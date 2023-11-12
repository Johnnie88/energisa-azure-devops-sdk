/// <reference types="react" />
export interface VersionDisplayProps {
    showExtensionVersion?: boolean;
    moduleVersion?: string;
}
/**
 * Displays the version of the module and optionally the extension.
 * @param showExtensionVersion - Whether to display the extension version or not.
 * @param moduleVersion - The version of the module to display.
 * @returns A JSX element that displays the version information.
 * @Energisa environment needs to set true when make big changes to work with the new version
 */
export declare const VersionDisplay: ({ showExtensionVersion, moduleVersion }: VersionDisplayProps) => JSX.Element;
