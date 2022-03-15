![Brail](./static/brail.png)

# Brail

> Transactional email that feels different

[![License][license-image]][license-url]
![Stars][stars-image]
![React][react-badge]
![Core][core-badge]
![Mjml][mjml-badge]

Brail is a framework built on NextJS for developing email templates in React, and returning HTML that is compatible with major email clients. It aims to seperate the concerns of generating the emails and delivering them.

In a few lines of code, Brail lets you turn a nextjs app into an email templating server.

> 💌 Preview emails

> 📤 Regular deploying to vercel, netlify etc.

> 📫 JSX templating

> 📦 Leaves email delivery up to you

### Brail is currently in Alpha, and may recieve breaking changes

<br/>

## Installation

```sh
# npm i / yarn add / pnpm add
@brail/core @brail/react @brail/mjml
```

## Usage example

`pages/product-template.tsx:`

```tsx
// (Optionally) define props
export type ProductsTemplateProps = {
  products: Array<{ name: string; price: string }>;
};

// Create template component
const ProductsTemplate = (props: ProductsTemplateProps) => {
  return (
    <EmailTemplate>
      <MyHeader />
      <Container paddingTop={100} color={theme.red}>
        {props.products.map((p) => {
          return (
            <Row>
              <Column>
                <Text variant="h3">{p.name}</Text>
              </Column>
            </Row>
          );
        })}
      </Container>
      <MyFooter />
    </EmailTemplate>
  );
};

// Create template and defined meta
const ProductsTemplate = createTemplate(NotificationEmailTemplate, {
  name: 'notification',
  generateMeta: (props) => ({
    subject: `${props.products.length} new products!`,
  }),
  previewData: {
    products: [
      { name: 'iPhone 4' },
      { name: 'iPhone 8' },
      { name: 'iPhone 16' },
    ],
  },
});

export default ProductsTemplate;
```

`pages/api/[...email].ts:`

```ts
import { createServer } from '@brail/core/server';
// Register template
export default createServer([ProductsTemplate]);
```

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
