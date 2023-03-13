![Brail](./static/banner.jpg)

<div align="center">
  <a href="https://www.npmjs.com/package/brail"><img src="https://img.shields.io/npm/v/brail" /></a>
  <a href="https://github.com/sinclairnick/brail/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-Apache%202-blue" /></a>
  <br />
  <br />
  <h1>Brail</h1>
  <a href="https://brail.dev/docs/quick-start">Quickstart</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://brail.dev">Docs</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/sinclairnick/brail/tree/main/examples">Examples</a>
  <br />
  <br />
</div>

Brail provides batteries-included tooling for creating, generating and delivering HTML emails. With out-of-the-box email template correctness, ergonomic React templating and full-stack type-safety, never send an erroneous transactional (or marketing) email again.

## What is Brail?

Brail consists of several tools which aid crafting and delivering emails, across the full-stack:

- [**React Library**](https://www.brail.dev/docs/crafting): Responsive email component library. Compiles to email-compatible HTML
- [**Brail Core**](https://www.brail.dev/docs/using/trpc): Tools for serving emails via type-safe APIs or SDKs
- [**Devtools**](https://www.brail.dev/docs/crafting/devtools): Make email development, debugging and testing easier
- [**Linting**](https://www.brail.dev/docs/crafting/linting): Identify and fix common HTML email pitfalls

## Features

Brail comes packed with many helpful features including:

- 🌈 Theming out-of-the-box
- 📱 Automatic mobile-responsiveness
- 💻 Devtools and live-previews
- ⚠️ Linting
- 🧢 First-class tRPC, Zod integrations
- 🔒 End-to-end type-safety

## Getting started

To get started with Brail, check out the [**Quickstart**](https://www.brail.dev/docs/quick-start) guide.

Alternatively, you can [**check out the Docs**](https://www.brail.dev), try Brail out in a codesandbox or use one of the [**Brail starter projects**](https://github.com/sinclairnick/brail/tree/main/starters):

<br/>

---

<br/>

## Why would I want to use Brail?

Handwriting emails using HTML is notoriously a pain. Unlike the web, email clients don't strongly adhere to a specific standard, resulting in limited and inconsistent support for CSS and HTML features.

Consequently, HTML emails become incredibly verbose, complex and littered with Microsoft Outlook-specific HTML comments, heavily nested `<table>` elements and esoteric CSS properties. As such, handwriting HTML email is an uncommon and tedious artform.

Brail abstracts away that complexity and aims to provide a web-like experience to writing emails, making it trivial to produce correct emails.

<br/>

## Why not use a drag-and-drop editor?

Drag and drop editors make it easy to create email-safe templates, but lack many features we're used to in code-world like theming, abstraction, formatting, maths, version control, PRs and types. By providing a full-proof in-code solution to HTML emails, we regain the control, flexibility and power of code, which makes creating (and refactoring) emails much faster, easier and more fun.
