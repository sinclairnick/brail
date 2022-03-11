import mjml2html, { components, assignComponents } from '../mjml-core';
import { dependencies, assignDependencies } from '../mjml-validator';
import presetCore from '../mjml-preset-core';

assignComponents(components, presetCore.components);
assignDependencies(dependencies, presetCore.dependencies);

export const mjmlToHtml = mjml2html;
