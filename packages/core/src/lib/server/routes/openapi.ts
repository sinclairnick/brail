import { NextApiHandler } from 'next';
import { OpenAPIObject } from 'openapi3-ts';

export const ROUTE_NAME = '/api/openapi.json';

export const createOpenApiHandler = (spec: OpenAPIObject): NextApiHandler => {
  return (req, res) => {
    res.json(spec);
  };
};
