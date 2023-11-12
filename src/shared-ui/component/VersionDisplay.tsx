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
export const VersionDisplay = ({
  showExtensionVersion = false,
  moduleVersion
}: VersionDisplayProps): JSX.Element => {
  return (
    <div className="rhythm-horizontal-4">
      {showExtensionVersion && (
        <>
          <span>Extension Version:</span>
          <span className="font-weight-semibold">{process.env.EXTENSION_VERSION}</span>
          <span> | </span>
        </>
      )}
      <span>Module Version:</span>
      <span className="font-weight-semibold">{moduleVersion}</span>
    </div>
  );
};
