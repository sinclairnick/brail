# Usage

To generate emails with Brail we must:

1. Create an email template, using React
2. Register the template for use in NextJS API routes
3. Call the API endpoint, with any dynamic data

We can also generate a type-safe API, using an OpenAPI generator.

Below is an example of how one might use Brail in practice.

```tsx title="welcome/index.template.tsx"
// Define props
class WelcomeTemplateProps {
  @IsString()
  firstName: string;
}

// Create a template view
const WelcomeTemplateView = (props: WelcomeTemplateProps) => {
  const { firstName } = props;

  return (
    <EmailTemplate title={`Welcome ${firstName}!`}>
      <ReusableHeader />

      <Row paddingTop={16} paddingBottom={16}>
        <Column>
          <Typography variant="h1">Welcome to Brail, {firstName}!</Typography>
        </Column>
      </Row>

      {['Feature 1', 'Feature 2', 'Feature 3'].map((x) => {
        return <Row key={x}>{/** ... */}</Row>;
      })}

      <Signature />
      <Footer />
    </EmailTemplate>
  );
};

// Create and export the template
const WelcomeTemplate = createTemplate({
  name: 'Welcome',
  path: '/welcome',
  template: WelcomeTemplateView,
  // Defines the data used when previewing the template in the browser
  preview: () => ({ firstName: 'Steve' }),
  // Specify how email meta should be generated
  meta: (props) => ({ subject: `Welcome, ${props.firstName}!` }),
  propType: WelcomeTemplateProps,
});

export default WelcomeTemplate;
```

```tsx title="api/[...path].tsx"
export const config = getBrailApiConfig();

// Register the email templates, so they can be served via Next API
const server = createServer([WelcomeTemplate]);

export default server;
```

```sh
# E.g. generating a typescript client
npm install openapi-typescript-codegen --save-dev &&
npx openapi -i http://localhost:4444/api/openapi.json -o out
```
