import { createServer } from '@brail/core/server';
import { NextApiRequest } from 'next';
import EmptyTemplate from '../empty/index.template';
import NestedWelcomeTemplate from '../nested/welcome/index.template';
import NoPropsTemplate from '../no-props/index.template';
import WelcomeTemplate from '../welcome/index.template';

const mailApiKey = process.env.MAIL_API_KEY as string;
const mailApi = process.env.MAIL_API as string;
const authSecret = process.env.AUTH_SECRET as string;

const authenticate = async (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== authSecret) {
    throw new Error('Unauthorised');
  }
};

// Register the email templates, so they can be served via Next API
const server = createServer(
  [WelcomeTemplate, NestedWelcomeTemplate, EmptyTemplate, NoPropsTemplate],
  {
    onSend: async (args, req) => {
      const { html, ...rest } = args;
      await authenticate(req);

      console.log('Sending email...', rest);

      // Send email somehow
      await fetch(mailApi, {
        method: 'POST',
        body: JSON.stringify(args),
        headers: {
          Authorization: `Bearer ${mailApiKey}`,
        },
      });
    },
  }
);

export default server;
