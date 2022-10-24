---
sidebar_position: 1
---

# Introduction to Brail

### Brail was created to make transactional email less painful.

Whether using a drag-and-drop email editor or hand-writing your own html, creating transactional email templates is hard, error-prone, and a poor developer experience, compared to almost every other part of the tech stack.

### How does Brail solve this?

By seperating email templating (_the "what"_) and email delivery (_the "how"_), we gain much more control and agency over the email stack. Moving templating into the world of React and NextJS we can leverage familiar tools like version control, theming, variables, reusable components and even tests.

#### In a nutshell: Brail lets you author dynamic email templates in React which can be generated via an API.

Built on [NextJS](https://nextjs.org/), Brail includes many features:

> 📧 Preview templates in your browser

> 📤 Trigger deployments via Git (via Vercel, Netlify etc.)

> 🔑 Familiar templating in JSX or TSX

> 📬 Agnostic to email delivery provider

Compared to traditional approaches, the following become trivial:

- Theming
- Version control
- Iteration/looping
- Variable injection
- Type-safe API
- Portable email templates
- Reusable components/layouts

## What about email delivery?

For an email to appear in someones inbox, it needs a **design** and a **delivery method**.

When we pick an Email service provider (ESP) like MailChimp, SendGrid etc. we tend to evaluate their deliverability, automation and templating ability. By teasing apart templating into a standlone, code-first, open-source ecosystem we avoid vendor lock-in, and switching between delivery methods becomes trivial. Brail lets you reclaim ownership of your email stack, while remaining agnostic to which delivery provider you like using.
