import { createServer, collectExportedHandlers } from '@brail/core/server';
import { NotificationTemplate } from '../notification/index.template';

const server = createServer([NotificationTemplate]);

collectExportedHandlers();

export default server;
