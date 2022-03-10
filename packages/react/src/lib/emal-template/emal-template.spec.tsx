import { render } from '@testing-library/react';

import EmalTemplate from './emal-template';

describe('EmalTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmalTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
