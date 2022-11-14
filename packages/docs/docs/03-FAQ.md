# FAQs

## Doesn't this slow down sending emails?

Not really. Templating is pretty fast and the time for an email to appear in your inbox is largely due to factors like email delivery, and any modifications/validation email delivery services perform.

Platforms like Vercel do cause cold-start delays, like any serverless platform. So the first email that's been sent in a while can take a few seconds. However, any subsequent requests take less than 100ms, which is well within the margin of error for email delivery time! To avoid cold-start delays, you can deploy to a dedicated server instead of Vercel.

> 🔔 Make sure your serverless functions run close to wherever your client is calling it. See: [vercel function region settings](https://vercel.com/docs/concepts/functions/serverless-functions/regions)
