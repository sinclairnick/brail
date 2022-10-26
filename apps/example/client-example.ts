// This file demonstrates how you might use the OpenAPI spec
// to generate your emails in your application

import { ExampleApi, WelcomeTemplateProps } from './out';

const sendEmailToUser = async (...args: any[]) => {};

// This was generated automatically via the `client:generate` npm script
const api = new ExampleApi();

const response = await api.templates.welcome({
  // Dynamic data, fully typed
  requestBody: {
    firstName: 'Bill',
    pet: {
      age: 10,
      name: 'Daisy',
    },
    favColor: WelcomeTemplateProps.favColor.BLUE, // Generated client side

    // Error: ...'fieldDoesNotExist' does not exist in type 'WelcomeTemplateProps'.
    fieldDoesNotExist: true,
  },
});

const { html, meta } = response;

await sendEmailToUser('larry@google.com', meta.subject, html);
