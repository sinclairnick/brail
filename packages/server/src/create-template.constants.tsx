import { CreateTemplateArgs } from './types/create-template.types';
import { BrailTemplate, TemplateProperties } from './types/template.types';
import { PropType } from './types/util.types';
import ReactDOM from 'react-dom/server';
import React from 'react';
import { z } from 'zod';

export const createTemplate = <P extends PropType, O>(
  args: CreateTemplateArgs<P>
): BrailTemplate<P, any> => {
  const { preview, propSchema, template: Template, meta } = args;

  const properties: TemplateProperties<P, O> = {
    propSchema,
    optionsSchema: z.any(),
    meta,
    preview,
    toHtml: async (props, options) => {
      return ReactDOM.renderToString(<Template {...props} />);
    },
  };

  return Object.assign((props: P) => <Template {...props} />, properties);
};
