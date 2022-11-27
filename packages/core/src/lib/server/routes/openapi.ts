import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAPIObject } from 'openapi3-ts';

export const ROUTE_NAME = '/api/openapi.json';

export const createOpenApiHandler = (spec: OpenAPIObject) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    res.json(spec);
  };
};
