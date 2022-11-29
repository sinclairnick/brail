import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ParameterObject, PathItemObject, SchemasObject } from 'openapi3-ts';
import { SenderArgs } from '../../types/api.types';

export type Route<T = any> = {
  matchRoute: (route: string) => boolean;
  handler: (req: NextApiRequest, res: NextApiResponse) => T;
  getSpec?: () => {
    path: string;
    operations: PathItemObject;
    schemas?: SchemasObject;
    parameters?: { [parameter: string]: ParameterObject };
  };
};

export type CreateAppOptions<SO = SenderArgs> = {
  /** Disables broadcasting an open api endpoint */
  disableOpenApi?: boolean;
  /**
   *  Disables broadcasting introspection endpoints.
   *  If disabled,features like BrailLayout (@brail/web) may break.
   */
  disableIntrospection?: boolean;
  /** Disable all brail-internal logging */
  disableLogging?: boolean;
  sender: (args: SenderArgs) => {};
};

export type BrailApp = {
  handle: NextApiHandler;
};
