import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { startCase } from 'lodash';
import { BrailResponse, CreateTemplateReturn } from '../../../types';
import {
  createOperationSchema,
  createParamSchemaRef,
  createParamSchemas,
  createRequestBodySchema,
  createResponsesSchema,
  createSchema,
} from '../../util/openapi/openapi';
import {
  ensureStartingSlash,
  stripTrailingSlashes,
} from '../../util/path.util';
import { Route } from '../app.types';

export const getTemplateRoutes = (templates: CreateTemplateReturn<any>[]) => {
  const routes: Route[] = templates.map((template) => {
    const operationName = startCase(template.templateName()).replace(/ +/, '');
    let path = template.path();
    path = stripTrailingSlashes(path);
    path = `/api/templates/${path}`;
    path = ensureStartingSlash(path);

    // REQUEST
    const requestBodyComponent = createSchema({
      body: template.propType,
    });
    const requestBodyRef = createRequestBodySchema({
      schemaName: template.propType.name,
    });

    // RESPONSE
    const responseBodyComponent = createSchema({
      body: BrailResponse,
    });
    const responses = createResponsesSchema([
      { schemaName: BrailResponse.name },
    ]);

    // PARAMETERS
    const parameterComponents = createParamSchemas({
      schema: template.propType,
      in: 'query',
    });
    const parameterRefs = createParamSchemaRef({
      schema: template.propType,
    });

    // OPERATION
    const operation = createOperationSchema({
      operationId: operationName,
      requestBody: requestBodyRef,
      responses,
      parameters: parameterRefs,
    });

    return {
      matchRoute: (name) => name === path,
      getSpec: () => {
        return {
          path,
          schemas: {
            [template.propType.name]: requestBodyComponent,
            BrailResponse: responseBodyComponent,
          },
          operations: { post: operation },
          parameters: parameterComponents,
        };
      },
      handler: async (req, res) => {
        const transformed = await plainToInstance(template.propType, req.body);
        const errors = await validate(transformed);

        if (errors.length) {
          res.status(400).json(errors);
          return;
        }

        const result = template.render(req.body, req.query);
        const meta = template.meta?.(req.body);

        return res.json({
          html: result.html,
          errors: result.errors,
          meta: { ...meta },
        });
      },
    };
  });

  return routes;
};
