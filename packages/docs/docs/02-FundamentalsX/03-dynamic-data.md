# Dynamic Data

Using dynamic data is where traditional drag and drop approaches tend to be the biggest let down. While we can most certainly do it via drag and drop, refactoring becomes dangerous and hard to track. This is where Brail shines.

## Declaring dynamic data

Just like any other React application, our email template components take in some props, and return a JSX component. In this case, our props are our dynamic data and this data should be included in any API calls we subsequently make when we want to generate an email. We can also enforce type-safety via OpenAPI ([Docs](/docs/Fundamentals/openapi)).

We can specify the shape of the props using `type` or `class` syntax.

```tsx title="template.props.ts"
type TemplateProps = {
  firstName: string;
};

// OR, the class-based equivalent
class TemplateProps {
  @IsString()
  firstName: string;
}
```

```tsx title="template.component.tsx"
const TemplateView = (props: TemplateProps) => {
  // ... Do stuff with props
};
```

> The class-based syntax is required if you ultimately wish to generate a type-safe API.

Even though we're used to manipulating props in regular React, by introducing this mechanic to email templates, we can now trivially perform typically annoying tasks like iterating over an array of items, or performing transformations on data, like formatting or localisation.

## Meta and preview data

To colocate all of the relevant email template data, when you're creating an email template, these props are also passed around to other functions.

```tsx title="index.template.ts"
const Template = createTemplate({
  // ...
  meta: (props) => ({
    subject: `Hello, ${props.firstName}!`,
    preview: '...',
  }),
  // ..
  preview: (props) => ({
    firstName: 'Firstname-When-Previewing',
  }),
});
```

This dynamically generated data is returned via the API alongside the HTML template.
