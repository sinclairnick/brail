import {
  ParameterObject,
  SchemaObject,
  RequestBodyObject,
  ResponsesObject,
  OperationObject,
  ReferenceObject,
} from 'openapi3-ts';
import { classToJsonSchema } from './json-schema.util';

export const getSchemaRef = (schemaName: string) =>
  `#/components/schemas/${schemaName}`;

export const getParameterRef = (paramName: string) =>
  `#/components/parameters/${paramName}`;

export const getNamespacedParamName = (
  paramName: string,
  parentSchemaName: string
) => `${parentSchemaName}.${paramName}`;

export type CreateResponsesBodySchemaArgs = {
  schemaName: string;
  contentType?: string;
  statusCode?: number;
};
export const createResponsesSchema = (
  args: CreateResponsesBodySchemaArgs[]
): ResponsesObject => {
  const responsesObject: ResponsesObject = {};

  for (const arg of args) {
    const {
      schemaName,
      contentType = 'application/json',
      statusCode = 200,
    } = arg;
    responsesObject[statusCode] = {
      description: schemaName,
      content: {
        [contentType]: {
          schema: {
            $ref: getSchemaRef(schemaName),
          },
        },
      },
    };
  }

  return responsesObject;
};

export type CreateParamSchemaRefArgs = {
  schema: new () => any;
};
/** Only creates refs, put this in the operation definition. */
export const createParamSchemaRef = (
  args: CreateParamSchemaRefArgs
): ReferenceObject[] => {
  const schema = classToJsonSchema(args.schema);

  if (schema.properties == null) return [];

  return Object.keys(schema.properties).map((k) => ({
    // Namespaced ref
    $ref: getParameterRef(getNamespacedParamName(k, args.schema.name)),
  }));
};

export type CreateParamSchemasArgs = Pick<ParameterObject, 'in'> & {
  schema: new () => any;
};

/**
 * Given a class with fields, flatten the class into parameter objects
 */
export const createParamSchemas = (
  args: CreateParamSchemasArgs
): { [parameter: string]: ParameterObject } => {
  const schema = classToJsonSchema(args.schema);

  if (schema.properties == null) return {};

  return Object.entries(schema.properties)
    .map(([property, propertySchema]) => {
      return {
        in: args.in,
        name: property,
        schema: propertySchema,
      };
    })
    .reduce((params: { [parameter: string]: ParameterObject }, param) => {
      // Namespace parameters
      params[getNamespacedParamName(param.name, args.schema.name)] = param;
      return params;
    }, {});
};

export type CreateSchemaArgs = {
  body: new () => any;
};

export const createSchema = (args: CreateSchemaArgs): SchemaObject => {
  const { body } = args;
  const bodySchema = classToJsonSchema(body);

  return {
    /**
     * Ensures the type will always be an object, preventing unintended behaviour
     * when e.g. object has no properties.
     * */
    type: 'object',
    properties: {},
    ...bodySchema,
  };
};

export type CreateRequestBodySchemaArgs = {
  schemaName: string;
  contentType?: string;
  description?: string;
  required?: boolean;
};

export const createRequestBodySchema = (
  args: CreateRequestBodySchemaArgs
): RequestBodyObject => {
  const {
    schemaName,
    contentType = 'application/json',
    required = true,
  } = args;

  return {
    description: args.description ?? schemaName,
    required,
    content: {
      [contentType]: {
        schema: {
          $ref: getSchemaRef(schemaName),
        },
      },
    },
  };
};

export type CreateOperationSchemaArgs = {
  operationId: string;
  responses: ResponsesObject;
  requestBody: RequestBodyObject;
  parameters?: ReferenceObject[];
  tags?: string[];
};

export const createOperationSchema = (
  args: CreateOperationSchemaArgs
): OperationObject => {
  return {
    responses: args.responses,
    operationId: args.operationId,
    requestBody: args.requestBody,
    parameters: args.parameters,
    tags: args.tags,
  };
};
