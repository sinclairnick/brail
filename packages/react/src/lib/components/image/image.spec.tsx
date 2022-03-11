import * as React from 'react';
import { render } from '@testing-library/react';

import { Image } from './image';

describe('Image', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Image src="" />);
    expect(baseElement).toBeTruthy();
  });
});
