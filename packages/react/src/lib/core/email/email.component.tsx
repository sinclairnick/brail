import React, { PropsWithChildren } from 'React';
import { EmailContextType, EmailProvider } from './email.context';

export type EmailProps = PropsWithChildren<{
  containerWidth?: number;
}>;

export const Email = (props: EmailProps) => {
  const { containerWidth = 600, children } = props;

  return (
    <EmailProvider value={{ boxWidth: containerWidth }}>
      {children}
    </EmailProvider>
  );
};
