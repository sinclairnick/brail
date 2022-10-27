## Brail is built on the following technologies

### MJML

MalJet Markup Language ([MJML](https://github.com/mjmlio/mjml)) was open-sourced by email service provider [MailJet](https://github.com/mailjet) years ago, but still isn't mainstream, largely because it only solves half the picture. MJML provides an HTML-like syntax which compiles to email-compatible HTML. This means hand-writing emails becomes feasible again, but templating itself was never a first-class citizen and issues like having to seperately host images, prevented it from becoming an obvious first-choice.

### NextJS and Vercel

[NextJS](https://github.com/vercel/next.js/) dominates the frontend world these days, and is the foremost React framework. One of its features is called "API routes" which allows us to expose an API that can be called. Moreover, platforms like Vercel, the creators of NextJS, trivially enable automatic image hosting. This means we can host a website, expose an API and host images, all for free, by pushing to Github. This alone ticks of a handful of the above criteria for an email development environment.

### OpenAPI

By providing OpenAPI defin
