import { createServer, getBrailApiConfig } from '@brail/core/server';
import WelcomeTemplate from '../welcome/index.template';

// Optional: Provide Nextjs API Route configuration to silence unneeded warnings
export const config = getBrailApiConfig();

// Register the email templates, so they can be served via Next API
const server = createServer([WelcomeTemplate]);

export default server;
