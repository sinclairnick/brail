import { createTemplate } from '@brail/core';
import { Column, EmailTemplate, Row, Typography } from '@brail/react';
import { Footer } from 'apps/example/components/footer';
import { ReusableHeader } from 'apps/example/components/reusable-header';
import { Signature } from 'apps/example/components/signature';
import { IsString } from 'class-validator';

// Props class for type-safe API generation
class WelcomeTemplateProps {
  @IsString()
  firstName: string;
}

// Create the template view
const WelcomeTemplateView = (props: WelcomeTemplateProps) => {
  const { firstName } = props;

  return (
    <EmailTemplate title={`Welcome ${firstName}!`}>
      <ReusableHeader />

      <Row paddingTop={16} paddingBottom={16}>
        <Column>
          <Typography variant="h1">Welcome to Brail, {firstName}!</Typography>
          <Typography variant="body1">Check out our features</Typography>
        </Column>
      </Row>

      {['Feature 1', 'Feature 2', 'Feature 3'].map((x) => {
        return (
          <Row key={x}>
            <Column>
              <Typography variant="h2" align="center">
                {x}...
              </Typography>
            </Column>
          </Row>
        );
      })}

      <Signature />
      <Footer />
    </EmailTemplate>
  );
};

// Generate the template + metadata
const WelcomeTemplate = createTemplate({
  name: 'Welcome',
  path: '/welcome',
  template: WelcomeTemplateView,
  preview: () => ({ firstName: 'Steve' }),
  meta: (props) => ({ subject: `Welcome, ${props.firstName}!` }),
  propType: WelcomeTemplateProps,
});

export default WelcomeTemplate;
