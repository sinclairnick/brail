import { FC } from 'react';
import { Container, ContainerProps } from '../container/container';
import {
  Mjml,
  MjmlBody,
  MjmlHead,
  MjmlPreview,
  MjmlStyle,
  MjmlTitle,
} from '../../../../core/src/lib/mjml';
import { theme } from '../theme/theme';
import { MjmlType } from '../types';

export type EmailLayoutProps = {
  title?: string;
  preview?: string;
  bodyProps?: MjmlType<MjmlBody>;
  containerProps?: ContainerProps;
};

export const EmailTemplate: FC<EmailLayoutProps> = (props) => {
  const { title, preview, children } = props;

  return (
    <Mjml>
      <MjmlHead>
        <MjmlTitle>{title}</MjmlTitle>
        <MjmlPreview>{preview}</MjmlPreview>
        <MjmlStyle>{`
			a {
				color: ${theme.typography.a.color};
			}
		`}</MjmlStyle>
      </MjmlHead>
      <MjmlBody backgroundColor={theme.palette.grey[100]} width={700}>
        <Container backgroundColor={'hsl(168, 100%, 99.4%)'}>
          {children}
        </Container>
      </MjmlBody>
    </Mjml>
  );
};
