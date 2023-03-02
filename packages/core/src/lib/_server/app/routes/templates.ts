import chalk from 'chalk';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { startCase } from 'lodash';
import { CreateTemplateReturn, RenderOptions } from '../../../types';
import { OnSendArgs, OnSendParams } from '../../../types/api.types';
import { Logger } from '../../util/logging.util';
import {
  createOperationSchema,
  CreateOperationSchemaArgs,
  createParamSchemaRef,
  createRequestBodySchema,
  createResponsesSchema,
  createSchema,
  getSchemaRef,
} from '../../util/openapi/openapi';
import {
  ensureStartingSlash,
  stripTrailingSlashes,
} from '../../util/path.util';
import { OnSendFn, Route } from '../app.types';
import { GlobalBodySchema } from './open-api';

export type GetTemplateRoutesArgs = {
  templates: CreateTemplateReturn<any>[];
  onSend?: OnSendFn;
};

export const getTemplateRoutes = (args: GetTemplateRoutesArgs) => {
  const { templates, onSend } = args;

  const routes: Route[] = [];
  for (const template of templates) {
    const operationName = startCase(template.templateName()).replace(/ +/, '');
    let path = template.path();
    path = stripTrailingSlashes(path);
    path = `/api/templates/${path}`;
    path = ensureStartingSlash(path);

    const renderRoute = createTemplateRenderRoute(
      template,
      operationName,
      path
    );
    routes.push(renderRoute);

    if (onSend) {
      const sendRoute = createSendRoute(template, operationName, path, onSend);
      routes.push(sendRoute);
    }
  }

  return routes;
};

function createSendRoute(
  template: CreateTemplateReturn<any>,
  operationName: string,
  path: string,
  onSend: OnSendFn
): Route {
  // RESPONSE
  const responses = createResponsesSchema([
    { schemaName: GlobalBodySchema.WildcardJson.name },
  ]);

  // PARAMETERS
  const renderOptParamRefs = createParamSchemaRef({
    schema: RenderOptions,
  });

  const sendBodySchema = createSchema({
    body: OnSendParams,
  });

  const createOperationArgs: CreateOperationSchemaArgs = {
    operationId: 'Send' + operationName,
    tags: ['template'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              send: {
                $ref: getSchemaRef(OnSendParams.name),
              },
              data: {
                $ref: getSchemaRef(template.propType.name),
              },
            },
          },
        },
      },
    },
    responses,
    parameters: renderOptParamRefs,
  };

  // OPERATION
  const operation = createOperationSchema(createOperationArgs);

  return {
    matchRoute: (name, method) => name === path && method === 'PUT',
    getSpec: () => {
      return {
        path,
        operations: { put: operation },
        //-- Avoid re-registering request body. Assumes render route has already done so.
        schemas: { [OnSendParams.name]: sendBodySchema },
      };
    },
    handler: async (req, res) => {
      Logger.debug(
        `Handling send for template ${chalk.yellow(template.templateName())}`
      );

      const sendInfo = req.body.send;
      const templateProps = await plainToInstance(
        template.propType,
        req.body.data
      );
      const errors = await validate(templateProps);

      if (errors.length) {
        res.status(400).json(errors);
        return;
      }

      const result = template.render(templateProps, req.query);
      const meta = template.meta?.(templateProps);

      const html = result.html;

      const onSendArgs = plainToInstance(OnSendArgs, {
        html,
        errors: result.errors,
        ...meta,
        ...sendInfo,
      });

      console.log(onSendArgs);

      try {
        const data = await onSend(onSendArgs, req);
        res.json(data);
        return;
      } catch (e: any) {
        res.status(400).json(e);
        return;
      }
    },
  };
}

function createTemplateRenderRoute(
  template: CreateTemplateReturn<any>,
  operationName: string,
  path: string
): Route {
  const requestBodyComponent = createSchema({
    body: template.propType,
  });
  const requestBodyRef = createRequestBodySchema({
    schemaName: template.propType.name,
  });

  // RESPONSE
  const responses = createResponsesSchema([
    { schemaName: GlobalBodySchema.BrailResponse.name },
  ]);

  // PARAMETERS
  const renderOptParamRefs = createParamSchemaRef({
    schema: RenderOptions,
  });

  const createOperationArgs: CreateOperationSchemaArgs = {
    tags: ['template'],
    operationId: operationName,
    requestBody: requestBodyRef,
    responses,
    parameters: renderOptParamRefs,
  };

  // OPERATION
  const operation = createOperationSchema(createOperationArgs);

  return {
    matchRoute: (name, method) => name === path && method === 'POST',
    getSpec: () => {
      return {
        path,
        schemas: { [template.propType.name]: requestBodyComponent },
        operations: { post: operation },
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
}
