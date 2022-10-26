# Email Previews

Once we've designed a template, we must expose it to NextJS so it can be previewed.

```tsx title="index.template.tsx"
const Template = createTemplate({
  /** ... */
});

// Expose to Next
export default Template;
```

We can then start the NextJS server, by running `next dev` or `npm run dev`.

> Ensure the NextJS config `pageExtensions` field contains any custom extends you may be using

## Enhancing the Preview

The [`@brail/web`](https://github.com/sinclairnick/brail/tree/main/packages/web) package provides utilites for improving the web interface of Brail.

To add a layout to all email previews, we can use the `BrailLayout` component in the next `_app`.

```tsx title="_app.template.tsx"
const App = (props) => {
	const { Component, pageProps } = props

	return <BrailLayout template={Component}>
		<Component {...pageProps}>
	</BrailLayout>
}
```

Now our templates will look something like:

![Brail Layout](/img/brail-layout-ui.png)
