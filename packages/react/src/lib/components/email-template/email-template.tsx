import { Mj } from '@brail/mjml';
import { FC } from 'react';
import { theme } from '../../theme/theme';
import { Container, ContainerProps } from '../container/container';

export type EmailLayoutProps = {
  title?: string;
  preview?: string;
  bodyProps?: Mj.BodyProps;
  containerProps?: ContainerProps;
};

export const EmailTemplate: FC<EmailLayoutProps> = (props) => {
  const { title, preview, children } = props;

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
      <Mj.Body backgroundColor={theme.palette.grey[100]} width={700}>
        <Container backgroundColor={'hsl(168, 100%, 99.4%)'}>
          {children}
        </Container>
      </Mj.Body>
    </Mj.Mjml>
  );
};
