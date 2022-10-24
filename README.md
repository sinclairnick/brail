![Brail](./static/cover.jpg)

# Brail

> Transactional email that feels different

[![License][license-image]][license-url]
![Stars][stars-image]
![React][react-badge]
![Core][core-badge]
![Mjml][mjml-badge]
![Web][web-badge]

Brail is a framework built on NextJS for developing email templates in React, and returning HTML that is compatible with major email clients. It aims to seperate the concerns of generating the emails and delivering them.

In a few lines of code, Brail lets you turn a nextjs app into an email templating server.

> 📧 Preview templates in your browser

> 📤 Trigger deployments via Git (via Vercel, Netlify etc.)

> 🔑 Familiar templating in JSX or TSX

> 📬 Agnostic to email delivery provider

> 🧰 Enjoy theming, version control, reusable components and no vendor lock-in

<br/>

## Installation

```sh
npm install @brail/core

# Optional helper packages
npm install @brail/react @brail/mjml @brail/web
```

## Usage example

`pages/welcome.tsx:`

```tsx
// (Optionally) define props
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

`pages/api/[...email].ts:`

```ts
import { createServer } from '@brail/core/server';

// Register template so it can be generated via API
export default createServer([WelcomeTemplate]);
```

Then consume the emails via API, dynamically generating transactional content

```sh
curl -X POST --data '{ "firstName": "Steve" }' <host>/api/welcome
```

To view a full example, visit the `apps/example` directory.

## Motivation

Brail was created so I never have to use a drag-and-drop editor again. It puts emails back into the "coding ecosystem" where theming, composition and dynamically generating content are standard. Version control? Git. Consistent theming and composition? React components. Vendor lock in? No thanks.

With brail, my emails are portable, consistent, easy and more fun to make.

## Packages

## `@brail/core`

Contains the underlying framework for creating and serving templates

## `@brail/react`

Contains components which simplifies email markup, built on top of the MailJet Markup Language (MJML).

## `@brail/mjml`

A fork of MJML providing browser compatibility, type safety and React bindings.

## `@brail/web`

Web components intended to improve the developer experience

## Author

Nick Sinclair

Distributed under the MIT license. See `LICENSE` for more information.

[https://github.com/sinclairnick](https://github.com/sinclairnick)

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@brail/core
[license-image]: https://img.shields.io/github/license/sinclairnick/brail
[license-url]: /LICENSE
[stars-image]: https://img.shields.io/github/stars/sinclairnick/brail
[core-badge]: https://img.shields.io/npm/v/@brail/core?label=@brail/core
[react-badge]: https://img.shields.io/npm/v/@brail/react?label=@brail/react
[mjml-badge]: https://img.shields.io/npm/v/@brail/mjml?label=@brail/mjml
[web-badge]: https://img.shields.io/npm/v/@brail/mjml?label=@brail/web
