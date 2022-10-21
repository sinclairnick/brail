import { createServer } from '@brail/core/server';
import { NotificationTemplate } from '../notification/index.template';

const server = createServer([NotificationTemplate]);

export default server;
