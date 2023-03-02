import { defineRule } from '../util/define-rule';
import { getUnsupportedFamilies, scoreSupport } from '../util/feature-data';
import { loadFeature } from '../util/load-feature';

const feature = loadFeature('css-align-items');

export const alignItems = defineRule({
  name: 'align-items',
  meta: {
    docs: {
      description: 'Check email compatibility of align-items',
      recommended: 'error',
    },
    messages: {},
    schema: {},
    type: 'problem',
  },
  defaultOptions: [],
  create(context, optionsWithDefault) {
    return {
      Program: (node) => {
        const unsupported = getUnsupportedFamilies(feature);
        const score = scoreSupport(feature);
        console.log('AAA');
        context.report({
          node,
          messageId: '' as never,
        });

        if (score < 0.7) {
          console.log('AAAA');
        }
      },
    };
  },
});
