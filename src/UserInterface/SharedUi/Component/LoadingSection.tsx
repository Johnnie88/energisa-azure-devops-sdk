import { ConditionalChildren } from 'azure-devops-ui/ConditionalChildren';
import { Spinner, SpinnerOrientation, SpinnerSize } from 'azure-devops-ui/Spinner';
import React = require('react');

export interface LoadingSectionProps {
  isLoading: boolean;
  text: string;
}

export const LoadingSection = ({ isLoading, text }: LoadingSectionProps): React.ReactElement => {
  return (
    <ConditionalChildren renderChildren={isLoading}>
      <Spinner size={SpinnerSize.large} label={text} orientation={SpinnerOrientation.column} />
    </ConditionalChildren>
  );
};
