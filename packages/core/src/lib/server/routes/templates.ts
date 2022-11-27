import { NextApiHandler } from 'next';
import { RegisteredTemplate } from '../templates';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BrailResponse } from '../util/util.types';
import { NextRequest, NextResponse } from 'next/server';

export const ROUTE_REGEX = /^\/api\/templates.*/;

export const createTemplatesHandler = (
  templates: Record<string, RegisteredTemplate>
): ((req: NextRequest) => Promise<any>) => {
  return async (req) => {
    const url = new URL(req.url);
    const path = url.pathname;

    if (path == null) {
      return new Response(undefined, {
        status: 404,
      });
    }

    const template = templates[path];

    if (template == null) {
      return new Response(undefined, {
        status: 404,
      });
    }

    try {
      const body = await req.json();

      const transformed = await plainToInstance(template.body, body);
      const errors = await validate(transformed);

      if (errors.length) {
        return new Response(undefined, {
          status: 404,
        });
      }

      const options = plainToInstance(template.query, url.searchParams);

      const result = await template.template.renderAsync(req.body, options);
      const meta = template.template.meta?.(req.body);

      return NextResponse.json({ ...result, meta: { ...meta } });
    } catch (e) {
      return new Response(undefined, {
        status: 400,
      });
    }
  };
};
