import { NextApiHandler } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { RegisteredTemplate } from '../templates';

export const ROUTE_NAME = '/api/__introspect/templates';

export const createIntrospectionHandler = (
  templates: Record<string, RegisteredTemplate>
) => {
  const templateList = Object.keys(templates)
    .sort()
    .map((key) => templates[key]);

  const templateListData = templateList.map((t) => {
    return {
      name: t.template.templateName(),
      path: t.apiPath.replace('/api/templates', ''),
    };
  });

  return (req: NextRequest) => {
    return NextResponse.json(templateListData);
  };
};
