import { createServer, getBrailApiConfig } from '@brail/core/server';
import EmptyTemplate from '../empty/index.template';
import NestedWelcomeTemplate from '../nested/welcome/index.template';
import NoPropsTemplate from '../no-props/index.template';
import WelcomeTemplate from '../welcome/index.template';

// Optional: Provide Nextjs API Route configuration to silence unneeded warnings
// export const config = {
//   api: { externalResolver: true },
//   runtime: 'experimental-edge',
// };

// Register the email templates, so they can be served via Next API
const server = createServer([
  WelcomeTemplate,
  NestedWelcomeTemplate,
  EmptyTemplate,
  NoPropsTemplate,
]);

export default server;
