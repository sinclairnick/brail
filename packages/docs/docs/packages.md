---
sidebar_position: 2
---

# Overview of Brail Packages

Brail is a monorepo broken into several packages.

## Required

### [@brail/core](https://github.com/sinclairnick/brail/tree/main/packages/core): The heart of Brail

As the name implies, Brail Core is the core of Brail, which powers functionality like the templating server and API generation.

## Optional

### [@brail/mjml](https://github.com/sinclairnick/brail/tree/main/packages/mjml): Email-safe primitive components

MJML is an HTML-like markup language create by MailJet, intended to make email-safe html code more accessible. Brail MJML is a fork of the now unmaintained [mjml-react](https://github.com/wix-incubator/mjml-react) wrapper for MJML. Brail MJML adds type definitions and browser-compatibility (instead of just node), among other improvements.

### [@brail/react](https://github.com/sinclairnick/brail/tree/main/packages/react): Components built on @brail/mjml

The react package builds on top of Brail MJML, by providing useful abstractions, basic theming capability and will be expanded to include more complex component patterns, as opposed to Brail MJML which is largely primitives, according to the MJML Spec.

### [@brail/web](https://github.com/sinclairnick/brail/tree/main/packages/web): Components and utilities for the brail Web UI

The Brail web package offers utilities and components for improving the web interface of brail.
