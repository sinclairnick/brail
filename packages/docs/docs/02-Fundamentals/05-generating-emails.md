# Generating Emails

To actually generate an email, any email templates wished to be exposed via API must be "registered" with the brail server.

We must first export a template, which contains all the data about the specific email template.

```tsx title="index.template.tsx"
export const WelcomeTemplate = createServer({
  template: WelcomeTemplateView, // The React component for our template
  path: '/welcome', // Determines the api route for this template (-> /api/templates/welcome)
  preview: () => ({
    /** Specify any preview props here */
  }),

  // Optionally specify the below
  name: 'Welcome 2021', // A custom display name
  propType: WelcomeTemplateProps, // Requires using class-based prop type. Use for OpenAPI compatibility
  meta: (props) => ({
    /** Generate dynamic e.g. subject lines here */
  }),
});

export default WelcomeTemplate;
```

```tsx title="api/[...path].ts"
// Optionally add this line to silence a NextJS error
// See: https://nextjs.org/docs/api-routes/request-helpers#custom-config
export const config = getBrailAPIConfig();

const server = createServer([WelcomeTemplate]);

export default server;
```

Now we are able to generate our templates, from `/api/templates/*`

```sh
# E.g. NextJS Dev with default settings
curl -X POST --data '{ "firstName": "Steve" }' http://localhost:3000/api/templates/welcome
```

Since we're usually generating emails from within a backend codebase, we can also generate typed API clients, using OpenAPI ([Docs](/docs/Fundamentals/openapi)).
