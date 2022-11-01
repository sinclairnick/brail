import { createTemplate } from '@brail/core';
import {
  Column,
  Container,
  EmailTemplate,
  Row,
  Typography,
} from '@brail/react';
import { Header } from '../../components/header';
import { WelcomeTemplateProps } from './welcome.types';

const ThingsToDo = [
  { name: 'Check out the Docs', href: 'https://brail.vercel.app' },
  { name: 'View on GitHub', href: 'https://github.com/sinclairnick/brail' },
];

export const WelcomeTemplate = createTemplate<WelcomeTemplateProps>({
  meta: (props) => ({
    subject: `Welcome, ${props.name}`,
  }),
  path: 'welcome',
  preview: () => ({
    name: 'Friend',
  }),
  propType: WelcomeTemplateProps,
  template: (props) => {
    return (
      <EmailTemplate title="Welcome">
        <Header />
        <Container backgroundColor="white">
          <Row paddingTop={16} paddingBottom={16}>
            <Column>
              <Typography variant="h3">
                Welcome to Brail, {props.name}
              </Typography>
              <Typography variant="body1">
                Brail makes email templating easier. Get started:
              </Typography>
            </Column>
          </Row>
          <Row paddingTop={16} paddingBottom={16}>
            <Column>
              {ThingsToDo.map((thing) => (
                <Typography key={thing.name}>
                  <a target="_blank" href={thing.href} rel="noreferrer">
                    {thing.name} &rarr;
                  </a>
                </Typography>
              ))}
            </Column>
          </Row>
          <Row>
            <Column>
              <Typography>
                Or generate a dynamic email via:{' '}
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {`curl -X POST \\`}
                  <br />
                  {`	-H "Content-Type: application/json" \\`}
                  <br />
                  {`	-d '{"name": "Mate"}' \\`}
                  <br />
                  {`	http://localhost:4444/api/templates/welcome`}
                </pre>
              </Typography>
            </Column>
          </Row>
        </Container>
      </EmailTemplate>
    );
  },
});

export default WelcomeTemplate;
