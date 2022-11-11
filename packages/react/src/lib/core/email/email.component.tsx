import React, { PropsWithChildren } from 'React';
import { ParentProvider } from '../parent-provider/parent-provider.component';

export type EmailProps = PropsWithChildren<{
  containerWidth?: number;
}>;

export const Email = (props: EmailProps) => {
  const { containerWidth = 600, children } = props;

  return (
    <body {...{ width: '100%' }} style={{ margin: '0 auto' }}>
      <ParentProvider width={containerWidth}>{children}</ParentProvider>
    </body>
  );
};
