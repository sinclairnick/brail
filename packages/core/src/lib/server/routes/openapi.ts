import { NextApiHandler } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAPIObject } from 'openapi3-ts';

export const ROUTE_NAME = '/api/openapi.json';

export const createOpenApiHandler = (spec: OpenAPIObject) => {
  return (req: NextRequest) => {
    return NextResponse.json(spec);
  };
};
