import { RegisteredTemplate } from '../templates';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { BrailResponse } from '../util/util.types';

export const ROUTE_REGEX = /^\/api\/templates.*/;

export const createTemplatesHandler = (
  templates: Record<string, RegisteredTemplate>
): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse<BrailResponse>) => {
    const path = req.url;

    if (path == null) {
      res.status(404).end();
      return;
    }

    const template = templates[path];

    if (template == null) {
      res.status(404).end();
      return;
    }

    try {
      const body = req.body;

      const transformed = await plainToInstance(template.body, body);
      const errors = await validate(transformed);

      if (errors.length) {
        res.status(400).end();
        return;
      }

      const options = plainToInstance(template.query, req.query);

      const result = await template.template.renderAsync(req.body, options);
      const meta = template.template.meta?.(req.body);

      res.json({ ...result, meta: { ...meta } });
      return;
    } catch (e) {
      res.status(400).end();
    }
  };
};
