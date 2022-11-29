import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ParameterObject, PathItemObject, SchemasObject } from 'openapi3-ts';
import { OnSendArgs } from '../../types/api.types';

export type HttpMethod = 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT';

export type Route<T = any> = {
  matchRoute: (route: string, method: HttpMethod) => boolean;
  handler: (req: NextApiRequest, res: NextApiResponse) => T;
  getSpec?: () => {
    path: string;
    operations: PathItemObject;
    schemas?: SchemasObject;
    parameters?: { [parameter: string]: ParameterObject };
  };
};

export type OnSendFn = (args: OnSendArgs, req: NextApiRequest) => Promise<any>;

export type CreateAppOptions<SO = OnSendArgs> = {
  /** Disables broadcasting an open api endpoint */
  disableOpenApi?: boolean;
  /**
   *  Disables broadcasting introspection endpoints.
   *  If disabled,features like BrailLayout (@brail/web) may break.
   */
  disableIntrospection?: boolean;
  /** Disable all brail-internal logging */
  disableLogging?: boolean;
  onSend?: OnSendFn;
};

export type BrailApp = {
  handle: NextApiHandler;
};
