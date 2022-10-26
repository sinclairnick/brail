import { createTemplate } from '@brail/core';
import {
  Button,
  Column,
  Container,
  EmailTemplate,
  Row,
  Typography,
} from '@brail/react';
import { Footer } from 'apps/example/components/footer';
import { ReusableHeader } from 'apps/example/components/reusable-header';
import { Signature } from 'apps/example/components/signature';
import { Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';

class Pet {
  @IsString()
  name: string;
  @IsInt()
  age: number;
}

// Props class for type-safe API generation
class WelcomeTemplateProps {
  @IsString()
  firstName: string;
  @ValidateNested()
  @Type(() => Pet)
  pet: Pet;
}

// Create the template view
const WelcomeTemplateView = (props: WelcomeTemplateProps) => {
  const { firstName } = props;

  return (
    <EmailTemplate title={`Welcome ${firstName}!`}>
      <ReusableHeader />

      <Container backgroundColor="white">
        <Row paddingTop={16} paddingBottom={16}>
          <Column>
            <Typography variant="h1">Welcome to Brail, {firstName}!</Typography>
            <Typography variant="body1">Check out our features</Typography>
          </Column>
        </Row>

        <Row paddingTop={16} paddingBottom={16}>
          {['Feature 1', 'Feature 2', 'Feature 3'].map((x) => {
            return (
              <Column key={x}>
                <Typography variant="h2" align="center">
                  {x}...
                </Typography>
              </Column>
            );
          })}
        </Row>

        <Row paddingTop={16} paddingBottom={16}>
          <Column>
            <Button>Where do I sign up?</Button>
          </Column>
        </Row>

        <Signature />
      </Container>

      <Footer />
    </EmailTemplate>
  );
};

// Generate the template + metadata
const WelcomeTemplate = createTemplate({
  name: 'Welcome',
  path: '/welcome',
  template: WelcomeTemplateView,
  preview: () => ({ firstName: 'Steve', pet: { age: 2, name: 'Spot' } }),
  meta: (props) => ({ subject: `Welcome, ${props.firstName}!` }),
  propType: WelcomeTemplateProps,
});

export default WelcomeTemplate;
