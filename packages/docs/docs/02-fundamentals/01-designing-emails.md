# Designing Emails

Email template designs are implemented using React. Brail leans on [MJML](https://mjml.io/) to make creating responsive and email-safe designs more easily.

The [`@brail/mjml`](https://github.com/sinclairnick/brail/tree/main/packages/mjml) package contains React bindings for the core MJML components. These allow us to create layouts and styles in a way that is compatible with all major email clients, without needing to worry about complex and fragile HTML. Consequently the result is much more concise and robust.

For higher-level components, you can also check out the [`@brail/react`](https://github.com/sinclairnick/brail/tree/main/packages/react) package.

> `@brail/react` is built on top of the `@brail/mjml` package, and they can be used alongside one another.

#### A word on creating emails:

> 🚨 _Email design is inherently much more limited than website/app design and some layouts are simply not possible, while ensuring compatibility._

## MJML basics

For the full breakdown on MJML, visit the official [MJML documentation](https://documentation.mjml.io/). However, to get up and running quickly, we will cover a basic overview of how to write emails using MJML-like syntax.

### Email templates

To start an email, we must wrap it in the root `mjml` tag.

```tsx
import { MJ } from "@brail/mjml"

const Template = () => {
	return <Mj.MjMl>
		{/** Content here */}
	</Mj.Mjml>
}
```

Emails are just HTML and MJML operates similarly. We can specify the email design in the `body` and any metadata in the `head`.

```tsx
<Mj.Mjml>
  <Mj.Head>
    // Specify the document title (this is not the subject line)
    <Mj.Title>{title}</Mj.Title>
    // Set the preview text, found below the subject line in email clients
    <Mj.Preview>{preview}</Mj.Preview>
  </Mj.Head>
  <Mj.Body backgroundColor={theme.palette.grey[100]} width={600}>
    {/** Content here */}
  </Mj.Body>
</Mj.Mjml>
```

### Email content

Once the "frame" has been set up, we can start to code our actual content, using variables, looping and theming like any other React project.

```tsx
// ...
<Mj.Section>
  <Mj.Column>
    <Mj.Text>Hello {firstName}!</Mj.Text>
  </Mj.Column>
</Mj.Section>
// ...
```

Because email clients largely rely on _inline_ styling, as opposed to global CSS styles, we apply styles through props on these components. Only a subset of CSS properties are exposed to ensure that email-compatibility. We can choose to deviate outside these guidelines, but the more we do so, the more likely email appearance or behaviour will differ across email clients.

```tsx
<Mj.Head>
  // Setting arbitrary CSS (at your own risk)
  <Mj.Style>
    {`
	a {
		color: ${theme.typography.a.color};
		}
	`}
  </Mj.Style>
  // Setting component properties (safe)
  <Mj.Text paddingTop={16}>Hello World!</Mj.Text>
</Mj.Head>
```

### Components and abstraction

As usual, we can abstract frequently used patterns into components to follow DRY principles, and propagate changes across many templates trivially.

```tsx title="header.tsx"
const Header = () => <Mj.Text>My Brand Here</Mj.Text>;
```

```tsx
<Mj.Section>
	<Mj.Column>
		<Header>
	</Mj.Column>
</Mj.Section>
```

## Component library

The `@brail/mjml` API can be verbose and repetitive at times, which is where the `@brail/react` library steps in. While the `mjml` library intends to be a faithful implementation of the original MJML spec, the `react` library is more opinionated, but more concise and ergonomic. It was designed to provide a developer experience more similar to the likes of [`Material UI`](https://mui.com/core/) or [`Chakra UI`](https://chakra-ui.com/).

> Most people will prefer using the higher level `react` library than the lower-level `mjml` library alone.

A minimal example looks like:

```tsx
import { EmailTemplate, Row, Column, Typography } from '@brail/react';

<EmailTemplate title="..." preview="...">
  <Row>
    <Column>
      <Typography variant="h2">Hello world!</Typography>
    </Column>
  </Row>
</EmailTemplate>;
```

Currently, this library is fairly minimal, but more components/functionality will be added gradually.

## Tips and Gotchas

Brail utilises MJML to improve the developer experience, compared to hand-written HTML. However, the nature of email HTML and MJML means the developer experience is not perfectly 1:1 to regular React apps. Below we will cover a few differences that those familiar with React may get caught off guard with, when using Brail and/or MJML.

> The MJML content is validated so you can examine any errors with your components easily. Errors are displayed in API responses and using the Brail Web Layout

### Nesting

MJML doesn't like too much nesting. Nesting items in themselves is generally not allowed, meaning there is an effective limit on how nested your email markup will be.

Below is the maximum amount of nesting possible using MJML.

```tsx title="Using @brail/mjml"
<Mj.MjMl>
  <Mj.Body>
    <Mj.Wrapper>
      <Mj.Section>
        <Mj.Column>
          <Mj.Text>
            <a href="/">Link to somewhere</a>
          </Mj.Text>
        </Mj.Column>
      </Mj.Section>
    </Mj.Wrapper>
  </Mj.Body>
</Mj.MjMl>
```

```tsx title="Using @brail/react"
<EmailTemplate>
  <Container>
    <Row>
      <Column>
        <Typography>
          <a href="/">Link to somewhere</a>
        </Typography>
      </Column>
    </Row>
  </Container>
</EmailTemplate>
```

### Vertical alignment

In MJML vertical alignment of a `<Column>` or `<Mj.Section>` (they are equivalent) depends on the sibling components. As such, to vertically align items, make sure the neighbouring elements are also vertically aligned.

```tsx
<Row>
  <Column verticalAlign="middle">
    <Typography>Hello</Typography>
  </Column>
  <Column verticalAlign="middle">
    <Typography>Hello</Typography>
  </Column>
  <Column verticalAlign="middle">
    <Typography>Hello</Typography>
  </Column>
</Row>
```

### Raw HTML

We can add raw HTML by using the `<Mj.Raw>` tag. Typically MJML omits unsupported HTML from documents, but this tag prevents that and leaves HTML as is. Through using this tag we can completely escape HTML and "off-road" using hand-written HTML templates if we wish to do so.

```tsx
<Mj.Raw>
  <div>Any arbitrary HTML goes here.</div>
  <marquee>This probably isn't supported...</marquee>
  <code>...but we can still try anyway</code>
</Mj.Raw>
```
