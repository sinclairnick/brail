import * as React from 'react';
import { render } from '@testing-library/react';

import { Typography } from './typography';

describe('Typography', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Typography />);
    expect(baseElement).toBeTruthy();
  });
});
