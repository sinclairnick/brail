import * as React from 'react';
import { Mj } from '@brail/mjml';
import { FC } from 'react';
import { theme } from '../../theme/theme';
import { ContainerProps } from '../container/container';

export type EmailTemplateProps = {
  title?: string;
  preview?: string;
  bodyProps?: Mj.BodyProps;
};

export const EmailTemplate: FC<EmailTemplateProps> = (props) => {
  const { title, preview, children, bodyProps = {} } = props;

  return (
    <Mj.Mjml>
      <Mj.Head>
        <Mj.Title>{title}</Mj.Title>
        <Mj.Preview>{preview}</Mj.Preview>
        <Mj.Style>{`
			a {
				color: ${theme.typography.a.color};
			}
		`}</Mj.Style>
      </Mj.Head>
      <Mj.Body
        backgroundColor={theme.palette.grey[100]}
        width={600}
        {...bodyProps}
      >
        {children}
      </Mj.Body>
    </Mj.Mjml>
  );
};
