import * as React from 'react';
import { render } from '@testing-library/react';

import { EmailTemplate } from './email-template';

describe('EmalTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmailTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
