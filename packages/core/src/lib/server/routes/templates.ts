import { NextApiHandler } from 'next';
import { RegisteredTemplate } from '../templates';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BrailResponse } from '../util/util.types';

export const createTemplatesHandler = (
  templates: Record<string, RegisteredTemplate>
): NextApiHandler<BrailResponse | ValidationError[]> => {
  return async (req, res) => {
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

    const transformed = await plainToInstance(template.body, req.body);
    const errors = await validate(transformed);

    if (errors.length) {
      res.status(400).json(errors);
      return;
    }

    const options = plainToInstance(template.query, req.query);

    const result = template.template.render(req.body, options);
    const meta = template.template.meta?.(req.body);

    return res.json({ ...result, meta: { ...meta } });
  };
};
