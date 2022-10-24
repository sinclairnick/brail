---
sidebar_position: 4
---

# Getting Started

### Install Packages

```sh
npm install @brail/core

# Optional
npm install @brail/mjml @brail/react @brail/web
```

### Create a new NextJS App

Brail is built on NextJS. Currently, the quickest way to get up and running is to use [`create-next-app`](https://nextjs.org/docs/api-reference/create-next-app).

```sh
npx create-next-app@latest
```

### Create an email template

```tsx title="pages/<template_name>.tsx"
import { EmailTemplate, Row, Column } from '@brail/react';

class TemplateProps {
  @IsString() // Optionally decorate for type-safe API generation
  field: string;
}

const TemplateView = (props: TemplateProps) => {
  return (
    <EmailTemplate>
      <Row>
        <Column>Hello World!</Column>
      </Row>
    </EmailTemplate>
  );
};

const Template = createTemplate({
  /** ... */
});

export default Template;
```

### Start the NextJS server

Now you can view the templates in your browser.

```sh
npm run dev
```

### Register template with Brail server

This allows you to call the API and dynamically generate emails.

```tsx title="pages/[...path].ts"
export const config = getBrailApiConfig();

const server = createServer([Template]);

export default server;
```

### Generate a dynamic email

```sh
curl -X POST --data '{ "field": "value" }' http://localhost:4444/api/template_name
```

### Add web UI for improved developer experience (optional)

```tsx title="_app.tsx"
import { BrailLayout } from '@brail/web';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <BrailLayout template={Component}>
      <Component />
    </BrailLayout>
  );
}
```
