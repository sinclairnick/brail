import { createTemplate } from './template';

import React from 'react';

describe('Template', () => {
  it('Has valid typings', () => {
    class A {
      b: number;
    }
    createTemplate(
      {
        path: '',
        meta(props) {
          return {};
        },
        preview: () => ({ b: 0 }),
        template: () => <></>,
      },
      A
    );
  });
});
