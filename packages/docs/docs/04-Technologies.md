## Brail is built on the following technologies

### MJML

MalJet Markup Language ([MJML](https://github.com/mjmlio/mjml)) was open-sourced by email service provider [MailJet](https://github.com/mailjet) years ago, but still isn't mainstream, largely because it only solves half the picture. MJML provides an HTML-like syntax which compiles to email-compatible HTML. This means hand-writing emails becomes feasible again, but templating itself was never a first-class citizen and issues like having to seperately host images, prevented it from becoming an obvious first-choice. Using MJML, it's unclear how one should actually go about using it in production, and any solutions to this are cumbersome.

### NextJS and Vercel

[NextJS](https://github.com/vercel/next.js/) dominates the frontend world these days, and is the foremost React framework. One of its features is called "API routes" which allows us to expose an API that can be called. Moreover, platforms like Vercel, the creators of NextJS, trivially enable automatic image hosting. This means we can host a website, expose an API and host images, all for free, by pushing to Github.

### OpenAPI

The OpenAPI spec provides a generic definition for APIs regardless of their language. Conesequently, there is a large ecosystem of tooling transforming API definitions to and from clients or APIs, supporting many different languages. By Brail automatically providing OpenAPI definitions, we can generate emails from templates with type-safety. This means we no longer have to guess which templates require which data.

## The result

Brail is effectively just the bridging of these technologies, resulting in an email templating server that:

- Hosts images
- Generates emails via API
- Is type-safe
- Produces emails compatible with major clients
- Uses familiar syntax like React
