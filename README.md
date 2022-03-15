![Brail](./static/brail.png)

# Brail

> Transactional email that feels different

[![NPM Version][npm-image]][npm-url]

Brail is a framework built on NextJS for developing email templates in React, and returning HTML that is compatible with major email clients. It aims to seperate the concerns of generating the emails and delivering them.

## Installation

```sh
# npm i / yarn add / pnpm add
@brail/core @brail/react @brail/mjml
```

## Packages

## `@brail/core`

Contains the underlying framework for creating and serving templates

## `@brail/react`

Contains components which simplifies email markup, built on top of the MailJet Markup Language (MJML).

## `@brail/mjml`

A fork of MJML providing browser compatibility, type safety and React bindings.

## Usage example

```tsx
export type ProductsTemplateProps = {
  products: Array<{ name: string; price: string }>;
};

const ReusableHeader = () => {
  return (
    <Row>
      <Column>
        <Text>Used apple products!</Text>
      </Column>
    </Row>
  );
};

const ProductsTemplate = (props: ProductsTemplateProps) => {
  return (
    <>
      <EmailTemplate
        title="New products"
        preview={`${props.products.length} products`}
      >
        <ReusableHeader />

        <Container paddingTop={100} color={theme.red}>
          {props.products.map((p) => {
            return (
              <Row>
                <ColumnGroup>
                  <Column>
                    <Text variant="h3">{p.name}</Text>
                  </Column>
                  <Column>
                    <Text>{p.price}</Text>
                  </Column>
                </ColumnGroup>
              </Row>
            );
          })}
        </Container>
      </EmailTemplate>
    </>
  );
};

export const template = createTemplate(NotificationEmailTemplate, {
  name: 'notification',
  previewData: {
    products: [
      { name: 'iPhone 4', price: '$100' },
      { name: 'iPhone 8', price: '$1,000' },
      { name: 'iPhone 16', price: '$10,000' },
    ],
  },
});

export const getStaticProps = template.getStaticProps;
```

## Author

Nick Sinclair

Distributed under the MIT license. See `LICENSE` for more information.

[https://github.com/sinclairnick](https://github.com/sinclairnick)

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
