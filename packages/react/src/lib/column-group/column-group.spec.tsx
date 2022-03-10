import { render } from '@testing-library/react';

import ColumnGroup from './column-group';

describe('ColumnGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ColumnGroup />);
    expect(baseElement).toBeTruthy();
  });
});
