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
  <a href="https://github.com/brail/apps/examples">Examples</a>
  <br />
  <br />
</div>

Brail provides batteries-included tooling for creating, generating and delivering HTML emails. With out-of-the-box email template correctness, ergonomic React templating and full-stack type-safety, never send an erroneous transactional (or marketing) email again.

## What is Brail?

Brail consists of several tools which aid crafting and delivering emails:

- [**UI Library**](): Responsive email-safe React component library
- [**Brail Core**](): Tools for creating type-safe APIs or SDKs
- [**Devtools**](): Tools for making developing, debugging and testing emails easier
- [**Linting**](): ESLint plugin warnings for common email-specific HTML pitfalls

## Getting started

To get started with Brail, check out the [**Quickstart**]() guide.

Alternatively, you can [**check out the Docs**](), try Brail out in a codesandbox or use one of the [**Brail starter projects**]():

- [Brail + Nextjs]()
- [Brail + Turborepo + Nextjs]()

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
