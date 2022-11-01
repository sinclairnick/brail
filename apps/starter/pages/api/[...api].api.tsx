import { createServer, getBrailApiConfig } from '@brail/core/server';
import WelcomeTemplate from '../welcome/index.template';

export const config = getBrailApiConfig();

const server = createServer([WelcomeTemplate]);

export default server;
